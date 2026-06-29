import Link from "next/link";

type CheckoutStatusProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  tone: "success" | "pending" | "failure";
  retry?: boolean;
};

const toneStyles = {
  success: "border-emerald-500 bg-emerald-50 text-emerald-700",
  pending: "border-amber-500 bg-amber-50 text-amber-700",
  failure: "border-[#F97316] bg-[#FFF7ED] text-[#C2410C]",
};

export function CheckoutStatus({ eyebrow, title, paragraphs, tone, retry = false }: CheckoutStatusProps) {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-3xl items-center px-4 py-12 sm:px-6">
      <section className="w-full rounded-3xl border border-black/10 bg-white p-7 text-center shadow-sm sm:p-12">
        <div className={`mx-auto grid h-16 w-16 place-items-center rounded-full border-2 text-2xl font-black ${toneStyles[tone]}`} aria-hidden="true">
          {tone === "success" ? "✓" : tone === "pending" ? "…" : "×"}
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-[#F97316]">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-black uppercase text-[#2B2B2B] sm:text-4xl">{title}</h1>
        <div className="mx-auto mt-5 max-w-xl space-y-3 text-base leading-7 text-[#4A4A4A]">
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {retry ? (
            <Link href="/checkout" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F97316] px-6 text-sm font-black uppercase tracking-[0.1em] text-[#2B2B2B]">
              Intentar nuevamente
            </Link>
          ) : null}
          <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFCFCF] px-6 text-sm font-black uppercase tracking-[0.1em] text-[#4A4A4A]">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
