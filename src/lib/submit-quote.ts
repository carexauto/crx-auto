import { createReferenceId } from "@/lib/reference-id";
import type { QuoteFormValues } from "@/lib/quote-schema";

export type SubmitResult =
  | { ok: true; referenceId: string }
  | { ok: false };

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const scopeLabel = {
  domestic: "Within the USA",
  international: "International",
} as const;

const transportLabel = {
  open: "Open",
  enclosed: "Enclosed",
  unsure: "Not sure",
} as const;

/**
 * Client-side submission adapter.
 *
 * Web3Forms sits behind Cloudflare bot protection and is designed to be called
 * from the browser (a real visitor's browser passes the managed challenge
 * invisibly, which a server-side call cannot). So we post directly to Web3Forms
 * here. Zod validation has already run via the form resolver before this is
 * called; the honeypot is enforced below.
 *
 * The access key is intentionally public (NEXT_PUBLIC_*) — Web3Forms keys are
 * built for client use and protected by their own spam filtering, allowed
 * domains, and honeypot.
 */
export async function submitQuote(
  values: QuoteFormValues,
  signal?: AbortSignal,
): Promise<SubmitResult> {
  const referenceId = createReferenceId();

  // Honeypot: pretend success so bots don't learn they were filtered.
  if (values.company && values.company.length > 0) {
    return { ok: true, referenceId };
  }

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { ok: false };
  }

  const vehicles = values.vehicles
    .map(
      (v, i) =>
        `${i + 1}. ${v.year} ${v.make} ${v.model} — ${v.operable ? "Operable" : "Not operable"}`,
    )
    .join("\n");

  const availability =
    values.availability === "asap"
      ? "As soon as possible"
      : values.availableDate
        ? `On or after ${values.availableDate}`
        : "Specific date (not provided)";

  const message = [
    `New Carex Auto quote request`,
    `Reference: ${referenceId}`,
    ``,
    `CUSTOMER`,
    `  Name:  ${values.customer.fullName}`,
    `  Email: ${values.customer.email}`,
    `  Phone: ${values.customer.phone}`,
    ``,
    `ROUTE & TRANSPORT`,
    `  Scope:     ${scopeLabel[values.shipmentScope]}`,
    `  Pickup:    ${values.pickupLocation}`,
    `  Delivery:  ${values.deliveryLocation}`,
    `  Transport: ${transportLabel[values.transportType]}`,
    ``,
    `VEHICLES (${values.vehicles.length})`,
    vehicles,
    ``,
    `TIMING & NOTES`,
    `  Availability: ${availability}`,
    `  Notes: ${values.notes ? values.notes : "(none)"}`,
    ``,
    `Reference: ${referenceId} · Source: carex-auto-website`,
  ].join("\n");

  const payload = {
    access_key: accessKey,
    subject: `New Carex Auto quote request — ${values.pickupLocation} to ${values.deliveryLocation} — ${values.vehicles.length} vehicle(s)`,
    from_name: "Carex Auto Website",
    // Web3Forms sets the email Reply-To from this field.
    replyto: values.customer.email,
    // Web3Forms' own honeypot field — must stay empty/false.
    botcheck: false,
    // Readable fields rendered into the email.
    Reference: referenceId,
    Name: values.customer.fullName,
    Email: values.customer.email,
    Phone: values.customer.phone,
    Scope: scopeLabel[values.shipmentScope],
    Pickup: values.pickupLocation,
    Delivery: values.deliveryLocation,
    Transport: transportLabel[values.transportType],
    Vehicles: vehicles,
    Availability: availability,
    Notes: values.notes ? values.notes : "(none)",
    message,
  };

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal,
    });

    const data = (await res.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;

    if (res.ok && data?.success) {
      return { ok: true, referenceId };
    }
    return { ok: false };
  } catch {
    return { ok: false };
  }
}
