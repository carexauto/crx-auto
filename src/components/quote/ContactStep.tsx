"use client";

import { useFormContext } from "react-hook-form";
import Link from "next/link";
import { consentText } from "@/content/site";
import { MAX_NOTES, type QuoteFormValues } from "@/lib/quote-schema";
import { FieldError, HelpText, Label, inputClass } from "@/components/ui/field";

const todayISO = () => new Date().toISOString().split("T")[0];

export function ContactStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  const availability = watch("availability");
  const notes = watch("notes") ?? "";

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="customer.fullName">Full name</Label>
        <input
          id="customer.fullName"
          type="text"
          autoComplete="name"
          className={inputClass}
          aria-invalid={errors.customer?.fullName ? true : undefined}
          aria-describedby="err-fullName"
          {...register("customer.fullName")}
        />
        <FieldError id="err-fullName" message={errors.customer?.fullName?.message} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="customer.email">Email</Label>
          <input
            id="customer.email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={inputClass}
            aria-invalid={errors.customer?.email ? true : undefined}
            aria-describedby="err-email"
            {...register("customer.email")}
          />
          <FieldError id="err-email" message={errors.customer?.email?.message} />
        </div>

        <div>
          <Label htmlFor="customer.phone">Phone</Label>
          <input
            id="customer.phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="e.g. (302) 333-6571"
            aria-invalid={errors.customer?.phone ? true : undefined}
            aria-describedby="err-phone"
            {...register("customer.phone")}
          />
          <FieldError id="err-phone" message={errors.customer?.phone?.message} />
        </div>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold text-brand-black">
          First available pickup
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { value: "asap", label: "As soon as possible" },
            { value: "specific-date", label: "Choose a date" },
          ].map((o) => (
            <label
              key={o.value}
              className="flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-brand-black transition has-[:checked]:border-brand-black has-[:checked]:bg-brand-yellow has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-yellow"
            >
              <input
                type="radio"
                value={o.value}
                className="sr-only"
                {...register("availability")}
              />
              {o.label}
            </label>
          ))}
        </div>
        <FieldError id="err-availability" message={errors.availability?.message} />
      </fieldset>

      {availability === "specific-date" ? (
        <div>
          <Label htmlFor="availableDate">Preferred pickup date</Label>
          <input
            id="availableDate"
            type="date"
            min={todayISO()}
            className={inputClass}
            aria-invalid={errors.availableDate ? true : undefined}
            aria-describedby="err-availableDate"
            {...register("availableDate")}
          />
          <FieldError id="err-availableDate" message={errors.availableDate?.message} />
        </div>
      ) : null}

      <div>
        <Label htmlFor="notes" hint="(optional)">
          Additional notes
        </Label>
        <textarea
          id="notes"
          rows={3}
          maxLength={MAX_NOTES}
          className={`${inputClass} resize-y`}
          placeholder="Anything else we should know? Modifications, timing constraints, etc."
          aria-describedby="help-notes err-notes"
          {...register("notes")}
        />
        <HelpText id="help-notes">
          {notes.length}/{MAX_NOTES} characters
        </HelpText>
        <FieldError id="err-notes" message={errors.notes?.message} />
      </div>

      <div className="rounded-lg border border-border bg-surface/60 p-3">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-brand-black">
          <input
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-border text-brand-black focus-visible:ring-2 focus-visible:ring-brand-yellow"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby="err-consent"
            {...register("consent")}
          />
          <span>
            {consentText}{" "}
            <Link href="/privacy" className="font-semibold text-error underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="font-semibold text-error underline">
              Terms
            </Link>
            .
          </span>
        </label>
        <FieldError id="err-consent" message={errors.consent?.message} />
      </div>
    </div>
  );
}
