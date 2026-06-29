import Link from "next/link";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { SectionHeader } from "@/components/SectionHeader";

const contacts = [
  { label: "Teléfono", value: "+52 55 7332 8442", href: "tel:+525573328442", kind: "phone" },
  { label: "WhatsApp", value: "Atención inmediata", href: "https://wa.me/525573328442", kind: "whatsapp" },
  { label: "Correo comercial", value: "ventas@marmolmx.com.mx", href: "mailto:ventas@marmolmx.com.mx", kind: "email" },
  { label: "Correo general", value: "info@marmolmx.com.mx", href: "mailto:info@marmolmx.com.mx", kind: "email" },
];

export default function ContactoPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <SectionHeader eyebrow="Contacto" title="Hablemos de tus materiales y entregas" description="Nuestro equipo atiende abastecimiento para construcción, obra civil, remodelación y compras recurrentes." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((contact) => (
            <a key={contact.href} href={contact.href} className="premium-panel group rounded-[1.5rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_24px_55px_rgba(30,30,30,.13)]">
              <div className={`grid h-11 w-11 place-items-center rounded-xl ${contact.kind === "whatsapp" ? "bg-[#25D366] text-white" : "bg-[#242424] text-[#F97316]"}`}>
                {contact.kind === "whatsapp" ? <WhatsAppIcon className="h-5 w-5" /> : contact.kind === "phone" ? <PhoneIcon className="h-5 w-5" /> : <span className="text-sm font-black">@</span>}
              </div>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-[#F97316]">{contact.label}</p>
              <p className="mt-2 break-words text-base font-black text-[#242424]">{contact.value}</p>
              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.1em] text-[#888] transition group-hover:text-[#242424]">Contactar →</p>
            </a>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#242424] text-white">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#F97316]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div><p className="text-xs font-black uppercase tracking-[0.22em] text-[#F97316]">Atención directa</p><h2 className="mt-3 max-w-2xl text-3xl font-black uppercase tracking-[-0.03em]">Cotiza por teléfono, correo o WhatsApp</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/55">Cuéntanos qué necesitas y un asesor te ayudará con cantidades, disponibilidad y logística.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/cotizaciones" className="premium-button inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F97316] px-6 text-xs font-black uppercase tracking-[0.11em] text-[#242424] transition hover:-translate-y-0.5 hover:bg-white">Solicitar cotización</Link>
            <a href="https://wa.me/525573328442" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-6 text-xs font-black uppercase tracking-[0.11em] text-white transition hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-[#102018]"><WhatsAppIcon className="h-5 w-5" /> WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
