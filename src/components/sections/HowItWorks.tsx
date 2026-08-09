import { howItWorks } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="How it works"
          title="Three simple steps to a rate"
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {howItWorks.map((s) => (
            <li key={s.step} className="relative rounded-2xl border border-border bg-surface p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow font-heading text-lg font-extrabold text-brand-black">
                {s.step}
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-brand-black">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
