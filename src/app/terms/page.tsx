import type { Metadata } from "next";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the Carex Auto website and quote request form.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  const updated = new Date().toISOString().split("T")[0];
  return (
    <main id="main" className="bg-white pt-24">
      <div className="container-px mx-auto max-w-3xl py-12">
        <p className="rounded-lg border border-brand-yellow bg-brand-yellow/10 px-4 py-3 text-sm font-semibold text-brand-black">
          Draft for professional legal review — not final. Approve before public
          launch.
        </p>

        <h1 className="mt-6 font-heading text-4xl font-extrabold text-brand-black">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>

        <div className="mt-8 space-y-6 text-brand-black">
          <section>
            <h2 className="font-heading text-xl font-bold">Quote requests</h2>
            <p className="mt-2 text-muted">
              Submitting the form sends a request for a rate. It is not a booking,
              contract, or guaranteed price. {business.name} will contact you with
              a rate and any next steps.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold">Accuracy of information</h2>
            <p className="mt-2 text-muted">
              Please provide accurate shipment details. Rates and availability may
              change based on the final vehicle, route, timing, and conditions.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold">Website use</h2>
            <p className="mt-2 text-muted">
              This website is provided for informational purposes. We work to keep
              it accurate but do not warrant that all content is complete or
              error-free.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold">Contact</h2>
            <p className="mt-2 text-muted">
              Questions about these terms? Contact{" "}
              <a href={`mailto:${business.email}`} className="font-semibold text-error underline">
                {business.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
