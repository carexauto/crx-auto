import "server-only";
import { serverEnv } from "@/lib/env";
import { normalizePhoneForDisplay } from "@/lib/sanitize";
import { buildSubject, buildText } from "@/lib/send-quote-email";
import type { QuoteRequest } from "@/lib/quote-schema";
import type { SendResult } from "@/lib/send-quote-email";

const scopeLabel = { domestic: "Within the USA", international: "International" } as const;
const transportLabel = { open: "Open", enclosed: "Enclosed", unsure: "Not sure" } as const;

/**
 * Deliver the lead via Web3Forms (no DNS required). We POST server-side so the
 * access key stays out of the browser and our validation/sanitization still
 * runs first. Web3Forms emails the submission to the address tied to the key
 * (set that to info@carextransport.com when creating the key).
 */
export async function sendQuoteViaWeb3Forms(
  req: QuoteRequest,
  referenceId: string,
): Promise<SendResult> {
  if (!serverEnv.web3formsKey) {
    console.error("[quote] WEB3FORMS_ACCESS_KEY is not configured.");
    return { ok: false, referenceId };
  }

  const vehicles = req.vehicles
    .map(
      (v, i) =>
        `${i + 1}. ${v.year} ${v.make} ${v.model} — ${v.operable ? "Operable" : "Not operable"}`,
    )
    .join("\n");

  const payload = {
    access_key: serverEnv.web3formsKey,
    subject: buildSubject(req),
    from_name: "Carex Auto Website",
    // Web3Forms sets the email Reply-To from this field.
    replyto: req.customer.email,
    // Readable fields (Web3Forms renders these into the email).
    Reference: referenceId,
    Name: req.customer.fullName,
    Email: req.customer.email,
    Phone: normalizePhoneForDisplay(req.customer.phone),
    Scope: scopeLabel[req.shipmentScope],
    Pickup: req.pickupLocation,
    Delivery: req.deliveryLocation,
    Transport: transportLabel[req.transportType],
    Vehicles: vehicles,
    Availability:
      req.availability === "asap"
        ? "As soon as possible"
        : req.availableDate
          ? `On or after ${req.availableDate}`
          : "Specific date (not provided)",
    Notes: req.notes ?? "(none)",
    Source: req.source,
    Consent_At: req.submittedAt,
    // Full formatted plain-text copy for convenience.
    message: buildText(req, referenceId),
  };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;

    if (!res.ok || !data?.success) {
      console.error(
        "[quote] Web3Forms rejected submission:",
        data?.message ?? `HTTP ${res.status}`,
      );
      return { ok: false, referenceId };
    }

    return { ok: true, referenceId };
  } catch (err) {
    console.error(
      "[quote] Web3Forms send failure:",
      err instanceof Error ? err.name : "unknown",
    );
    return { ok: false, referenceId };
  }
}
