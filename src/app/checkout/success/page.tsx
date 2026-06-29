import { CheckoutStatus } from "@/components/CheckoutStatus";
import { SuccessOrderSummary } from "@/components/SuccessOrderSummary";

export default function CheckoutSuccessPage() {
  return (
    <CheckoutStatus
      eyebrow="Pago aprobado"
      title="¡Gracias por tu compra!"
      tone="success"
      continueShopping
      whatsapp
      paragraphs={[
        "Tu pago fue aprobado.",
        "Un asesor de Materiales Marmol MX se comunicará contigo para coordinar el envío de tu pedido.",
      ]}
    >
      <SuccessOrderSummary />
    </CheckoutStatus>
  );
}
