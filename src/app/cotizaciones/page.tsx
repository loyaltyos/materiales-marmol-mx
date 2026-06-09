import { SectionHeader } from "@/components/SectionHeader";

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
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <SectionHeader
          eyebrow="Cotizaciones"
          title="Cotizacion personalizada para volumen especial"
          description="Necesitas volumen especial o materiales para obra completa? Solicita una cotizacion personalizada para compras grandes, proyectos industriales o productos no publicados."
        />
        <div className="mt-8 border-l-4 border-[#F97316] bg-white p-6">
          <p className="font-black uppercase tracking-[0.14em] text-[#2B2B2B]">
            Logistica incluida en el seguimiento
          </p>
          <p className="mt-3 text-sm leading-6 text-[#4A4A4A]">
            Para compras directas usa el catalogo y carrito. Este formulario es
            ideal para volumen industrial, obra completa, entregas especiales o
            materiales que aun no aparecen en la tienda.
          </p>
        </div>
      </div>

      <form className="border border-[#D4D4D4] bg-white p-5 shadow-sm sm:p-7">
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
                className="mt-2 h-12 w-full border border-[#BDBDBD] bg-[#F5F5F5] px-4 font-semibold outline-none transition focus:border-[#F97316]"
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
            className="mt-2 w-full border border-[#BDBDBD] bg-[#F5F5F5] px-4 py-3 font-semibold outline-none transition focus:border-[#F97316]"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full bg-[#F97316] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#2B2B2B] transition hover:bg-[#2B2B2B] hover:text-white"
        >
          Enviar solicitud
        </button>
      </form>
    </main>
  );
}
