import { whoWeHelp } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhoWeHelp() {
  return (
    <section aria-labelledby="who-we-help-heading" className="bg-white py-16 sm:py-20">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="Who we help"
          title={<span id="who-we-help-heading">Built for every kind of customer</span>}
          intro="From a single owner to high-volume partners, we tailor coordination to the shipment."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {whoWeHelp.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-5 transition hover:border-brand-black"
            >
              <h3 className="font-heading text-base font-bold text-brand-black">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
