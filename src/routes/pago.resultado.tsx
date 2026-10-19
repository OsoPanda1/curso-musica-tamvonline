import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Clock3, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { accountQuery } from "@/lib/use-account";
import { hasActiveAccess } from "@/lib/course";

export const Route = createFileRoute("/pago/resultado")({
  validateSearch: (search: Record<string, unknown>) => ({
    status: search.status === "success" || search.status === "failure" || search.status === "pending" ? search.status : "pending",
  }),
  head: () => ({ meta: [{ title: "Estado del pago — Sonora IA" }, { name: "description", content: "Consulta el estado de tu inscripción." }] }),
  component: PaymentResult,
});

function PaymentResult() {
  const { status } = Route.useSearch();
  const { data, isLoading, refetch } = useQuery(accountQuery);
  const access = hasActiveAccess(data?.paidUntil);
  const title = access ? "Tu acceso está activo" : status === "failure" ? "El pago no se completó" : status === "success" ? "Estamos confirmando tu pago" : "Pago pendiente";
  const message = access
    ? "La inscripción está activa en tu cuenta. Ya puedes continuar con el programa."
    : status === "failure"
      ? "No se confirmó ningún acceso. Puedes volver a intentarlo cuando estés listo."
      : "La redirección de la pasarela no confirma el pago. El acceso se habilitará cuando el servidor verifique la notificación oficial.";
  const Icon = access ? CheckCircle2 : status === "failure" ? XCircle : status === "pending" ? Clock3 : ShieldCheck;

  return (
    <main className="mx-auto max-w-xl px-5 py-20">
      <section className="rounded-3xl border border-border bg-panel p-8 text-center">
        <Icon className="mx-auto h-12 w-12 text-lavender" />
        <h1 className="mt-4 text-3xl font-bold">{title}</h1>
        <p className="mt-3 text-muted-foreground">{message}</p>
        {!access && (
          <Button variant="glass" className="mt-6" disabled={isLoading} onClick={() => void refetch()}>
            {isLoading ? "Consultando…" : "Volver a consultar"}
          </Button>
        )}
        <div><Button asChild variant="hero" className="mt-4"><Link to="/curso">Ir a mi curso</Link></Button></div>
      </section>
    </main>
  );
}
