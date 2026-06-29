import { SectionHeader } from "@/components/SectionHeader";
import { WhatsAppIcon } from "@/components/Icons";

const fields = [
  { label: "Nombre", name: "nombre", type: "text" },
  { label: "Empresa", name: "empresa", type: "text" },
  { label: "Telefono", name: "telefono", type: "tel" },
  { label: "Correo", name: "correo", type: "email" },
  { label: "Material requerido", name: "material", type: "text" },
  { label: "Cantidad", name: "cantidad", type: "text" },
];

export default function CotizacionesPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <SectionHeader
          eyebrow="Cotizaciones"
          title="Cotizacion personalizada para volumen especial"
          description="Necesitas volumen especial o materiales para obra completa? Solicita una cotizacion personalizada para compras grandes, proyectos industriales o productos no publicados."
        />
        <div className="premium-panel mt-8 rounded-[1.5rem] border-l-4 border-l-[#F97316] p-6">
          <p className="font-black uppercase tracking-[0.14em] text-[#2B2B2B]">
            Logistica incluida en el seguimiento
          </p>
          <p className="mt-3 text-sm leading-6 text-[#4A4A4A]">
            Para compras directas usa el catalogo y carrito. Este formulario es
            ideal para volumen industrial, obra completa, entregas especiales o
            materiales que aun no aparecen en la tienda.
          </p>
          <a href="https://wa.me/525573328442" className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-[#198C45] transition hover:text-[#242424]"><WhatsAppIcon className="h-5 w-5" /> Cotizar por WhatsApp</a>
        </div>
      </div>

      <form className="premium-panel rounded-[1.75rem] p-5 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#4A4A4A]">
                {field.label}
              </span>
              <input
                required
                name={field.name}
                type={field.type}
                className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-[#F7F6F3] px-4 text-sm font-semibold outline-none transition focus:border-[#F97316] focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,.1)]"
              />
            </label>
          ))}
        </div>
        <label className="mt-5 block">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#4A4A4A]">
            Comentarios
          </span>
          <textarea
            required
            name="comentarios"
            rows={6}
            className="mt-2 w-full rounded-xl border border-black/10 bg-[#F7F6F3] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#F97316] focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,.1)]"
          />
        </label>
        <button
          type="submit"
          className="premium-button mt-6 w-full rounded-xl bg-[#F97316] px-6 py-4 text-xs font-black uppercase tracking-[0.13em] text-[#242424] transition hover:-translate-y-0.5 hover:bg-[#242424] hover:text-white"
        >
          Enviar solicitud
        </button>
      </form>
    </main>
  );
}
