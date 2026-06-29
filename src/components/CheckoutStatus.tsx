import Link from "next/link";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/Icons";

type CheckoutStatusProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  tone: "success" | "pending" | "failure";
  retry?: boolean;
  continueShopping?: boolean;
  whatsapp?: boolean;
  children?: ReactNode;
};

const toneStyles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  failure: "border-orange-200 bg-orange-50 text-[#C2410C]",
};

function StatusIcon({ tone }: { tone: CheckoutStatusProps["tone"] }) {
  if (tone === "success") {
    return <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m6 12 4 4 8-9" /></svg>;
  }
  if (tone === "pending") {
    return <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8" /><path strokeLinecap="round" d="M12 8v4l2.5 2" /></svg>;
  }
  return <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="m8 8 8 8m0-8-8 8" /></svg>;
}

export function CheckoutStatus({ eyebrow, title, paragraphs, tone, retry = false, continueShopping = false, whatsapp = false, children }: CheckoutStatusProps) {
  return (
    <main className="relative isolate flex min-h-[72vh] items-center overflow-hidden px-4 py-14 sm:px-6">
      <div className="absolute inset-0 -z-20 bg-[#EEECE7]" />
      <div className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(36,36,36,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(36,36,36,.04)_1px,transparent_1px)] [background-size:32px_32px]" />
      <section className="premium-panel mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem]">
        <div className="h-1.5 bg-[#F97316]" />
        <div className="p-7 text-center sm:p-12">
          <div className={`mx-auto grid h-18 w-18 place-items-center rounded-2xl border ${toneStyles[tone]}`} aria-hidden="true"><StatusIcon tone={tone} /></div>
          <p className="mt-7 text-[11px] font-black uppercase tracking-[0.2em] text-[#F97316]">{eyebrow}</p>
          <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-black uppercase tracking-[-0.035em] text-[#242424] sm:text-4xl">{title}</h1>
          <div className="mx-auto mt-5 max-w-xl space-y-3 text-base leading-7 text-[#5E5E5E]">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {children}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {retry ? <Link href="/checkout" className="premium-button inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F97316] px-6 text-xs font-black uppercase tracking-[0.1em] text-[#242424] transition hover:-translate-y-0.5 hover:bg-[#242424] hover:text-white">Intentar nuevamente</Link> : null}
            <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-black/10 bg-white px-6 text-xs font-black uppercase tracking-[0.1em] text-[#4A4A4A] transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md">Volver al inicio</Link>
            {continueShopping ? <Link href="/catalogo" className="premium-button inline-flex min-h-12 items-center justify-center rounded-xl bg-[#242424] px-6 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:-translate-y-0.5 hover:bg-[#F97316] hover:text-[#242424]">Seguir comprando</Link> : null}
            {whatsapp ? <a href="https://wa.me/525573328442" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-xs font-black uppercase tracking-[0.1em] text-[#102018] transition hover:-translate-y-0.5 hover:shadow-lg"><WhatsAppIcon className="h-5 w-5" /> WhatsApp</a> : null}
          </div>
        </div>
      </section>
    </main>
  );
}
