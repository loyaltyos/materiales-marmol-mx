import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Materiales Marmol MX | Materiales para Construccion",
  description:
    "Venta de materiales para construccion, obra civil y remodelacion. Cemento, block, acero, arena, grava, impermeabilizantes y mas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F5F5F5] text-[#2B2B2B]">
        <CartProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <a
            href="https://wa.me/525573328442"
            aria-label="Enviar mensaje por WhatsApp"
            className="fixed bottom-5 right-5 z-50 hidden h-14 w-14 place-items-center rounded-2xl bg-[#F97316] text-lg font-black text-[#2B2B2B] shadow-2xl shadow-black/25 transition hover:scale-105 sm:grid"
          >
            WA
          </a>
        </CartProvider>
      </body>
    </html>
  );
}
