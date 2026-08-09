"use client";

import { useFormContext } from "react-hook-form";
import type { QuoteFormValues } from "@/lib/quote-schema";
import { FieldError, HelpText, Label, inputClass } from "@/components/ui/field";

const scopeOptions = [
  { value: "domestic", label: "Within the USA" },
  { value: "international", label: "International" },
] as const;

const transportOptions = [
  { value: "open", label: "Open" },
  { value: "enclosed", label: "Enclosed" },
  { value: "unsure", label: "Not sure" },
] as const;

export function RouteStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  const scope = watch("shipmentScope");
  const isInternational = scope === "international";

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold text-brand-black">
          Shipment scope
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {scopeOptions.map((o) => (
            <label
              key={o.value}
              className="flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-brand-black transition has-[:checked]:border-brand-black has-[:checked]:bg-brand-yellow has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-yellow"
            >
              <input
                type="radio"
                value={o.value}
                className="sr-only"
                {...register("shipmentScope")}
              />
              {o.label}
            </label>
          ))}
        </div>
        <FieldError id="err-scope" message={errors.shipmentScope?.message} />
      </fieldset>

      <div>
        <Label htmlFor="pickupLocation">Pickup location</Label>
        <input
          id="pickupLocation"
          type="text"
          autoComplete="off"
          className={inputClass}
          placeholder={
            isInternational ? "City, region, country, postal code" : "City, State or ZIP"
          }
          aria-invalid={errors.pickupLocation ? true : undefined}
          aria-describedby="help-pickup err-pickup"
          {...register("pickupLocation")}
        />
        <HelpText id="help-pickup">
          {isInternational
            ? "Example: Los Angeles, CA, USA 90001"
            : "Example: Los Angeles, CA 90001"}
        </HelpText>
        <FieldError id="err-pickup" message={errors.pickupLocation?.message} />
      </div>

      <div>
        <Label htmlFor="deliveryLocation">Delivery location</Label>
        <input
          id="deliveryLocation"
          type="text"
          autoComplete="off"
          className={inputClass}
          placeholder={
            isInternational ? "City, region, country, postal code" : "City, State or ZIP"
          }
          aria-invalid={errors.deliveryLocation ? true : undefined}
          aria-describedby="help-delivery err-delivery"
          {...register("deliveryLocation")}
        />
        <HelpText id="help-delivery">
          {isInternational
            ? "Example: Hamburg, Germany 20095"
            : "Example: Miami, FL 33101"}
        </HelpText>
        <FieldError id="err-delivery" message={errors.deliveryLocation?.message} />
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold text-brand-black">
          Transport type
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {transportOptions.map((o) => (
            <label
              key={o.value}
              className="flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg border border-border bg-white px-2 py-2 text-center text-sm font-semibold text-brand-black transition has-[:checked]:border-brand-black has-[:checked]:bg-brand-yellow has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-yellow"
            >
              <input
                type="radio"
                value={o.value}
                className="sr-only"
                {...register("transportType")}
              />
              {o.label}
            </label>
          ))}
        </div>
        <FieldError id="err-transport" message={errors.transportType?.message} />
      </fieldset>
    </div>
  );
}
