import { CalendarClock, Globe2, MapPinned, ShieldCheck } from "lucide-react";
import { trustStrip } from "@/content/site";

const icons = [CalendarClock, MapPinned, Globe2, ShieldCheck];

export function TrustStrip() {
  return (
    <section aria-label="At a glance" className="border-b border-border bg-white">
      <div className="container-px mx-auto max-w-content py-6">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trustStrip.map((item, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-brand-red">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-brand-black">{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
