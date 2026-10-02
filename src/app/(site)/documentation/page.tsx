import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";
import CampusSoftwareSchema from "@/components/Schema/CampusSoftwareSchema";

export const metadata: Metadata = {
  title: "Organizer & Developer Documentation | Arthhwise Campus",
  description:
    "Comprehensive technical documentation and API reference for college finance clubs, fest organizers, and corporate administrators. Scoring algorithms, Excel export schemas, and webhook integrations.",
  keywords: [
    "Arthhwise documentation",
    "organizer API documentation",
    "paper trading tournament organizer API",
    "college stock market contest software docs",
    "mock stock competition rules and scoring",
    "stock simulator webhook integration",
    "live trading leaderboard algorithm",
  ],
  alternates: {
    canonical: "/documentation",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Organizer & Developer Documentation | Arthhwise Campus",
    description:
      "Technical specifications, scoring algorithms, export schemas, and webhook integrations for tournament organizers.",
    url: "https://arthhwise.com/documentation",
    siteName: "Arthhwise",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Documentation", href: "/documentation" },
        ]}
      />
      <CampusSoftwareSchema
        name="Arthhwise Campus — Organizer & Developer Documentation"
        description="Comprehensive technical documentation and API reference for college finance clubs, fest organizers, and corporate administrators."
        urlPath="/documentation"
        audienceType="College fest organizers, campus developers, finance society heads, corporate administrators"
      />
      <Documentation />
    </>
  );
}
