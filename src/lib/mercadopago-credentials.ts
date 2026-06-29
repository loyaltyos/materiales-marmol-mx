export type MercadoPagoMode = "sandbox" | "production";

export function detectMercadoPagoMode(credential: string | null | undefined): MercadoPagoMode | null {
  const value = credential?.trim();

  if (!value) return null;
  if (value.startsWith("APP_USR-")) return "production";
  if (value.startsWith("TEST-")) return "sandbox";

  return null;
}
