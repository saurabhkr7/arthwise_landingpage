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
import OrganizationSchema from "@/components/Schema/OrganizationSchema";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";
import FAQSchema from "@/components/Schema/FAQSchema";
import FAQSection from "@/components/Home/FAQ";

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
    title: "Arthhwise: India's Trading Game & Paper Trading App",
    description:
      "Start paper trading with ₹10,00,000 virtual capital and real NSE data. India's best trading simulator & stock market learning app.",
    images: ["/images/hero/hero-image.png"],
  },
};

const homepageFAQs = [
  {
    question: "What is paper trading?",
    answer:
      "Paper trading is simulated stock market trading using virtual money with real market data. On Arthhwise, you get ₹10,00,000 in virtual capital and access to live NSE and BSE prices. You can buy and sell stocks just like on a real trading platform, but without risking any actual money. It's the ideal way for beginners to learn how the stock market works.",
  },
  {
    question: "Is Arthhwise an Indian app? (Also searched as 'Arthwise')",
    answer:
      "Yes! Arthhwise (frequently searched as 'Arthwise' with a single 'h') is a proudly Indian-built stock market learning platform. It is custom-designed for Indian retail investors, featuring real-time NSE and BSE stock data, Indian market hours, and INR-denominated virtual portfolios.",
  },
  {
    question: "Is Arthhwise legit and safe?",
    answer:
      "Absolutely. Arthhwise is a legitimate paper trading simulator and educational platform. Since you trade using ₹10,00,000 in virtual capital, there is zero actual money involved, making it 100% safe and risk-free. Your personal profile details are protected and we never sell user data to third parties.",
  },
  {
    question: "Is Arthhwise free to use?",
    answer:
      "Yes, Arthhwise is completely free to download and use. There are no hidden charges. You can practice paper trading, join trading game contests, access learning courses, and participate in our trading community — all at no cost.",
  },
  {
    question: "Does Arthhwise use real market data?",
    answer:
      "Yes, Arthhwise uses real-time NSE (National Stock Exchange) and BSE (Bombay Stock Exchange) market data. Every stock price, index value, and market movement you see in the app reflects actual live market conditions in India.",
  },
  {
    question: "Can I learn stock trading on Arthhwise?",
    answer:
      "Absolutely. Arthhwise is designed as a stock market learning app with structured courses covering topics from candlestick patterns to risk management. Combined with hands-on paper trading practice and a supportive community, it's the most effective way to learn trading in India.",
  },
  {
    question: "What is the trading game on Arthhwise?",
    answer:
      "The trading game is a competitive feature where you enter daily or weekly contests, trade with virtual capital using real NSE stock prices, and compete against other traders on a leaderboard. It gamifies the learning process so you can improve your trading skills while having fun.",
  },
  {
    question: "Is Arthhwise available on iOS?",
    answer:
      "Arthhwise is currently available on Android via Google Play Store. iOS (iPhone/iPad) support is coming soon — you can join our waitlist at arthhwise.com/waiting-list to be notified when it launches.",
  },
];

export default function Home() {
  return (
    <main>
      <OrganizationSchema />
      <StructuredData />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }]} />
      <FAQSchema faqs={homepageFAQs} />
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
      <FAQSection faqs={homepageFAQs} />
    </main>
  );
}

