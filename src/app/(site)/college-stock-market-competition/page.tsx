import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "College Stock Market Competition Platform India | Host Paper Trading Fest | Arthhwise",
  description:
    "Organize a professional college stock market competition in minutes. Support for 7 scoring modes (Sharpe ratio, F&O options, team clashes), live NSE feeds, zero-install web access, and automated certificates.",
  keywords: [
    "how to organize stock market competition in college",
    "college stock market competition India",
    "paper trading fest software",
    "virtual trading competition for university fest",
    "college finance club stock market game",
    "inter-college paper trading championship",
    "mock stock competition platform India",
    "stock market competition rules for college",
  ],
  alternates: {
    canonical: "/college-stock-market-competition",
  },
  openGraph: {
    title: "College Stock Market Competition Platform India | Arthhwise",
    description:
      "Run an unforgettable stock market competition for your college fest or finance society. Live NSE feeds, private lobbies, and co-branded certificates.",
    url: "https://arthhwise.com/college-stock-market-competition",
    siteName: "Arthhwise",
  },
};

const competitionModes = [
  {
    mode: "Mode 1",
    title: "Maximum Return (Classic)",
    desc: "Highest net portfolio return % at closing bell wins. Perfect for high-energy 1–3 day fests.",
    icon: "solar:graph-up-bold",
    badge: "Popular for Fests",
  },
  {
    mode: "Mode 2",
    title: "Risk-Adjusted (Sharpe Ratio)",
    desc: "Rewards consistent profitability over reckless betting by penalizing wild drawdown volatility.",
    icon: "solar:shield-check-bold",
    badge: "Academic Rigor",
  },
  {
    mode: "Mode 3",
    title: "Trading Skills Index",
    desc: "Weighted scoring: 40% Return, 20% Win Rate, 20% Risk Discipline, 10% Diversification, 10% Consistency.",
    icon: "solar:medal-ribbons-star-bold",
    badge: "Holistic Evaluation",
  },
  {
    mode: "Mode 4",
    title: "Intraday Scalping Championship",
    desc: "Trades must be squared off before 3:30 PM. Focuses on intraday technical analysis.",
    icon: "solar:clock-circle-bold",
    badge: "Intraday Only",
  },
  {
    mode: "Mode 5",
    title: "F&O Options Chain Championship",
    desc: "Live simulated NSE option chain with real-time Greeks, strike premiums, Delta, and Open Interest.",
    icon: "solar:chart-square-bold",
    badge: "Advanced Traders",
  },
  {
    mode: "Mode 6",
    title: "Portfolio Allocation Challenge",
    desc: "Participants construct a balanced portfolio adhering to sector exposure limits and hold it.",
    icon: "solar:pie-chart-2-bold",
    badge: "Investment Thesis",
  },
  {
    mode: "Mode 7",
    title: "Team vs Team Clash",
    desc: "Squads of 3–5 students (BBA vs MBA, Finance Club vs Analytics Society). Aggregate team returns.",
    icon: "solar:users-group-rounded-bold",
    badge: "High Social Engagement",
  },
];

const faqs = [
  {
    q: "How long does it take to set up our college stock market competition?",
    a: "Under 24 hours. Submit your event dates, expected student count, and chosen rules on our Host Event page. We configure your private lobby code and provide promotional banners instantly.",
  },
  {
    q: "Is there any financial cost for college finance clubs or student societies?",
    a: "No. Arthhwise provides complimentary competition lobbies, anti-cheat monitoring, and automated co-branded PDF certificates for educational college fests across India.",
  },
  {
    q: "Do all participating students need to download an application?",
    a: "Participants can trade natively via Android (Google Play Store) or iOS (Apple App Store). Furthermore, our zero-install Web Terminal (Coming Soon) allows participants to scan a QR code and trade directly inside any laptop or mobile browser.",
  },
  {
    q: "How do we prevent cheating or price manipulation?",
    a: "Our contest engine executes trades strictly on live NSE/BSE tick feeds with realistic slippage algorithms. Unrealistic off-market prints are automatically filtered, and organizers receive an audit log of all trades.",
  },
];

const CollegeStockMarketCompetitionPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
          { name: "College Stock Market Competition", href: "/college-stock-market-competition" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
              <Icon icon="solar:diploma-bold" width="16" height="16" />
              The Eventbrite of College Stock Market Fests
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              Host India&apos;s Best <span className="text-primary">College Stock Market Competition</span>
            </h1>
            <p className="text-base md:text-xl text-muted dark:text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Turn your college finance fest, E-Summit, or student club event into a high-stakes trading battle. Real-time NSE data, 7 customizable scoring formats, live leaderboards, and auto-generated co-branded certificates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Request Free College Lobby</span>
                <Icon icon="solar:arrow-right-linear" width="18" height="18" />
              </Link>
              <Link
                href="/organizer-toolkit"
                className="px-8 py-4 rounded-xl bg-white dark:bg-darkHeroBg hover:bg-gray-100 dark:hover:bg-white/10 border border-grey/20 dark:border-white/10 font-bold text-base transition-all text-midnight_text dark:text-white flex items-center gap-2"
              >
                <Icon icon="solar:download-square-bold" width="18" height="18" />
                <span>Free Organizer Rulebook</span>
              </Link>
            </div>
            <p className="text-xs text-muted dark:text-white/60 mt-4">
              ✓ Setup in 24 Hours &nbsp;•&nbsp; ✓ ₹0 Cost for Educational Clubs &nbsp;•&nbsp; ✓ Automated Certificates
            </p>
          </div>
        </div>
      </section>

      {/* Zero-Install Web-First Banner */}
      <section className="py-8 bg-white dark:bg-darkHeroBg border-y border-grey/10 dark:border-white/10">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                <Icon icon="solar:laptop-minimalistic-bold" width="26" height="26" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-extrabold text-midnight_text dark:text-white">
                    Zero-Install Web-First Event Access
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-muted dark:text-white/70">
                  Scan QR code → Enter private college code → Start trading directly inside any browser. Zero mandatory app download barrier for your 500+ fest attendees. App available on Android &amp; iOS.
                </p>
              </div>
            </div>
            <Link
              href="/host-event"
              className="shrink-0 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition shadow-md shadow-primary/20"
            >
              Get Early Organizer Access
            </Link>
          </div>
        </div>
      </section>

      {/* 7 Competition Modes */}
      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2 block">
              Beyond Simple P&amp;L
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              7 Intelligent Competition Mechanics
            </h2>
            <p className="text-sm md:text-base text-muted dark:text-white/70">
              Don&apos;t settle for boring &quot;highest return wins&quot; contests that encourage reckless penny-stock gambling. Choose the scoring algorithm that fits your curriculum.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {competitionModes.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon icon={item.icon} width="22" height="22" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-grey/10 dark:bg-white/10 text-midnight_text dark:text-white">
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary">{item.mode}</span>
                  <h3 className="text-lg font-bold text-midnight_text dark:text-white mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted dark:text-white/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof & Comparison */}
          <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl">
            <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-grey/10 dark:divide-white/10">
              <div className="pt-4 md:pt-0">
                <span className="text-3xl md:text-4xl font-extrabold text-primary">₹10,00,000</span>
                <p className="text-xs text-muted dark:text-white/70 mt-1">Virtual Cash per Student</p>
              </div>
              <div className="pt-4 md:pt-0">
                <span className="text-3xl md:text-4xl font-extrabold text-primary">100% Free</span>
                <p className="text-xs text-muted dark:text-white/70 mt-1">For Registered Colleges &amp; Clubs</p>
              </div>
              <div className="pt-4 md:pt-0">
                <span className="text-3xl md:text-4xl font-extrabold text-primary">&lt; 24 Hours</span>
                <p className="text-xs text-muted dark:text-white/70 mt-1">From Request to Live Lobby</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-darkHeroBg border-t border-grey/10 dark:border-white/10 text-midnight_text dark:text-white">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10">
            Frequently Asked Questions for College Organizers
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10"
              >
                <h3 className="text-base font-bold text-midnight_text dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/host-event"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/20 transition"
            >
              <span>Setup Your College Fest Championship Now</span>
              <Icon icon="solar:alt-arrow-right-linear" width="16" height="16" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CollegeStockMarketCompetitionPage;
