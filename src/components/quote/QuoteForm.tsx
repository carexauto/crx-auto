"use client";

import { useRef, useState } from "react";
import { FormProvider, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import {
  emptyQuoteValues,
  quoteSchema,
  type QuoteFormValues,
} from "@/lib/quote-schema";
import { submitQuote } from "@/lib/submit-quote";
import { business } from "@/content/site";
import { ProgressIndicator } from "./ProgressIndicator";
import { RouteStep } from "./RouteStep";
import { VehicleStep } from "./VehicleStep";
import { ContactStep } from "./ContactStep";
import { SubmissionResult } from "./SubmissionResult";

type Step = 1 | 2 | 3;

const stepFields: Record<Step, FieldPath<QuoteFormValues>[]> = {
  1: ["shipmentScope", "pickupLocation", "deliveryLocation", "transportType"],
  2: ["vehicles"],
  3: [
    "customer.fullName",
    "customer.email",
    "customer.phone",
    "availability",
    "availableDate",
    "notes",
    "consent",
  ],
};

export function QuoteForm() {
  const methods = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: emptyQuoteValues,
    mode: "onTouched",
  });

  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">(
    "idle",
  );
  const [referenceId, setReferenceId] = useState<string>("");
  const abortRef = useRef<AbortController | null>(null);

  async function goNext() {
    const valid = await methods.trigger(stepFields[step], { shouldFocus: true });
    if (!valid) return;
    setStep((s) => (Math.min(3, s + 1) as Step));
  }

  function goBack() {
    setStep((s) => (Math.max(1, s - 1) as Step));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLElement;
    if (target.tagName === "TEXTAREA") return;
    // On steps 1 & 2, Enter should advance rather than submit / skip fields.
    if (step !== 3) {
      e.preventDefault();
      void goNext();
    }
  }

  const onSubmit = async (values: QuoteFormValues) => {
    if (status === "sending") return; // prevent duplicate submissions
    setStatus("sending");
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const result = await submitQuote(values, controller.signal);
    if (result.ok) {
      setReferenceId(result.referenceId);
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  function resetForm() {
    methods.reset(emptyQuoteValues);
    setReferenceId("");
    setStatus("idle");
    setStep(1);
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 shadow-lg shadow-brand-black/5 sm:p-7">
        <SubmissionResult referenceId={referenceId} onReset={resetForm} />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-lg shadow-brand-black/5 sm:p-7">
      <div className="mb-5">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-error">
          Free quote request
        </p>
        <ProgressIndicator current={step} />
      </div>

      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={methods.handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
          aria-label="Vehicle transport quote request"
        >
          {/* Honeypot: hidden from users, tempting to bots. */}
          <div aria-hidden className="hidden">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...methods.register("company")}
            />
          </div>

          <div className={step === 1 ? "" : "hidden"}>
            <RouteStep />
          </div>
          <div className={step === 2 ? "" : "hidden"}>
            <VehicleStep />
          </div>
          <div className={step === 3 ? "" : "hidden"}>
            <ContactStep />
          </div>

          {status === "error" ? (
            <div
              role="alert"
              className="mt-5 flex items-start gap-2 rounded-lg border border-error/30 bg-error/5 p-3 text-sm text-error"
            >
              <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                We couldn&apos;t send your request. Please try again or call{" "}
                <a href={business.phones.primary.href} className="font-bold underline">
                  {business.phones.primary.display}
                </a>
                .
              </span>
            </div>
          ) : null}

          <div className="mt-6 flex items-center gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 font-semibold text-brand-black transition hover:border-brand-black focus-visible:ring-2 focus-visible:ring-brand-yellow"
              >
                <ArrowLeft aria-hidden className="h-4 w-4" />
                Back
              </button>
            ) : null}

            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                className="ml-auto inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-yellow px-6 py-2.5 font-bold text-brand-black transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-brand-black"
              >
                Continue
                <ArrowRight aria-hidden className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "sending"}
                className="ml-auto inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-yellow px-6 py-2.5 font-bold text-brand-black transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-brand-black disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Request My Free Quote"
                )}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
