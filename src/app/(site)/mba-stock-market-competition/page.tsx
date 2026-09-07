import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "MBA Stock Market Competition & B-School Trading Challenge | Arthhwise",
  description:
    "Institutional trading simulation for MBA finance fests and premier B-Schools (IIM, XLRI, NMIMS, SIBM). Multi-asset simulation: Indian equities, F&O derivatives, Sharpe ratio analytics.",
  keywords: [
    "MBA stock market competition",
    "B-School trading challenge India",
    "IIM finance fest trading event",
    "MBA portfolio management simulation",
    "inter B-school paper trading",
    "risk adjusted stock market competition MBA",
    "MBA finance club paper trading platform",
  ],
  alternates: {
    canonical: "/mba-stock-market-competition",
  },
  openGraph: {
    title: "MBA Stock Market Competition & B-School Trading Challenge | Arthhwise",
    description:
      "High-caliber trading challenge infrastructure for MBA finance fests. Real F&O option chains, portfolio risk modeling, and instant certification.",
    url: "https://arthhwise.com/mba-stock-market-competition",
    siteName: "Arthhwise",
  },
};

const MbaCompetitionPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
          { name: "MBA Stock Market Competition", href: "/mba-stock-market-competition" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      <section className="relative pt-8 pb-16 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
              <Icon icon="solar:diploma-bold" width="16" height="16" />
              Premier B-School Trading Infrastructure
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              The Premier <span className="text-primary">MBA Stock Market Competition</span> Platform
            </h1>
            <p className="text-base md:text-xl text-muted dark:text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Designed for top business schools, MBA finance fests, and investment societies. Challenge future portfolio managers and investment bankers with live F&amp;O option chains, risk-adjusted Sharpe scoring, and team-based fund management.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Host B-School Challenge</span>
                <Icon icon="solar:arrow-right-linear" width="18" height="18" />
              </Link>
              <Link
                href="/organizer-toolkit"
                className="px-8 py-4 rounded-xl bg-white dark:bg-darkHeroBg hover:bg-gray-100 dark:hover:bg-white/10 border border-grey/20 dark:border-white/10 font-bold text-base transition-all text-midnight_text dark:text-white flex items-center gap-2"
              >
                <span>Download Scoring Calculator</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Web-First Banner */}
      <section className="py-6 bg-white dark:bg-darkHeroBg border-y border-grey/10 dark:border-white/10">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="p-4 rounded-2xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[10px] font-extrabold uppercase">
                Coming Soon
              </span>
              <span className="text-sm font-bold text-midnight_text dark:text-white">
                Zero-Install Web Terminal: MBA candidates trade on laptops and Bloomberg/financial lab terminals via browser.
              </span>
            </div>
            <Link href="/host-event" className="text-primary font-bold text-xs hover:underline shrink-0">
              Host Your B-School Fest →
            </Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:chart-square-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Live F&amp;O Options Chains</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Give MBA candidates hands-on exposure to live options pricing, Delta hedging, straddles, strangles, and Open Interest build-up on Nifty and Bank Nifty.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:scale-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Sharpe &amp; Sortino Metrics</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Move past raw returns. Evaluate participants on risk-adjusted alpha, maximum downside volatility, and win consistency — exactly how institutional hedge funds evaluate talent.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:users-group-rounded-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Inter-Campus Rivalries</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Host national B-School clashes: IIM A vs IIM B vs XLRI. Aggregate team performances create thrilling social dynamics and showcase your institution&apos;s finance caliber.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MbaCompetitionPage;
