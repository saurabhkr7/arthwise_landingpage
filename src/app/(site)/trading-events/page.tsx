import React from "react";
import { Metadata } from "next";
import TradingEventsClient from "./TradingEventsClient";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Live Paper Trading Events & Championships | Arthhwise",
  description:
    "Explore live and upcoming virtual stock market trading competitions on Arthhwise. Join an event with ₹10 Lakh virtual cash on real NSE/BSE data. Free for students and professionals.",
  keywords: [
    "paper trading events India",
    "virtual stock market competition",
    "live trading championship NSE BSE",
    "stock market contest join",
    "college trading competition 2026",
    "Arthhwise trading event",
  ],
  alternates: { canonical: "/trading-events" },
  openGraph: {
    title: "Live Paper Trading Events & Championships | Arthhwise",
    description:
      "Browse live, upcoming and past virtual trading competitions. Join with ₹10L virtual cash — zero real money risk.",
    url: "https://arthhwise.com/trading-events",
    siteName: "Arthhwise",
  },
};

export default function TradingEventsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Trading Events", href: "/trading-events" },
        ]}
      />
      <TradingEventsClient />
    </>
  );
}
