import { NextResponse } from "next/server";

export async function POST() {
  const hasMercadoPagoConfig = Boolean(
    process.env.MERCADOPAGO_ACCESS_TOKEN &&
      process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY &&
      process.env.NEXT_PUBLIC_SITE_URL,
  );

  if (!hasMercadoPagoConfig) {
    return NextResponse.json(
      {
        status: "pending_integration",
        message:
          "Pago pendiente de integracion. Configura MERCADOPAGO_ACCESS_TOKEN, NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY y NEXT_PUBLIC_SITE_URL para activar cobros reales.",
      },
      { status: 202 },
    );
  }

  return NextResponse.json(
    {
      status: "ready_for_integration",
      message:
        "Mercado Pago esta configurado, pero la creacion de preferencias queda pendiente de implementacion final.",
    },
    { status: 202 },
  );
}
