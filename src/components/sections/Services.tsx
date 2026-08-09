import { Boxes, Globe2, Truck, Users } from "lucide-react";
import { services } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [Truck, Globe2, Boxes, Users];

export function Services() {
  return (
    <section id="services" className="bg-surface py-16 sm:py-20">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="What we do"
          title="Vehicle transport, coordinated end to end"
          intro="Flexible transport coordination for every kind of shipment—across the US and internationally."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <article
                key={s.title}
                className="group rounded-2xl border border-border bg-white p-6 transition hover:border-brand-black hover:shadow-lg hover:shadow-brand-black/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-black text-brand-yellow">
                  <Icon aria-hidden className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-brand-black">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
