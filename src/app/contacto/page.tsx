import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";

const contacts = [
  { label: "Telefono", value: "+52 55 7332 8442", href: "tel:+525573328442" },
  {
    label: "Correo comercial",
    value: "ventas@marmolmx.com.mx",
    href: "mailto:ventas@marmolmx.com.mx",
  },
  {
    label: "Correo general",
    value: "info@marmolmx.com.mx",
    href: "mailto:info@marmolmx.com.mx",
  },
];

export default function ContactoPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contacto"
          title="Hablemos de tus materiales y entregas"
          description="Nuestro equipo atiende solicitudes de abastecimiento para construccion, obra civil, remodelacion y compras recurrentes."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {contacts.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              className="border border-[#D4D4D4] bg-white p-6 transition hover:border-[#F97316]"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F97316]">
                {contact.label}
              </p>
              <p className="mt-4 break-words text-xl font-black text-[#2B2B2B]">
                {contact.value}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#2B2B2B] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F97316]">
              Atencion directa
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase">
              Cotiza por telefono, correo o WhatsApp
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href="/cotizaciones"
              className="bg-[#F97316] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-[#2B2B2B] transition hover:bg-white"
            >
              Solicitar cotizacion
            </Link>
            <a
              href="https://wa.me/525573328442"
              className="border border-white/35 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-white transition hover:border-[#F97316] hover:text-[#F97316]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
