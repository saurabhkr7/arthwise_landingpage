import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";
import { glossaryTerms } from "@/lib/glossaryData";

export const metadata: Metadata = {
  title: "Arthhwise Learning Academy | Master Stock Market Trading",
  description:
    "Learn stock trading and investing from scratch. Explore our free courses, comprehensive trading articles, daily market quizzes, and financial dictionary.",
  alternates: {
    canonical: "/learn",
  },
};

export default function LearnHubPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Learn", href: "/learn" },
  ];

  const learningCategories = [
    {
      title: "Stock Market Basics",
      description: "For absolute beginners. Understand what shares are, how exchanges work, and how to read stock tickers.",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      icon: "solar:course-up-bold",
      links: [
        { name: "National Stock Exchange (NSE)", href: "/glossary/nse" },
        { name: "Bombay Stock Exchange (BSE)", href: "/glossary/bse" },
        { name: "Nifty 50 Index", href: "/glossary/nifty-50" },
        { name: "Sensex Index", href: "/glossary/sensex" },
      ],
    },
    {
      title: "Trading Styles",
      description: "Learn about the different ways to participate in the markets based on timeframe and strategy.",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      icon: "solar:graph-bold",
      links: [
        { name: "Intraday (Day) Trading", href: "/glossary/intraday-trading" },
        { name: "Delivery (Long-Term) Trading", href: "/glossary/delivery-trading" },
        { name: "Futures and Options (F&O)", href: "/glossary/futures-and-options" },
      ],
    },
    {
      title: "Chart & Technical Analysis",
      description: "How to read historical price charts, draw trend lines, and study technical chart indicators.",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      icon: "solar:chart-square-bold",
      links: [
        { name: "Candlestick Charts", href: "/glossary/candlestick-chart" },
        { name: "Support and Resistance", href: "/glossary/support-and-resistance" },
        { name: "Technical Analysis Overview", href: "/glossary/technical-analysis" },
      ],
    },
    {
      title: "Risk Control & Management",
      description: "The most important phase of trading. Learn how to protect your capital and cut losses early.",
      color: "bg-red-500/10 text-red-600 dark:text-red-400",
      icon: "solar:shield-check-bold",
      links: [
        { name: "Stop Loss Orders", href: "/glossary/stop-loss" },
        { name: "Target Price & Exits", href: "/glossary/target-price" },
        { name: "Risk Management Strategies", href: "/glossary/risk-management" },
      ],
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <section className="relative pt-44 z-1 pb-16 dark:bg-dark dark:bg-darkmode">
        <div className="w-full h-full absolute -z-1 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-search"></div>
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Arthhwise Academy
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-midnight_text dark:text-white mb-6">
            Learn Trading Without Risk
          </h1>
          <p className="text-lg text-muted dark:text-white/70 max-w-2xl mx-auto mb-8">
            Whether you want to learn the basics of Indian stocks or practice advanced chart analysis, our structured learning categories are here to guide you.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="https://play.google.com/store/apps/details?id=com.arthwise"
              target="_blank"
              className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Start Free Paper Trading
            </Link>
            <Link
              href="/glossary"
              className="bg-white dark:bg-search border border-grey/10 text-midnight_text dark:text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition"
            >
              Browse Dictionary
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 dark:bg-darkmode">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white">
              Explore Trading Concepts
            </h2>
            <p className="text-muted dark:text-white/60 mt-2">
              Select a category to begin mastering stock market terminology and trading rules.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {learningCategories.map((category) => (
              <div
                key={category.title}
                className="bg-white dark:bg-midnight_text rounded-3xl p-8 border border-grey/10 dark:border-white/5 shadow-sm space-y-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-4 py-2 rounded-2xl font-bold text-sm ${category.color}`}>
                      {category.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted dark:text-white/60 leading-relaxed mb-6">
                    {category.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {category.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="p-3.5 rounded-xl bg-heroBg/30 dark:bg-search text-xs text-midnight_text dark:text-white font-semibold hover:text-primary dark:hover:text-primary transition border border-grey/5"
                      >
                        {link.name} &rarr;
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamified Learning Promo */}
      <section className="py-16 bg-heroBg/20 dark:bg-midnight_text/10 border-t border-b border-grey/10 dark:border-white/5">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <div>
              <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-4">
                Interactive stock learning in the palm of your hand
              </h2>
              <p className="text-muted dark:text-white/70 leading-relaxed mb-6">
                Reading articles is only half the battle. To build real investing confidence, you need hands-on practice. The Arthhwise Android app combines structured interactive courses, daily market quizzes, trading game contests, and virtual stock trading in one unified learning experience.
              </p>
              <ul className="space-y-3 mb-8">
                {["100% Free interactive courses", "Daily Quiz challenges with rank leaderboards", "Weekly paper trading contests with virtual rewards"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-midnight_text dark:text-white font-medium">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="https://play.google.com/store/apps/details?id=com.arthwise"
                target="_blank"
                className="inline-flex bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Download on Google Play
              </Link>
            </div>
            <div className="relative h-96 w-full lg:block hidden rounded-3xl overflow-hidden shadow-lg border border-grey/10">
              <img
                src="/images/spend/spend.png"
                alt="Interactive stock learning simulator mockup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
