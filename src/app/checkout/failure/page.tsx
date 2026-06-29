import { CheckoutStatus } from "@/components/CheckoutStatus";

export default function CheckoutFailurePage() {
  return (
    <CheckoutStatus
      eyebrow="Pago no completado"
      title="No fue posible completar el pago"
      tone="failure"
      retry
      paragraphs={["Puedes intentarlo nuevamente o comunicarte con nosotros."]}
    />
  );
}
