import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Materiales Marmol MX | Materiales para Construcción",
  description:
    "Venta de materiales para construcción, obra civil y remodelación. Cemento, block, acero, arena, grava, impermeabilizantes y más.",
};

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catalogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

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
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#2B2B2B]/95 text-white backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <Link href="/" className="group flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center bg-[#F97316] font-black text-[#2B2B2B]">
                MM
              </span>
              <span>
                <span className="block text-lg font-black uppercase tracking-[0.18em]">
                  Materiales
                </span>
                <span className="block text-sm font-semibold uppercase tracking-[0.28em] text-[#F97316]">
                  Marmol MX
                </span>
              </span>
            </Link>
            <nav className="flex flex-wrap gap-2 text-sm font-bold uppercase tracking-[0.16em] text-white/78">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border border-white/10 px-3 py-2 transition hover:border-[#F97316] hover:text-[#F97316]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-[#2B2B2B] text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
            <div>
              <p className="text-xl font-black uppercase tracking-[0.18em]">
                Materiales Marmol MX
              </p>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/68">
                Proveedor de materiales para construccion, obra civil y
                remodelacion con atencion especializada y coordinacion logistica
                para proyectos en Mexico.
              </p>
            </div>
            <div>
              <p className="font-black uppercase tracking-[0.16em] text-[#F97316]">
                Contacto
              </p>
              <div className="mt-4 space-y-2 text-sm text-white/76">
                <p>+52 55 7332 8442</p>
                <p>info@marmolmx.com.mx</p>
                <p>ventas@marmolmx.com.mx</p>
              </div>
            </div>
            <div>
              <p className="font-black uppercase tracking-[0.16em] text-[#F97316]">
                Operacion
              </p>
              <p className="mt-4 text-sm leading-6 text-white/68">
                Abasto, volumen y entrega coordinada para compras de materiales
                pesados.
              </p>
            </div>
          </div>
        </footer>
        <a
          href="https://wa.me/525573328442"
          aria-label="Enviar mensaje por WhatsApp"
          className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center bg-[#F97316] text-lg font-black text-[#2B2B2B] shadow-2xl shadow-black/25 transition hover:scale-105"
        >
          WA
        </a>
      </body>
    </html>
  );
}
