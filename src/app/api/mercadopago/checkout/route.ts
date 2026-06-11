import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      status: "pending_integration",
      message:
        "Pago pendiente de integración. Un asesor se comunicará contigo para finalizar la compra.",
    },
    { status: 202 },
  );
}
