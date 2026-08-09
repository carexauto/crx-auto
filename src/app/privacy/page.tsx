import type { Metadata } from "next";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Carex Auto collects, uses, and protects information submitted through the quote request form.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  const updated = new Date().toISOString().split("T")[0];
  return (
    <main id="main" className="bg-white pt-24">
      <div className="container-px mx-auto max-w-3xl py-12">
        <p className="rounded-lg border border-brand-yellow bg-brand-yellow/10 px-4 py-3 text-sm font-semibold text-brand-black">
          Draft for professional legal review — not final. Approve before public
          launch.
        </p>

        <h1 className="mt-6 font-heading text-4xl font-extrabold text-brand-black">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>

        <div className="mt-8 space-y-6 text-brand-black">
          <section>
            <h2 className="font-heading text-xl font-bold">What we collect</h2>
            <p className="mt-2 text-muted">
              When you submit a quote request, we collect the information you
              provide: your name, email address, phone number, pickup and
              delivery locations, vehicle details, preferred timing, and any
              notes you add.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold">Why we collect it</h2>
            <p className="mt-2 text-muted">
              We use this information solely to prepare a rate and to contact you
              about your vehicle transport request.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold">Who receives it</h2>
            <p className="mt-2 text-muted">
              Quote requests are delivered by email to the {business.name} team.
              We do not sell your information. We may share relevant details with
              transport partners only as needed to coordinate your shipment.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold">Retention & contact</h2>
            <p className="mt-2 text-muted">
              We retain quote requests only as long as needed to serve you and
              meet business or legal requirements. To ask about or remove your
              information, contact us at{" "}
              <a href={`mailto:${business.email}`} className="font-semibold text-error underline">
                {business.email}
              </a>{" "}
              or{" "}
              <a href={business.phones.primary.href} className="font-semibold text-error underline">
                {business.phones.primary.display}
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold">Contact</h2>
            <p className="mt-2 text-muted">
              {business.name}
              <br />
              {business.address.full}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
