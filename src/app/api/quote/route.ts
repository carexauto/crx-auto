import { NextResponse } from "next/server";
import { quoteSchema, type QuoteRequest } from "@/lib/quote-schema";
import { sendQuoteEmail } from "@/lib/send-quote-email";
import { sendQuoteViaWeb3Forms } from "@/lib/send-quote-web3forms";
import { emailProvider } from "@/lib/env";
import { createReferenceId } from "@/lib/reference-id";
import { cleanText } from "@/lib/sanitize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Reject oversized bodies early. The valid payload is small.
const MAX_BODY_BYTES = 16 * 1024;

// Very small in-memory throttle. Resets when the serverless instance recycles;
// a durable store (or Turnstile) should be added before heavy public promotion.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0]!.trim() : "unknown";
  return ip || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

function genericError(status = 502) {
  return NextResponse.json(
    { ok: false, error: "Unable to send your request right now." },
    { status },
  );
}

export async function POST(request: Request) {
  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  // Enforce content-length where provided.
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Request too large." },
      { status: 413 },
    );
  }

  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Request too large." },
        { status: 413 },
      );
    }
    raw = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    // Do not echo back full details; validation happens client-side too.
    return NextResponse.json(
      { ok: false, error: "Some details need attention." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: silently succeed so bots don't learn they were caught.
  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true, referenceId: createReferenceId() });
  }

  const referenceId = createReferenceId();

  const payload: QuoteRequest = {
    shipmentScope: data.shipmentScope,
    pickupLocation: cleanText(data.pickupLocation),
    deliveryLocation: cleanText(data.deliveryLocation),
    transportType: data.transportType,
    vehicles: data.vehicles.map((v) => ({
      year: v.year,
      make: cleanText(v.make),
      model: cleanText(v.model),
      operable: v.operable,
    })),
    availability: data.availability,
    availableDate:
      data.availability === "specific-date" ? data.availableDate : undefined,
    customer: {
      fullName: cleanText(data.customer.fullName),
      email: cleanText(data.customer.email),
      phone: cleanText(data.customer.phone),
    },
    notes: data.notes ? cleanText(data.notes) : undefined,
    consent: true,
    submittedAt: new Date().toISOString(),
    source: "carex-auto-website",
  };

  const result =
    emailProvider === "web3forms"
      ? await sendQuoteViaWeb3Forms(payload, referenceId)
      : await sendQuoteEmail(payload, referenceId);
  if (!result.ok) {
    return genericError();
  }

  return NextResponse.json({ ok: true, referenceId: result.referenceId });
}

// Reject other methods explicitly.
export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405 },
  );
}
