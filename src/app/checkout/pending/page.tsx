import { CheckoutStatus } from "@/components/CheckoutStatus";

export default function CheckoutPendingPage() {
  return (
    <CheckoutStatus
      eyebrow="Pago pendiente"
      title="Estamos procesando tu pago"
      tone="pending"
      paragraphs={[
        "Recibimos tu solicitud y Mercado Pago todavía está confirmando el resultado.",
        "Te avisaremos cuando el estado del pago se actualice. No es necesario realizar otro pago.",
      ]}
    />
  );
}
