import "server-only";
import { Resend } from "resend";
import { serverEnv } from "@/lib/env";
import { escapeHtml, normalizePhoneForDisplay } from "@/lib/sanitize";
import type { QuoteRequest } from "@/lib/quote-schema";

const scopeLabel: Record<QuoteRequest["shipmentScope"], string> = {
  domestic: "Within the USA",
  international: "International",
};

const transportLabel: Record<QuoteRequest["transportType"], string> = {
  open: "Open",
  enclosed: "Enclosed",
  unsure: "Not sure",
};

function timingText(req: QuoteRequest): string {
  if (req.availability === "asap") return "As soon as possible";
  return req.availableDate
    ? `On or after ${req.availableDate}`
    : "Specific date (not provided)";
}

export function buildSubject(req: QuoteRequest): string {
  const count = req.vehicles.length;
  return `New Carex Auto quote request — ${req.pickupLocation} to ${req.deliveryLocation} — ${count} vehicle(s)`;
}

export function buildText(req: QuoteRequest, referenceId: string): string {
  const lines: string[] = [];
  lines.push(`New Carex Auto quote request`);
  lines.push(`Reference: ${referenceId}`);
  lines.push("");
  lines.push("CUSTOMER");
  lines.push(`  Name:  ${req.customer.fullName}`);
  lines.push(`  Email: ${req.customer.email}`);
  lines.push(`  Phone: ${normalizePhoneForDisplay(req.customer.phone)}`);
  lines.push("");
  lines.push("ROUTE & TRANSPORT");
  lines.push(`  Scope:     ${scopeLabel[req.shipmentScope]}`);
  lines.push(`  Pickup:    ${req.pickupLocation}`);
  lines.push(`  Delivery:  ${req.deliveryLocation}`);
  lines.push(`  Transport: ${transportLabel[req.transportType]}`);
  lines.push("");
  lines.push(`VEHICLES (${req.vehicles.length})`);
  req.vehicles.forEach((v, i) => {
    lines.push(
      `  ${i + 1}. ${v.year} ${v.make} ${v.model} — ${
        v.operable ? "Operable" : "Not operable"
      }`,
    );
  });
  lines.push("");
  lines.push("TIMING & NOTES");
  lines.push(`  Availability: ${timingText(req)}`);
  lines.push(`  Notes: ${req.notes ? req.notes : "(none)"}`);
  lines.push("");
  lines.push("META");
  lines.push(`  Consent given at: ${req.submittedAt}`);
  lines.push(`  Source: ${req.source}`);
  lines.push(`  Reference: ${referenceId}`);
  return lines.join("\n");
}

export function buildHtml(req: QuoteRequest, referenceId: string): string {
  const e = escapeHtml;
  const vehicleRows = req.vehicles
    .map(
      (v, i) => `
      <tr>
        <td style="padding:8px 10px;border:1px solid #dfe3e6;">${i + 1}</td>
        <td style="padding:8px 10px;border:1px solid #dfe3e6;">${e(String(v.year))}</td>
        <td style="padding:8px 10px;border:1px solid #dfe3e6;">${e(v.make)}</td>
        <td style="padding:8px 10px;border:1px solid #dfe3e6;">${e(v.model)}</td>
        <td style="padding:8px 10px;border:1px solid #dfe3e6;">${v.operable ? "Operable" : "Not operable"}</td>
      </tr>`,
    )
    .join("");

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 10px;color:#687078;white-space:nowrap;">${e(label)}</td>
      <td style="padding:6px 10px;color:#111719;font-weight:600;">${value}</td>
    </tr>`;

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f6f7f8;font-family:Arial,Helvetica,sans-serif;color:#111719;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="background:#111719;color:#ffffff;padding:18px 22px;border-radius:12px 12px 0 0;">
        <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#ffb817;">Carex Auto</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px;">New quote request</div>
        <div style="font-size:13px;color:#c9ced2;margin-top:4px;">Reference ${e(referenceId)}</div>
      </div>
      <div style="background:#ffffff;padding:22px;border:1px solid #dfe3e6;border-top:none;border-radius:0 0 12px 12px;">
        <h2 style="font-size:15px;margin:0 0 8px;">Customer</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Name", e(req.customer.fullName))}
          ${row("Email", `<a href="mailto:${e(req.customer.email)}" style="color:#b42318;">${e(req.customer.email)}</a>`)}
          ${row("Phone", e(normalizePhoneForDisplay(req.customer.phone)))}
        </table>

        <h2 style="font-size:15px;margin:18px 0 8px;">Route &amp; transport</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Scope", e(scopeLabel[req.shipmentScope]))}
          ${row("Pickup", e(req.pickupLocation))}
          ${row("Delivery", e(req.deliveryLocation))}
          ${row("Transport", e(transportLabel[req.transportType]))}
        </table>

        <h2 style="font-size:15px;margin:18px 0 8px;">Vehicles (${req.vehicles.length})</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="background:#f6f7f8;">
              <th style="padding:8px 10px;border:1px solid #dfe3e6;text-align:left;">#</th>
              <th style="padding:8px 10px;border:1px solid #dfe3e6;text-align:left;">Year</th>
              <th style="padding:8px 10px;border:1px solid #dfe3e6;text-align:left;">Make</th>
              <th style="padding:8px 10px;border:1px solid #dfe3e6;text-align:left;">Model</th>
              <th style="padding:8px 10px;border:1px solid #dfe3e6;text-align:left;">Status</th>
            </tr>
          </thead>
          <tbody>${vehicleRows}</tbody>
        </table>

        <h2 style="font-size:15px;margin:18px 0 8px;">Timing &amp; notes</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Availability", e(timingText(req)))}
          ${row("Notes", req.notes ? e(req.notes) : "(none)")}
        </table>

        <div style="margin-top:18px;padding-top:14px;border-top:1px solid #dfe3e6;font-size:12px;color:#687078;">
          Consent given at ${e(req.submittedAt)} · Source ${e(req.source)} · Reference ${e(referenceId)}
        </div>
      </div>
    </div>
  </body>
</html>`;
}

export type SendResult =
  | { ok: true; referenceId: string }
  | { ok: false; referenceId: string };

/**
 * Send the lead email via Resend. Returns a generic result; detailed provider
 * errors are logged server-side only (without personal data).
 */
export async function sendQuoteEmail(
  req: QuoteRequest,
  referenceId: string,
): Promise<SendResult> {
  if (!serverEnv.resendApiKey) {
    console.error("[quote] RESEND_API_KEY is not configured.");
    return { ok: false, referenceId };
  }

  const resend = new Resend(serverEnv.resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: serverEnv.quoteFromEmail,
      to: serverEnv.quoteToEmail,
      replyTo: req.customer.email,
      subject: buildSubject(req),
      text: buildText(req, referenceId),
      html: buildHtml(req, referenceId),
    });

    if (error) {
      // Log a safe diagnostic (provider error name/message), never the lead body.
      console.error("[quote] Resend error:", error.name ?? "unknown");
      return { ok: false, referenceId };
    }

    return { ok: true, referenceId };
  } catch (err) {
    console.error(
      "[quote] Unexpected send failure:",
      err instanceof Error ? err.name : "unknown",
    );
    return { ok: false, referenceId };
  }
}
