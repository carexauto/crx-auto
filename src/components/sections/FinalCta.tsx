import { Phone } from "lucide-react";
import { business, finalCta } from "@/content/site";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-surface py-16 sm:py-20">
      <div className="container-px mx-auto max-w-content">
        <div className="relative overflow-hidden rounded-3xl bg-brand-black px-6 py-12 text-center text-white sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_240px_at_50%_0%,rgba(255,184,23,0.18),transparent)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="final-cta-heading" className="font-heading text-3xl font-extrabold sm:text-4xl">
              {finalCta.headline}
            </h2>
            <p className="mt-3 text-white/80">{finalCta.reassurance}</p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#quote"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-brand-yellow px-6 py-3 text-base font-bold text-brand-black transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-white"
              >
                {finalCta.button}
              </a>
              <a
                href={business.phones.primary.href}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-base font-semibold text-white transition hover:border-white focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone aria-hidden className="h-5 w-5" />
                {business.phones.primary.display}
              </a>
            </div>

            <p className="mt-4 text-sm text-white/70">
              Prefer to talk?{" "}
              <a href={business.phones.secondary.href} className="font-semibold text-brand-yellow">
                {business.phones.secondary.display}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
