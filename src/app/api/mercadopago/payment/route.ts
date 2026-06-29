import { NextResponse } from "next/server";
import { calculateServerCart, InvalidCartError } from "@/lib/checkout";
import { getMercadoPagoPaymentClient, logPayment } from "@/lib/mercadopago";

export const runtime = "nodejs";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requiredString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 && normalized.length <= maxLength ? normalized : null;
}

function getCustomer(value: unknown) {
  if (!isRecord(value)) return null;

  const name = requiredString(value.name, 120);
  const phone = requiredString(value.phone, 30);
  const email = requiredString(value.email, 160);
  const address = requiredString(value.address, 250);
  const city = requiredString(value.city, 120);
  const comments = typeof value.comments === "string" ? value.comments.trim().slice(0, 500) : "";

  if (!name || !phone || !email || !address || !city || !email.includes("@")) return null;
  return { name, phone, email, address, city, comments };
}

function getPaymentData(value: unknown) {
  if (!isRecord(value)) return null;

  const token = requiredString(value.token, 300);
  const paymentMethodId = requiredString(value.payment_method_id, 80);
  const installments = typeof value.installments === "number" ? value.installments : Number(value.installments);
  const issuerId = typeof value.issuer_id === "number" ? value.issuer_id : Number(value.issuer_id);
  const payer = isRecord(value.payer) ? value.payer : {};
  const identification = isRecord(payer.identification) ? payer.identification : {};
  const identificationType = requiredString(identification.type, 20);
  const identificationNumber = requiredString(identification.number, 40);

  if (!token || !paymentMethodId || !Number.isInteger(installments) || installments < 1 || installments > 24) {
    return null;
  }

  return {
    token,
    paymentMethodId,
    installments,
    issuerId: Number.isFinite(issuerId) && issuerId > 0 ? issuerId : undefined,
    identification:
      identificationType && identificationNumber
        ? { type: identificationType, number: identificationNumber }
        : undefined,
  };
}

function destinationForStatus(status?: string) {
  if (status === "approved") return "success";
  if (status === "pending" || status === "in_process" || status === "authorized") return "pending";
  return "failure";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UnknownRecord;
    const customer = getCustomer(body.customer);
    const paymentData = getPaymentData(body.payment);
    const idempotencyKey = requiredString(body.idempotencyKey, 100);

    if (!customer || !paymentData || !idempotencyKey) {
      return NextResponse.json({ message: "Revisa los datos e intenta nuevamente." }, { status: 400 });
    }

    const { items, amount } = calculateServerCart(body.items);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
    const payment = await getMercadoPagoPaymentClient().create({
      body: {
        transaction_amount: amount,
        token: paymentData.token,
        installments: paymentData.installments,
        payment_method_id: paymentData.paymentMethodId,
        issuer_id: paymentData.issuerId,
        description: "Pedido Materiales Marmol MX",
        external_reference: idempotencyKey,
        notification_url: siteUrl ? `${siteUrl}/api/mercadopago/webhook` : undefined,
        payer: {
          email: customer.email,
          identification: paymentData.identification,
          phone: { number: customer.phone },
          first_name: customer.name,
        },
        additional_info: {
          items: items.map(({ product, quantity }) => ({
            id: product.id,
            title: product.name,
            description: product.description,
            category_id: product.category,
            quantity,
            unit_price: product.price,
          })),
          payer: {
            first_name: customer.name,
            phone: { number: customer.phone },
          },
        },
        metadata: {
          delivery_address: customer.address,
          delivery_city: customer.city,
          customer_comments: customer.comments,
        },
      },
      requestOptions: { idempotencyKey },
    });

    logPayment("payment_created", payment);
    return NextResponse.json({
      paymentId: payment.id,
      status: payment.status,
      redirectTo: `/checkout/${destinationForStatus(payment.status)}?payment_id=${encodeURIComponent(String(payment.id ?? ""))}`,
    });
  } catch (error) {
    if (error instanceof InvalidCartError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error("[mercadopago] payment_create_failed");
    return NextResponse.json(
      { message: "No fue posible completar el pago. Puedes intentarlo nuevamente." },
      { status: 502 },
    );
  }
}
