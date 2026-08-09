"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="container-px mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          align="center"
        />
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-brand-black transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-brand-yellow"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      aria-hidden
                      className={`h-5 w-5 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-5 text-sm text-muted"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
