import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Finance Fest Stock Market Game & Mock Stock Software | Arthhwise",
  description:
    "The ultimate Mock Stock competition software for college finance fests and E-Summits. Live NSE prices, live leaderboard projection screen, instant team join codes, and free certificates.",
  keywords: [
    "finance fest stock market game",
    "mock stock competition software",
    "college fest trading game",
    "E-Summit mock stock software India",
    "finance festival paper trading",
    "college mock stock rules template",
    "mock stock live leaderboard projector",
  ],
  alternates: {
    canonical: "/finance-fest-stock-market-game",
  },
  openGraph: {
    title: "Finance Fest Stock Market Game & Mock Stock Software | Arthhwise",
    description:
      "Run your college Mock Stock competition without manual spreadsheets. Real-time NSE data, auto-rankings, and zero budget cost.",
    url: "https://arthhwise.com/finance-fest-stock-market-game",
    siteName: "Arthhwise",
  },
};

const FinanceFestGamePage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
          { name: "Finance Fest Stock Market Game", href: "/finance-fest-stock-market-game" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      <section className="relative pt-8 pb-16 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
              <Icon icon="solar:fire-bold" width="16" height="16" />
              Mock Stock &amp; E-Summit Platform
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              The #1 Software for <span className="text-primary">Finance Fest Mock Stock</span> Games
            </h1>
            <p className="text-base md:text-xl text-muted dark:text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Ditch fragile Excel spreadsheets and delayed manual calculations. Power your college fest&apos;s Mock Stock with live NSE tick feeds, dynamic trading leaderboards for auditorium projectors, and automated certificates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Host Fest Mock Stock (Free)</span>
                <Icon icon="solar:arrow-right-linear" width="18" height="18" />
              </Link>
              <Link
                href="/organizer-toolkit"
                className="px-8 py-4 rounded-xl bg-white dark:bg-darkHeroBg hover:bg-gray-100 dark:hover:bg-white/10 border border-grey/20 dark:border-white/10 font-bold text-base transition-all text-midnight_text dark:text-white flex items-center gap-2"
              >
                <span>Download Fest Rulebook PDF</span>
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
                Web-First Fest Entry: Attendees scan a QR code at your registration desk and trade directly inside mobile browsers.
              </span>
            </div>
            <Link href="/host-event" className="text-primary font-bold text-xs hover:underline shrink-0">
              Reserve Fest Lobby →
            </Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:tv-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Auditorium Projector View</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Display our high-definition live leaderboard on your fest auditorium screen. Watch participant ranks jump and fall in real-time as market volatility spikes.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:users-group-two-rounded-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Squad &amp; Team Formats</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Allow participants to compete as teams of 2 to 4 members. Calculate aggregate team returns and promote collaborative trading strategy discussions.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:diploma-verified-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Co-Branded Fest Certificates</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Auto-generate professional PDF certificates bearing your college fest emblem and sponsor branding within 5 minutes of event completion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinanceFestGamePage;
