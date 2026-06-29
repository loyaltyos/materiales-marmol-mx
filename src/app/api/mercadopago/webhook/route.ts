import { NextResponse } from "next/server";
import {
  InvalidWebhookSignatureError,
  WebhookSignatureValidator,
} from "mercadopago";
import { getMercadoPagoPaymentClient, logPayment } from "@/lib/mercadopago";

export const runtime = "nodejs";

function paymentIdFromPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const data = (payload as { data?: unknown }).data;
  if (!data || typeof data !== "object") return null;
  const id = (data as { id?: unknown }).id;
  return typeof id === "number" || typeof id === "string" ? String(id) : null;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    const url = new URL(request.url);
    const paymentId = paymentIdFromPayload(payload) ?? url.searchParams.get("data.id");

    if (!paymentId) return NextResponse.json({ received: true });

    const webhookSecret = process.env.MP_WEBHOOK_SECRET?.trim();
    if (webhookSecret) {
      WebhookSignatureValidator.validate({
        xSignature: request.headers.get("x-signature"),
        xRequestId: request.headers.get("x-request-id"),
        dataId: url.searchParams.get("data.id") ?? paymentId,
        secret: webhookSecret,
        toleranceSeconds: 300,
      });
    }

    // Never trust event fields: retrieve the payment with the private TEST token.
    const payment = await getMercadoPagoPaymentClient().get({ id: paymentId });
    logPayment("payment_webhook", payment);
    return NextResponse.json({ received: true });
  } catch (error) {
    if (error instanceof InvalidWebhookSignatureError) {
      console.warn("[mercadopago] webhook_signature_invalid");
      return NextResponse.json({ received: false }, { status: 401 });
    }
    console.error("[mercadopago] webhook_processing_failed");
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
