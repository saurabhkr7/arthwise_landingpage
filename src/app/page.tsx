import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Payment from "@/components/Home/Payment";
import Benefit from "@/components/Home/Benefit";
import Spend from "@/components/Home/Spend";
import Method from "@/components/Home/Method";
import Mobile from "@/components/Home/Mobile";
import Search from "@/components/Home/Search";
import Transparency from "@/components/Home/Transparency";
import Solution from "@/components/Home/Solution";
import StructuredData from "@/components/Home/StructuredData";
import Features from "@/components/Home/Features";
import SeoContent from "@/components/Home/SeoContent";

export const metadata: Metadata = {
  metadataBase: new URL("https://arthhwise.com"),
  alternates: {
    canonical: "/",
  },
  title: "Arthhwise: Trading Game & Paper Trading App India",
  description:
    "Practice paper trading with real NSE data on Arthhwise — India's leading virtual trading app & trading simulator. Join our trading community and learn stocks. Free on Android.",
  keywords: [
    "trading game",
    "paper trading",
    "trading community",
    "stock market learning app",
    "virtual trading app",
    "trading simulator India",
    "social trading platform",
    "NSE virtual trading",
    "learn stock market",
    "trading game India",
    "paper trading app",
    "Indian stocks",
    "Arthhwise",
    "fintech India",
    "stock market simulation",
  ],
  authors: [{ name: "Arthhwise Team" }],
  openGraph: {
    title: "Arthhwise: Trading Game & Paper Trading App India",
    description:
      "Practice paper trading with real NSE data — India's best virtual trading app & trading simulator. Join the trading community. Free on Android.",
    url: "https://arthhwise.com",
    siteName: "Arthhwise",
    images: [
      {
        url: "/images/hero/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Arthhwise Paper Trading App — Stock Market Simulator for India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arthhwise: India's #1 Trading Game & Paper Trading App",
    description:
      "Start paper trading with ₹10,00,000 virtual capital and real NSE data. India's best trading simulator & stock market learning app.",
    images: ["/images/hero/hero-image.png"],
  },
};

export default function Home() {
  return (
    <main>
      <StructuredData />
      <Hero />
      <Payment />
      <Benefit />
      <Spend />
      <Method />
      <Features />
      <Mobile />
      <Search />
      <Transparency />
      <Solution />
      <SeoContent />
    </main>
  );
}
