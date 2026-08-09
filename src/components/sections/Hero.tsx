import { Phone } from "lucide-react";
import { business, hero } from "@/content/site";
import { QuoteForm } from "@/components/quote/QuoteForm";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-brand-black pt-24 pb-14 text-white sm:pt-28"
    >
      {/* Layered brand gradient stands in for the licensed hero photo until one
          is added. See ASSET-SOURCES.md. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_80%_-10%,rgba(255,184,23,0.16),transparent),radial-gradient(900px_500px_at_0%_20%,rgba(245,54,56,0.14),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-black to-transparent" />
      </div>

      <div className="container-px relative mx-auto grid max-w-content items-center gap-10 lg:grid-cols-2">
        <div className="animate-fade-in">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-yellow ring-1 ring-white/15">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            {hero.h1}
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            {hero.supporting}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-brand-yellow px-6 py-3 text-base font-bold text-brand-black transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-white"
            >
              {hero.primaryCta}
            </a>
            <a
              href={business.phones.primary.href}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-base font-semibold text-white transition hover:border-white focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone aria-hidden className="h-5 w-5" />
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <div id="quote" className="scroll-mt-24">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
