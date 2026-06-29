import { CheckoutClient } from "@/components/CheckoutClient";
import { detectMercadoPagoMode } from "@/lib/mercadopago-credentials";

export default function CheckoutPage() {
  const configuredKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY?.trim();
  const mode = detectMercadoPagoMode(configuredKey);
  const publicKey = mode ? configuredKey ?? null : null;

  return <CheckoutClient publicKey={publicKey} mode={mode} />;
}
