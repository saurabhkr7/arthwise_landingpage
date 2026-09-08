import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "National Stock Market Championship Platform India | Arthhwise",
  description:
    "Participate in or host India's largest National Stock Market Championship. Live NSE/BSE tick simulation, ₹10 Lakh virtual portfolio, options trading, and verifiable digital certificates.",
  keywords: [
    "national stock market championship",
    "all India trading competition",
    "national paper trading league",
    "inter-college stock market championship",
    "NSE trading championship",
    "options trading championship India",
    "virtual stock market championship",
    "Arthhwise national championship",
  ],
  alternates: {
    canonical: "/stock-market-championship",
  },
  openGraph: {
    title: "National Stock Market Championship Platform India | Arthhwise",
    description:
      "Compete with the sharpest minds across India. Real-time NSE feeds, options chains, and live leaderboards.",
    url: "https://arthhwise.com/stock-market-championship",
    siteName: "Arthhwise",
  },
};

const ChampionshipPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Championships", href: "/championships" },
          { name: "National Stock Market Championship", href: "/stock-market-championship" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      <section className="relative pt-8 pb-16 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
              <Icon icon="solar:cup-star-bold" width="16" height="16" />
              Pan-India Trading League
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              The National <span className="text-primary">Stock Market Championship</span>
            </h1>
            <p className="text-base md:text-xl text-muted dark:text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Where India&apos;s most skilled student traders and market enthusiasts go head-to-head. Practice equities, F&amp;O options scalping, and portfolio management with zero capital risk on institutional-grade simulation infrastructure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/championships"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>View Live Championship Lobbies</span>
                <Icon icon="solar:arrow-right-linear" width="18" height="18" />
              </Link>
              <Link
                href="/host-event"
                className="px-8 py-4 rounded-xl bg-white dark:bg-darkHeroBg hover:bg-gray-100 dark:hover:bg-white/10 border border-grey/20 dark:border-white/10 font-bold text-base transition-all text-midnight_text dark:text-white flex items-center gap-2"
              >
                <span>Host an Institutional Championship</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Web-First Banner */}
      <section className="py-6 bg-white dark:bg-darkHeroBg border-y border-grey/10 dark:border-white/10">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10">
            <div className="flex items-center gap-3">
              <Icon icon="solar:laptop-bold" width="24" height="24" className="text-primary shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-midnight_text dark:text-white">
                    Web-First Championship Execution
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[9px] font-extrabold uppercase">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-muted dark:text-white/60">
                  Instant browser trading terminal with multi-window charts. Native Android and iOS apps available on Google Play and Apple App Store.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="https://play.google.com/store/apps/details?id=com.arthwise"
                target="_blank"
                className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition"
              >
                Android App
              </Link>
              <Link
                href="https://apps.apple.com/in/app/arthhwise-paper-trading-f-o/id6803604616"
                target="_blank"
                className="px-4 py-2 rounded-lg bg-white dark:bg-darkHeroBg border border-grey/20 dark:border-white/10 text-xs font-bold hover:border-primary transition"
              >
                Apple App Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Icon icon="solar:bolt-bold" width="24" height="24" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Millisecond Ticks</h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Connects directly to live NSE and BSE market data. Practice scalping, breakout trades, and options Greeks with realistic execution slippage.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Icon icon="solar:medal-ribbon-bold" width="24" height="24" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verifiable Credentials</h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Winners receive tamper-proof cryptographic digital certificates with verifiable ranking hashes, ideal for LinkedIn profiles and finance resumes.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Icon icon="solar:shield-warning-bold" width="24" height="24" />
              </div>
              <h3 className="text-xl font-bold mb-3">Anti-Cheat Safeguards</h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Proprietary surveillance logs flag illiquid penny-stock spoofing or circular trades, ensuring fair play and authentic trading acumen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChampionshipPage;
