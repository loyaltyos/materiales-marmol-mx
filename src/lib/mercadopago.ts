import { MercadoPagoConfig, Payment } from "mercadopago";

export function getMercadoPagoPaymentClient() {
  const accessToken = process.env.MP_ACCESS_TOKEN?.trim();
  if (!accessToken || !accessToken.startsWith("TEST-")) {
    throw new Error("Mercado Pago TEST no está configurado.");
  }

  return new Payment(
    new MercadoPagoConfig({ accessToken, options: { timeout: 10_000 } }),
  );
}

type PaymentLogData = {
  id?: number | string | null;
  status?: string | null;
  transaction_amount?: number | null;
  payer?: { email?: string | null } | null;
  date_created?: string | null;
  date_last_updated?: string | null;
};

export function logPayment(event: "payment_created" | "payment_webhook", payment: PaymentLogData) {
  console.info("[mercadopago]", {
    event,
    payment_id: payment.id ?? null,
    status: payment.status ?? "unknown",
    amount: payment.transaction_amount ?? null,
    email: payment.payer?.email ?? null,
    fecha: payment.date_last_updated ?? payment.date_created ?? new Date().toISOString(),
  });
}
