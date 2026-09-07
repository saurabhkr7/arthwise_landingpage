import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Corporate Stock Market Game | Employee Engagement & HR Team Building | Arthhwise",
  description:
    "Engage employees with a high-energy corporate stock market game. 1-to-2 hour fast news simulation mode, financial literacy workshops, and inter-department leagues with zero real money risk.",
  keywords: [
    "corporate stock market game",
    "employee engagement trading game",
    "corporate team building stock market",
    "HR financial wellness paper trading",
    "1 hour simulated trading event",
    "inter-department stock league",
    "corporate finance workshop simulator",
    "stock market game for company outing",
  ],
  alternates: {
    canonical: "/corporate-stock-market-game",
  },
  openGraph: {
    title: "Corporate Stock Market Game | Arthhwise",
    description:
      "Gamified financial literacy and employee engagement. Fast-paced 1-hour trading simulation with live market news flashes.",
    url: "https://arthhwise.com/corporate-stock-market-game",
    siteName: "Arthhwise",
  },
};

const CorporateStockMarketGamePage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
          { name: "Corporate Stock Market Game", href: "/corporate-stock-market-game" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      {/* Hero */}
      <section className="relative pt-8 pb-16 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
              <Icon icon="solar:buildings-3-bold" width="16" height="16" />
              Corporate HR &amp; Employee Engagement
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              The High-Energy <span className="text-primary">Corporate Stock Market Game</span>
            </h1>
            <p className="text-base md:text-xl text-muted dark:text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Transform your next company offsite, town hall, or HR financial wellness week. Employees trade in friendly department-vs-department leagues using simulated capital, learning market fundamentals with zero risk.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Plan Your Corporate Event</span>
                <Icon icon="solar:arrow-right-linear" width="18" height="18" />
              </Link>
              <Link
                href="/corporate-stock-leagues"
                className="px-8 py-4 rounded-xl bg-white dark:bg-darkHeroBg hover:bg-gray-100 dark:hover:bg-white/10 border border-grey/20 dark:border-white/10 font-bold text-base transition-all text-midnight_text dark:text-white flex items-center gap-2"
              >
                <span>Explore Enterprise Solutions</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Spotlight: 1-to-2 Hour Fast News Flash Simulation */}
      <section className="py-16 bg-white dark:bg-darkHeroBg border-y border-grey/10 dark:border-white/10 text-midnight_text dark:text-white">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-extrabold uppercase tracking-wider">
                <Icon icon="solar:bolt-bold" width="14" height="14" />
                Special Corporate Format
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                The 1–2 Hour <span className="text-primary">Fast News-Flash</span> Simulation Mode
              </h2>
              <p className="text-base text-muted dark:text-white/80 leading-relaxed">
                Short on time during an office outing or team-building session? Our accelerated simulation mode compresses a full trading cycle into a high-octane 60 to 120-minute challenge.
              </p>
              <ul className="space-y-3 text-sm text-muted dark:text-white/70">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-bold" width="14" height="14" />
                  </div>
                  <span><strong>Dynamic News Bulletins:</strong> Breaking market headlines are broadcast every 10–15 minutes (e.g. &quot;RBI Rate Cut Announced&quot; or &quot;Tech Giant Beats Earnings by 30%&quot;).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-bold" width="14" height="14" />
                  </div>
                  <span><strong>Rapid Price Volatility:</strong> Simulated stocks respond immediately to announcements, challenging employees to analyze data, buy breakouts, and cut losses under pressure.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-bold" width="14" height="14" />
                  </div>
                  <span><strong>Live Hall-of-Fame Projector View:</strong> Display real-time leaderboard shifts on your office presentation screens for maximum room excitement.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 p-8 rounded-3xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Icon icon="solar:cup-star-bold" width="28" height="28" className="text-primary" />
                <div>
                  <h3 className="font-bold text-base">Office Clash Formats</h3>
                  <p className="text-xs text-muted dark:text-white/60">Built for all organizational tiers</p>
                </div>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 flex justify-between items-center">
                  <span className="font-bold">Engineering vs Sales vs Marketing</span>
                  <span className="text-primary font-extrabold">Department Clash</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 flex justify-between items-center">
                  <span className="font-bold">Finance &amp; Treasury Skills League</span>
                  <span className="text-primary font-extrabold">Sharpe Ratio Mode</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 flex justify-between items-center">
                  <span className="font-bold">Senior Leadership vs Fresh Trainees</span>
                  <span className="text-primary font-extrabold">Handicap Match</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-grey/10 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-muted dark:text-white/60">Web Terminal:</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 font-extrabold text-[9px] uppercase">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Benefits */}
      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold mb-4">Why Top Companies Choose Arthhwise</h2>
            <p className="text-sm text-muted dark:text-white/70">
              Deliver high-impact financial wellness education while boosting inter-team camaraderie.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:shield-check-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">100% SEBI-Compliant</h3>
              <p className="text-xs text-muted dark:text-white/70">
                Operates exclusively in virtual paper mode with no real money, ensuring full HR compliance and zero personal financial liability for your workforce.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:diploma-verified-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Custom Co-Branded Certificates</h3>
              <p className="text-xs text-muted dark:text-white/70">
                Award department winners and participants professional certificates featuring your corporate logo and executive signatures.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:chart-2-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Turnkey Setup in 24 Hours</h3>
              <p className="text-xs text-muted dark:text-white/70">
                Our dedicated event managers configure your company portal, custom join codes, and branding assets with zero technical workload on your IT department.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CorporateStockMarketGamePage;
