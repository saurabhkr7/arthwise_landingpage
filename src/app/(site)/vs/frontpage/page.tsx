import React from "react";
import { Metadata } from "next";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arthhwise vs Frontpage: Best Paper Trading App in India | Arthhwise",
  description:
    "A fair comparison between Arthhwise and Frontpage. Discover why Arthhwise is the preferred platform for live F&O options paper trading and college championships.",
  alternates: {
    canonical: "/vs/frontpage",
  },
};

const FrontpageComparisonPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
    { href: "/vs/frontpage", text: "Arthhwise vs Frontpage" },
  ];

  return (
    <>
      <HeroSub
        title="Arthhwise vs Frontpage"
        description="A side-by-side comparison of India's top paper trading apps. See why retail investors and universities are switching to Arthhwise."
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
                Looking for a Modern <span className="text-primary">Frontpage Alternative</span>?
              </h2>
              <p className="text-muted dark:text-white/80 mb-6 leading-relaxed">
                While Frontpage has popularized community-based stock discussions and equity paper trading, active traders and students require more robust tools. 
              </p>
              <p className="text-muted dark:text-white/80 mb-6 leading-relaxed">
                Arthhwise was built from the ground up to support **live derivatives (F&O) option chains**, instant private lobbies for university fests, and structured learning modules—all packaged in a sleek, modern UI.
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
                      You want to practice active options chain scalping, host custom trading leagues for your college, or get certified automatically.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-grey/10 dark:border-white/10 pt-4">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-bold" width="16" height="16" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Choose Frontpage if:</h4>
                    <p className="text-xs text-muted dark:text-white/70 mt-1">
                      Your primary goal is browsing social feeds or subscribing to paid advisory user groups.
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
                    <th className="py-5 px-6">Frontpage App</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey/10 dark:divide-white/10 text-sm">
                  <tr>
                    <td className="py-4 px-6 font-bold">F&O Options Chain</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Live NSE Chain with IV, Delta, OI</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Basic Call/Put search entries only</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Lobbies & Championships</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Private Join Lobbies & LFT Leaderboards</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Not supported for external fests</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Co-branded Laptops/PDF Certificates</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Automated verification PDF engine</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">No certificates generated</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Learning Path</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Structured stock market courses</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Ad-hoc posts & blogs only</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">User Interface (UI)</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Modern, sleek UI with Dark Theme</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Legacy layout, forum-centric</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Crypto & Globals</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Supported (BTC, ETH, Solana)</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Indian equities only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Deep Feature Highlights */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Why Active Traders Prefer Arthhwise</h3>
              <ul className="space-y-3 text-sm text-muted dark:text-white/70">
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>Real-time Depth of Market (DOM) price ladder for options scalpers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>No delay in order executions matching NSE close prints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>Integrated risk-management parameters (Stop Loss, Trailing Target).</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Why University Organizers Switch to Arthhwise</h3>
              <ul className="space-y-3 text-sm text-muted dark:text-white/70">
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>Clean organizer controls allowing customized verification fields.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>Anti-cheat logging monitors and filters unrealistic print matching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span>Instantly downloads finalized spreadsheets and participant statistics in one click.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default FrontpageComparisonPage;
