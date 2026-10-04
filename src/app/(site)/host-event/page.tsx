import { Metadata } from "next";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";
import CampusSoftwareSchema from "@/components/Schema/CampusSoftwareSchema";
import OrganizerExperience from "@/components/HostEvent/OrganizerExperience";

export const metadata: Metadata = {
  title: "Host Your Own Live Market | Arthhwise Campus",
  description:
    "Run a branded stock market competition from registration to the final leaderboard. Configure rules, load participants, control live rounds, and publish results with Arthhwise Campus.",
  keywords: [
    "host stock market event",
    "college paper trading competition",
    "virtual trading contest platform",
    "organize stock market competition",
    "live trading leaderboard",
    "Arthhwise Campus",
  ],
  alternates: { canonical: "/host-event" },
  openGraph: {
    title: "Host Your Own Live Market | Arthhwise Campus",
    description:
      "Configure, register, run, and score a branded virtual stock market event with live leaderboards.",
    url: "https://arthhwise.com/host-event",
    siteName: "Arthhwise",
  },
};

export default function HostEventPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
        ]}
      />
      <CampusSoftwareSchema
        name="Arthhwise Campus — Live Stock Market Event Platform"
        description="Configure branded virtual stock market competitions, load participants, control live rounds, and publish leaderboard results."
        urlPath="/host-event"
        audienceType="College fest organizers, finance clubs, E-Cells, school programs, and corporate event teams"
      />
      <OrganizerExperience />
    </>
  );
}
