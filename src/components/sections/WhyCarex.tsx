import { Check } from "lucide-react";
import { whyCarex } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyCarex() {
  return (
    <section id="why-carex" className="bg-surface py-16 sm:py-20">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="Why Carex Auto"
          title="Dependable support at every mile"
          intro="Five years of coordinating vehicle transport for customers who value clear communication and reliable options."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyCarex.map((item) => (
            <div key={item.title} className="flex gap-3 rounded-2xl border border-border bg-white p-5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                <Check aria-hidden className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-heading text-base font-bold text-brand-black">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
