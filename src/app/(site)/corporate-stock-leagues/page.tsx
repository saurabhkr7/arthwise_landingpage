import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Corporate Stock Market League & Paper Trading Software India | Arthhwise",
  description:
    "Run employee engagement stock market leagues, corporate paper trading competitions, and finance training simulations for your team using Arthhwise. Fully virtual, SEBI-safe, real NSE/BSE data.",
  keywords: [
    "corporate paper trading league India",
    "employee engagement stock market simulation",
    "virtual trading competition HR teams India",
    "corporate finance training simulation platform",
    "paper trading software for companies India",
    "stock market league enterprise",
    "team building stock market game India",
    "financial literacy training platform corporate",
  ],
  alternates: {
    canonical: "/corporate-stock-leagues",
  },
  openGraph: {
    title: "Corporate Stock Market League & Paper Trading Software India | Arthhwise",
    description:
      "Gamify financial literacy for your team. Run corporate paper trading leagues with real NSE/BSE data, live leaderboards, and zero real money risk.",
    url: "https://arthhwise.com/corporate-stock-leagues",
    siteName: "Arthhwise",
  },
};

const useCases = [
  {
    icon: "solar:buildings-bold",
    title: "HR Financial Literacy Programs",
    desc: "Upskill employees in equity and F&O markets through engaging live simulations. Track engagement and quiz performance across departments.",
    audience: "HR & L&D Teams",
  },
  {
    icon: "solar:chart-square-bold",
    title: "Finance Team Trading Simulations",
    desc: "Run internal workshops where analysts and associates practice portfolio construction under real market conditions — with zero capital at risk.",
    audience: "Finance & Treasury Teams",
  },
  {
    icon: "solar:cup-star-bold",
    title: "Office Trading Leagues",
    desc: "Create recurring quarterly or annual intra-office leagues. Employees compete by department or branch, building lasting engagement and healthy competition.",
    audience: "Office Management / CXOs",
  },
  {
    icon: "solar:users-group-rounded-bold",
    title: "Client Engagement Events",
    desc: "Host branded virtual trading competitions for your clients, prospects, or alumni to demonstrate your firm's market expertise and drive conversation.",
    audience: "Financial Services / Wealth Managers",
  },
];

const comparisonRows = [
  {
    feature: "Real live NSE/BSE market data",
    arthhwise: true,
    spreadsheet: false,
  },
  { feature: "Auto-updated live leaderboard", arthhwise: true, spreadsheet: false },
  { feature: "Isolated virtual wallets per participant", arthhwise: true, spreadsheet: false },
  { feature: "F&O (Options & Futures) simulation", arthhwise: true, spreadsheet: false },
  { feature: "PDF certificates for winners", arthhwise: true, spreadsheet: false },
  { feature: "Excel export with full trade audit", arthhwise: true, spreadsheet: true },
  { feature: "Zero setup time — ready in 24 hours", arthhwise: true, spreadsheet: false },
  { feature: "Accessible on Android & iOS", arthhwise: true, spreadsheet: false },
];

const CorporateStockLeaguesPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
          { name: "Corporate Stock Leagues", href: "/corporate-stock-leagues" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      <section className="relative pt-8 pb-20 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">

          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-4">
              <Icon icon="solar:buildings-bold" width="16" height="16" />
              Corporate &amp; Enterprise Platform
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              Gamify{" "}
              <span className="text-primary">Financial Literacy</span>{" "}
              for Your Corporate Team
            </h1>
            <p className="text-base md:text-lg text-muted dark:text-white/80 leading-relaxed mb-8">
              Run a live corporate paper trading league with real NSE &amp; BSE market data. Your employees
              compete on a real-time leaderboard — learning equity, F&amp;O, and portfolio management the
              most engaging way possible. Zero real money. Zero risk. Maximum learning.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event#inquiry-form"
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Request Corporate Event Setup</span>
                <Icon icon="solar:alt-arrow-right-linear" width="18" height="18" />
              </Link>
              <a
                href="https://wa.me/918770117256?text=Hi%20Saurabh%2C%20I%20want%20to%20set%20up%20a%20corporate%20trading%20league%20for%20my%20company%20using%20Arthhwise!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-green-600/20"
              >
                <Icon icon="logos:whatsapp-icon" width="18" height="18" />
                <span>Chat with Us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Compliance Callout */}
          <div className="max-w-3xl mx-auto mb-20 p-6 rounded-3xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-green-100 dark:bg-green-800/40 text-green-600 dark:text-green-400 shrink-0">
              <Icon icon="solar:shield-check-bold" width="24" height="24" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-green-800 dark:text-green-300 mb-1 uppercase tracking-wide">
                100% Compliant — No SEBI Regulations Triggered
              </h3>
              <p className="text-sm text-green-700 dark:text-green-400/80 leading-relaxed">
                Arthhwise uses entirely virtual paper money. No real capital is involved at any point.
                Participants trade with a simulated ₹10 Lakh wallet on real market prices.
                Running a corporate paper trading league does not require any SEBI registration, broker
                license, or financial product approval.
              </p>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-midnight_text dark:text-white text-center mb-12">
              Built for Every Type of{" "}
              <span className="text-primary">Corporate Use Case</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((uc) => (
                <div
                  key={uc.title}
                  className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon icon={uc.icon} width="24" height="24" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md">
                        {uc.audience}
                      </span>
                      <h3 className="text-base font-bold text-midnight_text dark:text-white mt-1">
                        {uc.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted dark:text-white/70 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-midnight_text dark:text-white text-center mb-12">
              Arthhwise vs. Running It on a{" "}
              <span className="text-primary">Spreadsheet</span>
            </h2>
            <div className="overflow-x-auto rounded-3xl border border-grey/10 dark:border-white/10 shadow-xl">
              <table className="w-full text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left px-6 py-4 font-bold rounded-tl-3xl">Feature</th>
                    <th className="px-6 py-4 font-bold text-center">Arthhwise</th>
                    <th className="px-6 py-4 font-bold text-center rounded-tr-3xl">DIY Spreadsheet</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`${
                        i % 2 === 0
                          ? "bg-white dark:bg-darkHeroBg"
                          : "bg-heroBg dark:bg-darkmode"
                      } border-t border-grey/10 dark:border-white/5`}
                    >
                      <td className="px-6 py-4 text-midnight_text dark:text-white font-medium">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.arthhwise ? (
                          <Icon icon="solar:check-circle-bold" className="text-green-500 mx-auto" width="20" height="20" />
                        ) : (
                          <Icon icon="solar:close-circle-bold" className="text-red-400 mx-auto" width="20" height="20" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.spreadsheet ? (
                          <Icon icon="solar:check-circle-bold" className="text-green-500 mx-auto" width="20" height="20" />
                        ) : (
                          <Icon icon="solar:close-circle-bold" className="text-red-400 mx-auto" width="20" height="20" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Final CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-primary/30 to-slate-900 p-10 border border-primary/20 text-white text-center shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Ready to Launch Your Corporate Trading League?
            </h2>
            <p className="text-white/80 text-sm mb-8 max-w-xl mx-auto">
              Event setup is handled by our team in under 24 hours. Share the details and we take care of the rest.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event#inquiry-form"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <Icon icon="solar:buildings-bold" width="18" height="18" />
                <span>Submit Corporate Event Request</span>
              </Link>
              <Link
                href="/organizer-toolkit"
                className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-sm transition-all flex items-center gap-2"
              >
                <Icon icon="solar:folder-with-files-bold" width="18" height="18" />
                <span>View Free Organizer Toolkit</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default CorporateStockLeaguesPage;
