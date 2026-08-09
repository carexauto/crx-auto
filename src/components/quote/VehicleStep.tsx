"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import {
  MAX_VEHICLES,
  MAX_VEHICLE_YEAR,
  MIN_VEHICLE_YEAR,
  type QuoteFormValues,
} from "@/lib/quote-schema";
import { FieldError, Label, inputClass } from "@/components/ui/field";

const years: number[] = [];
for (let y = MAX_VEHICLE_YEAR; y >= MIN_VEHICLE_YEAR; y -= 1) years.push(y);

export function VehicleStep() {
  const {
    register,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vehicles",
  });

  function handleRemove(index: number) {
    const v = getValues(`vehicles.${index}`);
    const hasData = Boolean(v?.make?.trim() || v?.model?.trim());
    if (hasData) {
      const ok = window.confirm(
        `Remove Vehicle ${index + 1}? The details you entered will be lost.`,
      );
      if (!ok) return;
    }
    remove(index);
  }

  return (
    <div className="space-y-5">
      {fields.map((field, index) => {
        const vErrors = errors.vehicles?.[index];
        return (
          <div
            key={field.id}
            className="rounded-xl border border-border bg-surface/60 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide text-brand-black">
                Vehicle {index + 1}
              </h3>
              {index > 0 ? (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold text-error transition hover:bg-error/10 focus-visible:ring-2 focus-visible:ring-error"
                >
                  <Trash2 aria-hidden className="h-4 w-4" />
                  Remove
                  <span className="sr-only"> vehicle {index + 1}</span>
                </button>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor={`vehicles.${index}.year`}>Year</Label>
                <select
                  id={`vehicles.${index}.year`}
                  className={inputClass}
                  aria-invalid={vErrors?.year ? true : undefined}
                  aria-describedby={`err-year-${index}`}
                  {...register(`vehicles.${index}.year`, { valueAsNumber: true })}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <FieldError id={`err-year-${index}`} message={vErrors?.year?.message} />
              </div>

              <div>
                <Label htmlFor={`vehicles.${index}.make`}>Make</Label>
                <input
                  id={`vehicles.${index}.make`}
                  type="text"
                  autoComplete="off"
                  className={inputClass}
                  placeholder="e.g. Toyota"
                  aria-invalid={vErrors?.make ? true : undefined}
                  aria-describedby={`err-make-${index}`}
                  {...register(`vehicles.${index}.make`)}
                />
                <FieldError id={`err-make-${index}`} message={vErrors?.make?.message} />
              </div>

              <div>
                <Label htmlFor={`vehicles.${index}.model`}>Model</Label>
                <input
                  id={`vehicles.${index}.model`}
                  type="text"
                  autoComplete="off"
                  className={inputClass}
                  placeholder="e.g. Camry"
                  aria-invalid={vErrors?.model ? true : undefined}
                  aria-describedby={`err-model-${index}`}
                  {...register(`vehicles.${index}.model`)}
                />
                <FieldError id={`err-model-${index}`} message={vErrors?.model?.message} />
              </div>

              <fieldset>
                <legend className="mb-1.5 text-sm font-semibold text-brand-black">
                  Operable?
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: true, label: "Yes" },
                    { val: false, label: "No" },
                  ].map((o) => {
                    const selected = watch(`vehicles.${index}.operable`) === o.val;
                    return (
                      <label
                        key={o.label}
                        className="flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-brand-black transition has-[:checked]:border-brand-black has-[:checked]:bg-brand-yellow has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-yellow"
                      >
                        <input
                          type="radio"
                          name={`vehicles.${index}.operable`}
                          className="sr-only"
                          checked={selected}
                          onChange={() =>
                            setValue(`vehicles.${index}.operable`, o.val, {
                              shouldValidate: true,
                              shouldDirty: true,
                            })
                          }
                        />
                        {o.label}
                      </label>
                    );
                  })}
                </div>
                <FieldError
                  id={`err-operable-${index}`}
                  message={vErrors?.operable?.message}
                />
              </fieldset>
            </div>
          </div>
        );
      })}

      {typeof errors.vehicles?.message === "string" ? (
        <FieldError id="err-vehicles" message={errors.vehicles.message} />
      ) : null}

      {fields.length < MAX_VEHICLES ? (
        <button
          type="button"
          onClick={() =>
            append({ year: MAX_VEHICLE_YEAR, make: "", model: "", operable: true })
          }
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-2 text-sm font-semibold text-brand-black transition hover:border-brand-black focus-visible:ring-2 focus-visible:ring-brand-yellow"
        >
          <Plus aria-hidden className="h-4 w-4" />
          Add another vehicle
        </button>
      ) : (
        <p className="text-sm text-muted">You can add up to {MAX_VEHICLES} vehicles.</p>
      )}
    </div>
  );
}
