import React from "react";

interface CampusSoftwareSchemaProps {
  name?: string;
  description?: string;
  urlPath?: string;
  audienceType?: string;
  featureList?: string[];
}

const DEFAULT_FEATURES = [
  "Turn-key virtual stock market competition management software",
  "Live NSE and BSE stock market simulation with real-time ticks",
  "Futures and Options (F&O) paper trading with options Greeks and IV",
  "Private contest join codes and isolated ₹10 Lakh virtual wallets",
  "Real-time live leaderboard with net return and win-rate metrics",
  "Automated co-branded merit & participation PDF certificates",
  "One-click master Excel export of student trades and ranking audit logs",
  "Anti-cheat print verification and realistic execution controls",
];

/**
 * Renders SoftwareApplication structured data specifically tailored for
 * campus, tournament, and enterprise contest landing pages.
 * Highly indexed by AI search agents (Perplexity, ChatGPT, Claude, Google SGE).
 */
const CampusSoftwareSchema: React.FC<CampusSoftwareSchemaProps> = ({
  name = "Arthhwise Campus — College Stock Market Competition Software",
  description = "A turn-key platform for colleges, universities, finance clubs, and E-Summits to host custom paper trading competitions with real-time NSE/BSE and F&O market data.",
  urlPath = "/organize-college-trading-contest",
  audienceType = "College students, finance cells, investment clubs, university organizers, E-Summits",
  featureList = DEFAULT_FEATURES,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    operatingSystem: "Web, Android, iOS",
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Virtual Trading Tournament Organizer & Contest Creator",
    url: `https://arthhwise.com${urlPath.startsWith("/") ? urlPath : `/${urlPath}`}`,
    downloadUrl: [
      "https://apps.apple.com/in/app/arthhwise-paper-trading-f-o/id6803604616",
      "https://play.google.com/store/apps/details?id=com.arthwise",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description: "100% Free for educational institutions, finance clubs, and colleges",
    },
    description,
    featureList,
    targetAudience: {
      "@type": "Audience",
      audienceType,
    },
    author: {
      "@type": "Organization",
      name: "Arthhwise",
      url: "https://arthhwise.com",
    },
    inLanguage: "en-IN",
    countryOfOrigin: "IN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default CampusSoftwareSchema;
