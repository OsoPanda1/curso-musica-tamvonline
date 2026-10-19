import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const PRICE_MXN = 500;
const PRODUCT_ID = "sonora-ia-quarter";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function configuredBaseUrl() {
  const value = process.env.APP_BASE_URL?.replace(/\/+$/, "");
  if (!value) throw new Error("APP_BASE_URL is not configured");
  const parsed = new URL(value);
  if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
    throw new Error("APP_BASE_URL must use HTTPS");
  }
  return parsed.origin;
}

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
        if (!token) return json({ error: "Inicia sesión para continuar." }, 401);

        const supabaseUrl = process.env.SUPABASE_URL;
        const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
        const accessToken = process.env.MP_ACCESS_TOKEN;
        if (!supabaseUrl || !publishableKey || !accessToken) {
          return json({ error: "El pago todavía no está habilitado en este entorno." }, 503);
        }

        try {
          const authClient = createClient(supabaseUrl, publishableKey, {
            auth: { persistSession: false, autoRefreshToken: false },
          });
          const { data, error } = await authClient.auth.getUser(token);
          if (error || !data.user) return json({ error: "La sesión no es válida." }, 401);

          const baseUrl = configuredBaseUrl();
          const preferenceResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: "POST",
            headers: {
              authorization: `Bearer ${accessToken}`,
              "content-type": "application/json",
              "x-idempotency-key": crypto.randomUUID(),
            },
            body: JSON.stringify({
              items: [{
                id: PRODUCT_ID,
                title: "Sonora IA — acceso trimestral",
                description: "Acceso al programa de formación musical con inteligencia artificial por tres meses.",
                quantity: 1,
                currency_id: "MXN",
                unit_price: PRICE_MXN,
              }],
              external_reference: data.user.id,
              metadata: { user_id: data.user.id, product_id: PRODUCT_ID },
              back_urls: {
                success: `${baseUrl}/pago/resultado?status=success`,
                failure: `${baseUrl}/pago/resultado?status=failure`,
                pending: `${baseUrl}/pago/resultado?status=pending`,
              },
              auto_return: "approved",
              notification_url: `${baseUrl}/api/webhooks/mercadopago`,
              statement_descriptor: "SONORA IA",
            }),
          });

          if (!preferenceResponse.ok) {
            // Provider error bodies may contain operational details; do not return them to the browser.
            console.error("[payments] Mercado Pago preference creation failed", preferenceResponse.status);
            return json({ error: "No fue posible iniciar el pago. Inténtalo más tarde." }, 502);
          }

          const preference = await preferenceResponse.json() as { init_point?: unknown };
          if (typeof preference.init_point !== "string") {
            return json({ error: "La pasarela no devolvió un enlace de pago válido." }, 502);
          }
          const checkoutUrl = new URL(preference.init_point);
          if (checkoutUrl.protocol !== "https:" || !/(^|\.)mercadopago\.(com|com\.mx|com\.ar|cl|com\.br|com\.co|com\.pe|com\.uy)$/.test(checkoutUrl.hostname)) {
            console.error("[payments] Mercado Pago returned an unexpected checkout host");
            return json({ error: "La pasarela devolvió un destino no válido." }, 502);
          }
          return json({ checkoutUrl: checkoutUrl.href });
        } catch (error) {
          console.error("[payments] Checkout initialization failed", error instanceof Error ? error.message : "unknown error");
          return json({ error: "No fue posible iniciar el pago. Verifica la configuración e inténtalo de nuevo." }, 500);
        }
      },
    },
  },
});
