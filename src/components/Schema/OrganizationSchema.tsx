import React from "react";

/**
 * Organization schema — tells Google/AI about who Arthhwise is.
 * Injected in root layout so it appears on every page.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Arthhwise",
  alternateName: ["Arthwise", "Arthhwise App"],
  url: "https://arthhwise.com",
  logo: "https://arthhwise.com/images/logo/logo.png",
  description:
    "Arthhwise is India's leading paper trading app and stock market learning platform. Practice virtual trading with real NSE data, compete in trading contests, and master the stock market — risk-free.",
  foundingDate: "2024",
  founders: [
    {
      "@type": "Person",
      name: "Saurabh Patel",
      jobTitle: "Co-Founder",
    },
  ],
  sameAs: [
    "https://play.google.com/store/apps/details?id=com.arthwise",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://arthhwise.com/contact",
    availableLanguage: ["English", "Hindi"],
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

/**
 * WebSite schema — enables sitelinks searchbox in Google
 * and tells AI models about the site structure.
 */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Arthhwise",
  alternateName: "Arthwise",
  url: "https://arthhwise.com",
  description:
    "India's leading paper trading app and stock market learning platform. Practice with ₹10,00,000 virtual capital and real NSE data.",
  publisher: {
    "@type": "Organization",
    name: "Arthhwise",
    url: "https://arthhwise.com",
  },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://arthhwise.com/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const OrganizationSchema = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
};

export default OrganizationSchema;
