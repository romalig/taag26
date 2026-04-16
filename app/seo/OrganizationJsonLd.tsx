import { siteUrl } from "./site";

/** Public org data for JSON-LD (aligned with corporate presence; refine via env later). */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TAAG",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  description:
    "Advanced molecular microbiology solutions, laboratory services, and intelligent software for food safety and industrial quality.",
  telephone: "+1-562-888-6575",
  email: "support@taag-genetics.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15300 Valley View Avenue",
    addressLocality: "La Mirada",
    addressRegion: "CA",
    postalCode: "90638",
    addressCountry: "US",
  },
} as const;

export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organization),
      }}
    />
  );
}
