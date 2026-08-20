import React from "react";
import { Metadata } from "next";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arthhwise vs StockGro: Best Simulated Trading App in India | Arthhwise",
  description:
    "A side-by-side comparison between Arthhwise and StockGro. Discover why active traders choose Arthhwise for clean, ad-free, and cost-free paper trading.",
  alternates: {
    canonical: "/vs/stockgro",
  },
};

const StockgroComparisonPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
    { href: "/vs/stockgro", text: "Arthhwise vs StockGro" },
  ];

  return (
    <>
      <HeroSub
        title="Arthhwise vs StockGro"
        description="Comparing India's top gamified paper trading platforms. See how they stack up in features, costs, and university integrations."
        breadcrumbLinks={breadcrumbLinks}
      />

      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          
          {/* Comparison Overview */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Comparison Guide
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                Searching for a Clean <span className="text-primary">StockGro Alternative</span>?
              </h2>
              <p className="text-muted dark:text-white/80 mb-6 leading-relaxed">
                StockGro introduced a gamified approach to paper trading leagues in India. However, many users find the app overcrowded with paid gatekeeping, league join fees, and complex reward coins.
              </p>
              <p className="text-muted dark:text-white/80 mb-6 leading-relaxed">
                Arthhwise offers a clean, **100% free**, professional simulated trading environment. No entry fees, no ads, and no artificial gamification tokens—just institutional-grade tools to practice equity, F&O options, and crypto trading.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.arthwise"
                  target="_blank"
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <Icon icon="logos:google-play-icon" width="18" height="18" />
                  <span>Download Arthhwise</span>
                </Link>
                <Link
                  href="/host-event"
                  className="px-6 py-3 rounded-xl bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 border border-grey/20 dark:border-white/10 font-bold text-sm transition-all text-midnight_text dark:text-white flex items-center gap-1"
                >
                  <span>Host a College Event</span>
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-6 text-center">Quick Verdict</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-bold" width="16" height="16" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Choose Arthhwise if:</h4>
                    <p className="text-xs text-muted dark:text-white/70 mt-1">
                      You want a distraction-free environment to test live derivatives (F&O) option strategies, or want to host a private inter-college tournament 100% free of cost.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-grey/10 dark:border-white/10 pt-4">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-bold" width="16" height="16" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Choose StockGro if:</h4>
                    <p className="text-xs text-muted dark:text-white/70 mt-1">
                      You prefer playing paid prize-pool leagues, accumulating game coins, or social chat lobbies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side Table */}
          <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-16">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-900/80 border-b border-grey/10 dark:border-white/10 text-xs font-bold uppercase text-muted dark:text-white/70">
                    <th className="py-5 px-6">Feature</th>
                    <th className="py-5 px-6 text-primary">Arthhwise App</th>
                    <th className="py-5 px-6">StockGro App</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey/10 dark:divide-white/10 text-sm">
                  <tr>
                    <td className="py-4 px-6 font-bold">Cost Structure</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>100% Free (All Features Unlocked)</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Freemium (Paid leagues & coin gates)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">F&O Options Chain</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Supported (Live IV, Delta, OI data)</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Limited options simulation</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">College Tournaments cost</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>₹0 (Complimentary for Clubs)</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Paid sponsorship partnerships required</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Ad-Free Experience</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Yes (Clean Dashboard UI)</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">No (Heavy ads and banner placement)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Demat Account Linking prompts</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>None (Strictly Practice Focused)</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Frequent redirects to link active demat accounts</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Crypto Practice</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Yes (24/7 Live feeds)</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">No support</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Deep Feature Highlights */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Why Serious Learners Prefer Arthhwise</h3>
              <ul className="space-y-3 text-sm text-muted dark:text-white/70">
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>Interactive options chain analysis tools built for retail option buyers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>Real market order types including Stop-Loss Market (SL-M) and Limit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>No distracting games or coins; focuses purely on actual market metrics.</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Why Finance Clubs Run Lobbies on Arthhwise</h3>
              <ul className="space-y-3 text-sm text-muted dark:text-white/70">
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>Create private contest codes in less than 2 minutes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>Instant, automated generation of co-branded achievement certificates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>Zero-cost access for unlimited students, perfect for budget-constrained student societies.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default StockgroComparisonPage;
