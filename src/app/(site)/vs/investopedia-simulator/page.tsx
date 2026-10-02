import React from "react";
import { Metadata } from "next";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Icon } from "@iconify/react";
import Link from "next/link";
import CampusSoftwareSchema from "@/components/Schema/CampusSoftwareSchema";
import FAQSchema from "@/components/Schema/FAQSchema";

export const metadata: Metadata = {
  title: "Arthhwise vs Investopedia Stock Simulator: Best Indian Market Simulator | Arthhwise",
  description:
    "Looking for an Investopedia Stock Simulator equivalent built for India? Compare Arthhwise and Investopedia. Live NSE/BSE ticks, real F&O option chains with Greeks, and turn-key college competition tools.",
  keywords: [
    "Investopedia Stock Simulator Indian equivalent",
    "Investopedia simulator alternative India",
    "Indian stock market simulator NSE BSE",
    "virtual trading tournament organizer",
    "paper trading contest creator India",
    "mock stock market competition software",
    "Investopedia vs Arthhwise",
    "F&O paper trading simulator India",
    "college stock market fest simulator",
  ],
  alternates: {
    canonical: "/vs/investopedia-simulator",
  },
  openGraph: {
    title: "Arthhwise vs Investopedia Stock Simulator: Best Indian Equivalent | Arthhwise",
    description:
      "The modern Investopedia Simulator alternative built for India's NSE/BSE and F&O markets. Live option chains, private tournament lobbies, and automated college certificates.",
    url: "https://arthhwise.com/vs/investopedia-simulator",
    siteName: "Arthhwise",
  },
};

const faqs = [
  {
    q: "Is there an Indian stock market equivalent to the Investopedia Stock Simulator?",
    a: "Yes. Arthhwise is purpose-built as the Indian equivalent to Investopedia's simulator. While Investopedia covers US equities on a 15-minute delay, Arthhwise provides real-time live market ticks for NSE and BSE equities and Indian F&O derivatives with full option chain Greeks.",
  },
  {
    q: "Can I trade Indian Futures & Options (F&O) on Investopedia?",
    a: "No. Investopedia only simulates US stock options on NYSE/NASDAQ. Arthhwise supports live Indian NSE Call/Put options across all weekly and monthly expiry strikes with real-time Implied Volatility (IV), Open Interest (OI), Delta, and Theta.",
  },
  {
    q: "How does Arthhwise compare to Investopedia for hosting college fests and competitions?",
    a: "Investopedia offers generic US classroom games with delayed data and no exportable candidate audit logs. Arthhwise Campus provides turn-key tournament organizer tools: private join PINs, 7 scoring models (including Sharpe Ratio), live leaderboard projector screens, one-click master Excel trade audit exports, and automated co-branded PDF certificates.",
  },
  {
    q: "What is the cost of using Arthhwise compared to Investopedia?",
    a: "Both platforms are free to use. However, Arthhwise provides an ad-free, distraction-free interface and is 100% free for educational institutions, finance clubs, and individual retail traders.",
  },
];

const InvestopediaComparisonPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
    { href: "/vs/investopedia-simulator", text: "Arthhwise vs Investopedia" },
  ];

  return (
    <>
      <CampusSoftwareSchema
        name="Arthhwise — Indian Investopedia Stock Simulator Equivalent"
        description="The modern Investopedia Simulator alternative built for India's NSE/BSE and F&O markets. Real-time ticks, live options chain Greeks, and college trading contest creator."
        urlPath="/vs/investopedia-simulator"
        audienceType="Indian stock market traders, college students, finance cells, E-Summits, retail options buyers"
        featureList={[
          "Live NSE and BSE real-time market data ticks",
          "Indian Futures & Options (F&O) paper trading with IV and Greeks",
          "Turn-key virtual trading tournament organizer with private join codes",
          "7 distinct competition scoring modes including Sharpe Ratio",
          "Automated co-branded merit & participation PDF certificates",
          "Master Excel trade log export for college finance clubs",
        ]}
      />
      <FAQSchema
        faqs={faqs.map((f) => ({
          question: f.q,
          answer: f.a,
        }))}
      />

      <HeroSub
        title="Arthhwise vs Investopedia Stock Simulator"
        description="Looking for an Investopedia Stock Simulator built for the Indian market? See how Arthhwise provides live NSE/BSE ticks, real F&O option chains, and turn-key competition hosting."
        breadcrumbLinks={breadcrumbLinks}
      />

      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">

          {/* Comparison Overview */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Global Alternatives &amp; Simulator Guide
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                Looking for an <span className="text-primary">Investopedia Stock Simulator Equivalent</span> for India?
              </h1>
              <p className="text-muted dark:text-white/80 mb-6 leading-relaxed">
                For over two decades, the <strong>Investopedia Stock Simulator</strong> has been the global standard for learning Wall Street investing. However, Indian students, retail traders, and university finance societies face major limitations: Investopedia only simulates US equities (NYSE &amp; NASDAQ), operates on 15–20 minute delayed data, and completely lacks Indian NSE/BSE shares and Indian F&amp;O derivatives.
              </p>
              <p className="text-muted dark:text-white/80 mb-6 leading-relaxed">
                <strong>Arthhwise</strong> was engineered as the purpose-built Indian counterpart. It delivers <strong>live real-time NSE and BSE tick data</strong>, full derivatives option chains with Greeks, and a turn-key <strong>paper trading contest creator</strong> with private join codes and automated college certificates.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="https://apps.apple.com/in/app/arthhwise-paper-trading-f-o/id6803604616"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-midnight_text dark:bg-white text-white dark:text-midnight_text font-bold text-sm transition-all shadow-sm hover:opacity-90 flex items-center gap-2"
                >
                  <Icon icon="ri:apple-fill" width="18" height="18" />
                  <span>App Store</span>
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.arthwise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <Icon icon="logos:google-play-icon" width="18" height="18" />
                  <span>Google Play</span>
                </Link>
                <Link
                  href="/host-event"
                  className="px-5 py-3 rounded-xl bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 border border-grey/20 dark:border-white/10 font-bold text-sm transition-all text-midnight_text dark:text-white flex items-center gap-1"
                >
                  <span>Host a College Tournament</span>
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-6 text-center">Quick Comparison Verdict</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-bold" width="16" height="16" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Choose Arthhwise if:</h4>
                    <p className="text-xs text-muted dark:text-white/70 mt-1">
                      You trade Indian markets (NSE, BSE, Nifty 50, Bank Nifty), practice F&amp;O options scalping with live option chains, or organize a college fest paper trading championship in India.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-grey/10 dark:border-white/10 pt-4">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-bold" width="16" height="16" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Choose Investopedia if:</h4>
                    <p className="text-xs text-muted dark:text-white/70 mt-1">
                      You are exclusively practicing US stocks (Apple, Tesla, Microsoft on NASDAQ/NYSE) and do not need Indian rupee portfolios or Indian market trading hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-16">
            <div className="p-6 border-b border-grey/10 dark:border-white/10">
              <h2 className="text-2xl font-bold">
                Feature Comparison: Arthhwise vs Investopedia Stock Simulator
              </h2>
              <p className="text-sm text-muted dark:text-white/70 mt-1">
                Detailed structural breakdown between the leading Indian simulation platform and the US simulator.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-900/80 border-b border-grey/10 dark:border-white/10 text-xs font-bold uppercase text-muted dark:text-white/70">
                    <th className="py-5 px-6">Feature</th>
                    <th className="py-5 px-6 text-primary">Arthhwise Platform</th>
                    <th className="py-5 px-6">Investopedia Simulator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey/10 dark:divide-white/10 text-sm">
                  <tr>
                    <td className="py-4 px-6 font-bold">Target Market</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Indian Markets (NSE, BSE, Nifty, Bank Nifty) + Crypto</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">US Markets Only (NYSE, NASDAQ)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Data Feed &amp; Latency</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Real-Time Live Market Ticks (0-delay)</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">15–20 Minutes Delayed Feeds</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Indian Derivatives (F&amp;O)</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Full NSE Option Chain with IV, Delta, Theta &amp; OI</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">No Indian F&amp;O support (US options only)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Trading Tournament Organizer</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Turn-key portal with private codes &amp; 7 scoring formats</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Basic classroom games; limited custom rules</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Trading Hours</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Indian Market Hours: 9:15 AM – 3:30 PM IST</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">US Market Hours: 7:00 PM – 1:30 AM IST</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Co-branded Certificates</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Automated digital verification PDF engine</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">No certificate generation</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Organizer Master Export</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>One-click Excel sheet with full trade audit logs</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Manual student portfolio checking</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">Advertising &amp; Clutter</td>
                    <td className="py-4 px-6 text-green-500 font-semibold flex items-center gap-1.5">
                      <Icon icon="solar:check-circle-bold" width="16" height="16" />
                      <span>Zero Ads (Clean Institutional Interface)</span>
                    </td>
                    <td className="py-4 px-6 text-muted dark:text-white/60">Heavy display advertising banners</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Deep Strategic Pillars */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Why Indian Universities Choose Arthhwise</h3>
              <ul className="space-y-3 text-sm text-muted dark:text-white/70">
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span><strong>Relevant Curriculum Alignment:</strong> Indian students learn on Nifty 50, Sensex, and local equities instead of unfamiliar US tickers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span><strong>Daytime Fest Scheduling:</strong> Live trading matches Indian college hours (9:15 AM to 3:30 PM), avoiding late-night US market sessions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span><strong>Anti-Cheat Realistic Fills:</strong> Trades execute against real NSE order-book liquidity, preventing students from gaming artificial pricing.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Mock Stock Competition Software Architecture</h3>
              <ul className="space-y-3 text-sm text-muted dark:text-white/70">
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span><strong>Virtual Trading Tournament Organizer:</strong> Instant private lobby provisioning with custom college join codes in under 24 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span><strong>Paper Trading Contest Creator:</strong> Tailor trade rules, starting capital (₹5L to ₹25L), asset class permissions (Cash/F&amp;O), and duration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="solar:arrow-right-linear" width="16" height="16" className="text-primary mt-1 shrink-0" />
                  <span><strong>Live Projection Leaderboard:</strong> Display real-time rankings on university auditorium projector screens during E-Summits.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-midnight_text dark:text-white text-center mb-8">
              Frequently Asked Questions: Arthhwise vs Investopedia
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="p-6 rounded-2xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-md"
                >
                  <h3 className="text-base font-bold text-midnight_text dark:text-white mb-2 flex items-start gap-2">
                    <Icon icon="solar:question-circle-bold" className="text-primary shrink-0 mt-0.5" width="20" height="20" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted dark:text-white/70 leading-relaxed pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-primary/30 to-slate-900 p-10 border border-primary/20 text-white text-center shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Ready to Practice on India&apos;s Leading Stock Simulator?
            </h2>
            <p className="text-white/80 text-sm mb-8 max-w-xl mx-auto">
              Get ₹10 Lakh virtual cash and start paper trading on live NSE &amp; BSE data, or host your college trading tournament with zero setup fees.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event#inquiry-form"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <Icon icon="solar:cup-star-bold" width="18" height="18" />
                <span>Host a Free College Tournament</span>
              </Link>
              <Link
                href="https://apps.apple.com/in/app/arthhwise-paper-trading-f-o/id6803604616"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-sm transition-all flex items-center gap-2"
              >
                <Icon icon="ri:apple-fill" width="18" height="18" />
                <span>Download on App Store</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default InvestopediaComparisonPage;
