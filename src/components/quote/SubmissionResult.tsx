"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, Phone, RotateCcw } from "lucide-react";
import { business } from "@/content/site";

export function SubmissionResult({
  referenceId,
  onReset,
}: {
  referenceId: string;
  onReset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div
      className="flex flex-col items-center py-4 text-center"
      role="status"
      aria-live="polite"
    >
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 aria-hidden className="h-8 w-8" />
      </span>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="font-heading text-2xl font-bold text-brand-black outline-none"
      >
        Your quote request was sent.
      </h3>
      <p className="mt-2 max-w-sm text-muted">
        Thank you! We&apos;ve received your transport details and will contact
        you shortly.
      </p>
      <p className="mt-4 rounded-full bg-surface px-4 py-1.5 text-sm font-semibold text-brand-black">
        Request reference:{" "}
        <span className="font-mono tracking-wide">{referenceId}</span>
      </p>

      <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={business.phones.primary.href}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-black px-5 py-2.5 font-semibold text-white transition hover:bg-black focus-visible:ring-2 focus-visible:ring-brand-yellow"
        >
          <Phone aria-hidden className="h-4 w-4" />
          Call Carex Auto
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 py-2.5 font-semibold text-brand-black transition hover:border-brand-black focus-visible:ring-2 focus-visible:ring-brand-yellow"
        >
          <RotateCcw aria-hidden className="h-4 w-4" />
          Submit Another Request
        </button>
      </div>
    </div>
  );
}
