import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Virtual Stock Market Competition Platform | Paper Trading Software | Arthhwise",
  description:
    "Launch custom virtual stock market competitions for your college, community, or company. Isolated contest wallets, real NSE options & equities, automated rankings, and verifiable certificates.",
  keywords: [
    "virtual stock market competition",
    "online paper trading contest platform",
    "virtual trading app India",
    "stock market simulation software for events",
    "paper trading competition organizer",
    "run stock market league",
    "virtual equity and F&O contest",
  ],
  alternates: {
    canonical: "/virtual-stock-market-competition",
  },
  openGraph: {
    title: "Virtual Stock Market Competition Platform | Arthhwise",
    description:
      "Run your own branded virtual trading competition. Real NSE feeds, 7 scoring formats, and instant leaderboard rankings.",
    url: "https://arthhwise.com/virtual-stock-market-competition",
    siteName: "Arthhwise",
  },
};

const VirtualCompetitionPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
          { name: "Virtual Stock Market Competition", href: "/virtual-stock-market-competition" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      <section className="relative pt-8 pb-16 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
              <Icon icon="solar:global-bold" width="16" height="16" />
              Turnkey Virtual Trading Infrastructure
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              Launch a Branded <span className="text-primary">Virtual Stock Market Competition</span>
            </h1>
            <p className="text-base md:text-xl text-muted dark:text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Everything you need to run an authentic, risk-free stock market tournament. Zero infrastructure hassle: we provide private entry codes, live NSE order simulation, Sharpe ratio rankings, and branded achievement certificates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Create Your Competition</span>
                <Icon icon="solar:arrow-right-linear" width="18" height="18" />
              </Link>
              <Link
                href="/organizer-toolkit"
                className="px-8 py-4 rounded-xl bg-white dark:bg-darkHeroBg hover:bg-gray-100 dark:hover:bg-white/10 border border-grey/20 dark:border-white/10 font-bold text-base transition-all text-midnight_text dark:text-white flex items-center gap-2"
              >
                <span>Download Rulebook Templates</span>
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
                Web-First Simulator: Instant participant onboarding via QR code with zero app installation required.
              </span>
            </div>
            <Link href="/host-event" className="text-primary font-bold text-xs hover:underline shrink-0">
              Inquire for Early Access →
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:lock-keyhole-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Isolated Event Wallets</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Every participant gets an isolated ₹10 Lakh competition wallet. Their personal paper portfolios are protected, backed up, and restored when the event ends.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:chart-square-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Full Option Chain &amp; Equity</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Support for intraday equities, delivery holdings, and full live NSE option chain with strike Greeks and realistic limit order fills.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:document-medicine-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Full Trade Audit Logs</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Organizers can download complete trade logs in 1-click Excel format, complete with entry/exit timestamps, quantity, trade prices, and slippage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VirtualCompetitionPage;
