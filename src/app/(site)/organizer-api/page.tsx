import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";
import CampusSoftwareSchema from "@/components/Schema/CampusSoftwareSchema";

export const metadata: Metadata = {
  title: "Tournament Organizer API & Webhooks | Arthhwise Campus",
  description:
    "Open API documentation, webhook specifications, and data export schemas for college trading tournament organizers and campus ERP integrations.",
  keywords: [
    "trading tournament organizer API",
    "paper trading contest creator API",
    "mock stock competition software webhooks",
    "Arthhwise developer API",
    "campus trading leaderboard API",
  ],
  alternates: {
    canonical: "/organizer-api",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tournament Organizer API & Webhooks | Arthhwise Campus",
    description:
      "Open API documentation, webhook specifications, and data export schemas for college trading tournament organizers.",
    url: "https://arthhwise.com/organizer-api",
    siteName: "Arthhwise",
  },
};

export default function OrganizerApiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Organizer Toolkit", href: "/organizer-toolkit" },
          { name: "Organizer API", href: "/organizer-api" },
        ]}
      />
      <CampusSoftwareSchema
        name="Arthhwise Campus — Tournament Organizer API & Webhook Specifications"
        description="Open API documentation, webhook specifications, and data export schemas for college trading tournament organizers and campus ERP integrations."
        urlPath="/organizer-api"
        audienceType="College fest organizers, campus developers, finance society heads, corporate administrators"
      />
      <Documentation />
    </>
  );
}
