import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function CheckoutButton({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function startCheckout() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      const session = data.session;
      if (!session) {
        await navigate({ to: "/auth", search: { mode: "signup" } });
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { authorization: `Bearer ${session.access_token}` },
        cache: "no-store",
      });
      const payload = await response.json() as { checkoutUrl?: string; error?: string };
      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.error ?? "No fue posible iniciar el pago.");
      }
      const destination = new URL(payload.checkoutUrl);
      if (destination.protocol !== "https:" ||
          !/^([a-z0-9-]+\.)*mercadopago\.(com|com\.mx|com\.ar|cl|com\.br|com\.co|com\.pe|com\.uy)$/i.test(destination.hostname)) {
        throw new Error("La pasarela devolvió un destino no válido.");
      }
      window.location.assign(destination.href);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No fue posible iniciar el pago.");
    } finally {
      setLoading(false);
    }
  }

  return <Button type="button" variant="hero" className={className} disabled={loading} onClick={startCheckout}>
    {loading ? "Conectando con Mercado Pago…" : "Inscribirme por $500 MXN"}
  </Button>;
}
