import { CheckoutClient } from "@/components/CheckoutClient";

export default function CheckoutPage() {
  const configuredKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY?.trim();
  const publicKey = configuredKey?.startsWith("TEST-") ? configuredKey : null;

  return <CheckoutClient publicKey={publicKey} />;
}
