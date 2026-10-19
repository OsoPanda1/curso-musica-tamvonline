import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

type MercadoPagoPayment = {
  id: number | string;
  status: string;
  external_reference?: string | null;
  transaction_amount: number;
  currency_id: string;
  metadata?: { user_id?: string; product_id?: string };
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

async function verifySignature(request: Request, dataId: string, secret: string): Promise<boolean> {
  const signature = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");
  if (!signature || !requestId) return false;

  const parts: Record<string, string> = {};
  for (const part of signature.split(",")) {
    const index = part.indexOf("=");
    if (index < 0) continue;
    parts[part.slice(0, index).trim()] = part.slice(index + 1).trim();
  }
  const timestamp = parts["ts"];
  const supplied = parts["v1"];
  if (!timestamp || !supplied || !/^[a-f0-9]{64}$/i.test(supplied)) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${timestamp};`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expected = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(manifest)));
  const received = Uint8Array.from(supplied.match(/.{2}/g) ?? [], (byte) => Number.parseInt(byte, 16));
  if (received.length !== expected.length) return false;
  let difference = 0;
  for (let i = 0; i < expected.length; i += 1) difference |= expected[i]! ^ received[i]!;
  return difference === 0;
}

function mapStatus(status: string): "pending" | "approved" | "rejected" | "cancelled" | "refunded" | "charged_back" | null {
  switch (status) {
    case "approved": return "approved";
    case "pending":
    case "in_process":
    case "authorized": return "pending";
    case "rejected": return "rejected";
    case "cancelled": return "cancelled";
    case "refunded": return "refunded";
    case "charged_back": return "charged_back";
    default: return null;
  }
}

export const Route = createFileRoute("/api/webhooks/mercadopago")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const accessToken = process.env["MP_ACCESS_TOKEN"];
        const webhookSecret = process.env["MP_WEBHOOK_SECRET"];
        if (!accessToken || !webhookSecret) {
          console.error("[payments] Webhook secrets are not configured");
          return json({ error: "Webhook not configured" }, 503);
        }

        let body: { type?: string; action?: string; data?: { id?: string | number } };
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid JSON" }, 400);
        }

        const url = new URL(request.url);
        const dataId = String(body.data?.id ?? url.searchParams.get("data.id") ?? url.searchParams.get("id") ?? "");
        const topic = body.type ?? url.searchParams.get("type") ?? "";
        if (!dataId || !/^[0-9]+$/.test(dataId)) return json({ received: true });
        if (topic && topic !== "payment" && !body.action?.startsWith("payment.")) return json({ received: true });
        if (!(await verifySignature(request, dataId, webhookSecret))) {
          return json({ error: "Invalid signature" }, 401);
        }

        try {
          const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(dataId)}`, {
            headers: { authorization: `Bearer ${accessToken}` },
            cache: "no-store",
          });
          if (!paymentResponse.ok) {
            console.error("[payments] Canonical payment lookup failed", paymentResponse.status);
            return json({ error: "Payment verification unavailable" }, 502);
          }

          const payment = await paymentResponse.json() as MercadoPagoPayment;
          const userId = payment.external_reference ?? "";
          const status = mapStatus(payment.status);
          if (String(payment.id) !== dataId || !isUuid(userId) ||
              payment.metadata?.user_id !== userId ||
              payment.metadata?.product_id !== "sonora-ia-quarter" ||
              payment.transaction_amount !== 500 || payment.currency_id !== "MXN" || !status) {
            console.error("[payments] Canonical payment failed product/user/amount validation");
            return json({ error: "Payment validation failed" }, 422);
          }

          const canonicalEvent = `${payment.id}|${userId}|${payment.status}|${payment.transaction_amount}|${payment.currency_id}`;
          const eventHashBytes = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonicalEvent)));
          const eventHash = Array.from(eventHashBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
          const { error } = await supabaseAdmin.rpc("apply_verified_payment", {
            p_provider: "mercadopago",
            p_provider_payment_id: String(payment.id),
            p_user_id: userId,
            p_amount_mxn: 500,
            p_currency: "MXN",
            p_status: status,
            p_external_reference: userId,
            p_event_hash: eventHash,
          });
          if (error) {
            console.error("[payments] Verified payment could not be persisted", error.code ?? "database_error");
            return json({ error: "Payment persistence failed" }, 500);
          }
          return json({ received: true });
        } catch (error) {
          console.error("[payments] Webhook processing failed", error instanceof Error ? error.message : "unknown error");
          return json({ error: "Webhook processing failed" }, 500);
        }
      },
    },
  },
});
