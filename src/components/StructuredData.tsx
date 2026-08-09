import { business } from "@/content/site";

/**
 * Organization + Service structured data using ONLY verified facts.
 * Deliberately excludes aggregateRating / review data (no verified reviews),
 * and any licensing or registration claims that are not yet confirmed.
 */
export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || undefined;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: business.name,
        ...(siteUrl ? { url: siteUrl } : {}),
        email: business.email,
        telephone: business.phones.primary.display,
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address.line1,
          addressLocality: business.address.city,
          addressRegion: business.address.state,
          postalCode: business.address.postalCode,
          addressCountry: "US",
        },
      },
      {
        "@type": "Service",
        serviceType: "Vehicle transportation and dispatch coordination",
        provider: { "@type": "Organization", name: business.name },
        areaServed: [
          { "@type": "Country", name: "United States" },
          "International",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is fully controlled (no user input), safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
