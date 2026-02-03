import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Payment from "@/components/Home/Payment";
import Benefit  from "@/components/Home/Benefit";
import Spend from "@/components/Home/Spend";
import Method from "@/components/Home/Method";
import Mobile from "@/components/Home/Mobile";
import Search from "@/components/Home/Search";
import Pricing from "@/components/Home/Pricing";
import Solution from "@/components/Home/Solution";

export const metadata: Metadata = {
  metadataBase: new URL("https://arthhwise.com"),
  title: "Arthhwise | Smart Paper Trading & NSE Real-time Market Simulation",
  description: "Master the Indian stock market with Arthhwise. Practice trading with ₹10,00,000 virtual capital, real-time NSE data, and advanced charting tools. Risk-free learning for beginners and experts.",
  keywords: ["paper trading", "NSE", "stock market simulation", "Indian stocks", "learn trading", "virtual trading", "Arthhwise", "fintech India"],
  authors: [{ name: "Arthhwise Team" }],
  openGraph: {
    title: "Arthhwise | Advanced Paper Trading Platform",
    description: "Practice trading with real-time NSE market data and premium tools without risking real money.",
    url: "https://arthhwise.com",
    siteName: "Arthhwise",
    images: [
      {
        url: "/images/hero/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Arthhwise Trading Interface",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arthhwise | Master the Stock Market Risk-Free",
    description: "Start paper trading with ₹10,00,000 virtual capital and real NSE data today.",
    images: ["/images/hero/hero-image.png"],
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Payment />
      <Benefit />
      <Spend />
      <Method />
      <Mobile />
      <Search />
      {/* <Pricing /> */}
      <Solution />
      
    </main>
  );
}
