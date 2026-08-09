import { Anchor, Globe2, MapPinned } from "lucide-react";

export function ServiceArea() {
  return (
    <section aria-labelledby="service-area-heading" className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.15]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#ffb817" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container-px relative mx-auto max-w-content">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brand-yellow">
            Coverage
          </p>
          <h2 id="service-area-heading" className="mt-2 font-heading text-3xl font-extrabold sm:text-4xl">
            All 50 states—and beyond
          </h2>
          <p className="mt-3 text-white/80">
            Wherever your vehicle needs to go, we coordinate a route for it.
            Coast to coast across the United States, plus international shipping
            options for overseas destinations.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: MapPinned, title: "Nationwide", body: "Door-to-door coordination in every US state." },
            { icon: Globe2, title: "International", body: "Overseas shipping options for global moves." },
            { icon: Anchor, title: "Port logistics", body: "Coordination near ports and container terminals." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <c.icon aria-hidden className="h-6 w-6 text-brand-yellow" />
              <h3 className="mt-3 font-heading text-lg font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-white/75">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
