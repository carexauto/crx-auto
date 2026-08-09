import { SHOW_TESTIMONIALS, sampleTestimonials } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Testimonials are hidden until genuine, approved testimonials exist.
 * Even when SHOW_TESTIMONIALS is enabled, sample cards render only outside
 * production so unverified quotes never reach real visitors.
 */
export function Testimonials() {
  const isProduction = process.env.NODE_ENV === "production";
  if (!SHOW_TESTIMONIALS || isProduction) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="bg-surface py-16 sm:py-20">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          title={<span id="testimonials-heading">What customers say</span>}
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {sampleTestimonials.map((t, i) => (
            <figure key={i} className="rounded-2xl border-2 border-dashed border-brand-red bg-white p-6">
              <figcaption className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-red">
                Sample testimonial — replace before launch
              </figcaption>
              <blockquote className="text-brand-black">&ldquo;{t.quote}&rdquo;</blockquote>
              <p className="mt-3 text-sm text-muted">
                {t.author} · {t.location}
              </p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
