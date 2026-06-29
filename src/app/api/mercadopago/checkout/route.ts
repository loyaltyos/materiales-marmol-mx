import { NextResponse } from "next/server";
import { calculateServerCart, InvalidCartError } from "@/lib/checkout";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { items?: unknown };
    const { amount } = calculateServerCart(body.items);
    return NextResponse.json({ amount, currency: "MXN" });
  } catch (error) {
    if (error instanceof InvalidCartError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "No fue posible preparar el pago. Intenta nuevamente." },
      { status: 500 },
    );
  }
}
