import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Free Organizer Toolkit: Stock Market Competition Templates & Guides | Arthhwise",
  description:
    "Download free resources to run a stock market competition: rulebook templates, step-by-step intraday trading contest guide, Sharpe ratio scoring calculator, and WhatsApp promotional copy. Built for college finance clubs and corporate HR teams.",
  keywords: [
    "stock market fest rulebook PDF template",
    "how to run an intraday trading competition",
    "paper trading competition rules template",
    "virtual trading contest organizer guide",
    "sharpe ratio scoring virtual trading",
    "risk adjusted scoring stock market contest",
    "college finance fest organizer toolkit",
    "stock market event promotional kit",
    "trading competition guide India",
  ],
  alternates: {
    canonical: "/organizer-toolkit",
  },
  openGraph: {
    title: "Free Organizer Toolkit: Stock Market Competition Templates & Guides | Arthhwise",
    description:
      "Free templates, step-by-step guides, and promotional kits to run a stock market competition for your college fest or corporate team.",
    url: "https://arthhwise.com/organizer-toolkit",
    siteName: "Arthhwise",
  },
};

const OrganizerToolkitPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
          { name: "Organizer Toolkit", href: "/organizer-toolkit" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      <section className="relative pt-8 pb-20 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">

          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-4">
              <Icon icon="solar:folder-with-files-bold" width="16" height="16" />
              Free Resource Hub
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              Free{" "}
              <span className="text-primary">Organizer Toolkit</span> for Stock Market Competitions
            </h1>
            <p className="text-base md:text-lg text-muted dark:text-white/80 leading-relaxed">
              Everything you need to plan, announce, and run a professional stock market competition —
              whether for a college fest, Finance Club, or corporate team. Use these free resources even
              if you run your event on Arthhwise or anywhere else.
            </p>
          </div>

          {/* Resource 1: Rulebook Template */}
          <div className="mb-12 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-grey/10 dark:border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon icon="solar:document-text-bold" width="24" height="24" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Resource 1</span>
                <h2 className="text-lg font-extrabold text-midnight_text dark:text-white">
                  Stock Market Fest Rulebook Template
                </h2>
                <p className="text-xs text-muted dark:text-white/60 mt-0.5">
                  A complete, ready-to-customise rulebook for college trading competitions. Just fill in your event name, dates, and college details.
                </p>
              </div>
            </div>
            <div className="p-6 space-y-4 text-sm text-midnight_text dark:text-white/80 leading-relaxed">
              <div className="p-5 rounded-2xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10">
                <h3 className="font-extrabold text-midnight_text dark:text-white mb-3 text-base">
                  📋 [YOUR COLLEGE NAME] STOCK MARKET CHAMPIONSHIP — OFFICIAL RULEBOOK
                </h3>
                <p className="font-bold text-primary mb-2">Section 1 — Overview</p>
                <p>
                  The [Event Name] is a virtual paper trading competition hosted by [College/Club Name]. All participants
                  will trade using simulated virtual capital on real-time NSE and BSE market data via the
                  Arthhwise paper trading platform. No real money is involved at any stage.
                </p>

                <p className="font-bold text-primary mt-4 mb-2">Section 2 — Participation Eligibility</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Open to all students of [College Name] holding a valid student ID.</li>
                  <li>Each participant must register individually using their college email ID.</li>
                  <li>Teams of [1 / 2] participants per entry. (Choose one.)</li>
                  <li>Registration deadline: [Date]. No late registrations will be accepted.</li>
                </ul>

                <p className="font-bold text-primary mt-4 mb-2">Section 3 — Competition Format</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Duration: [X] trading days, from [Start Date] to [End Date].</li>
                  <li>Trading window: 9:15 AM to 3:30 PM IST (NSE market hours) on each trading day.</li>
                  <li>Starting virtual capital: ₹10,00,000 (Ten Lakh) per participant.</li>
                  <li>Permitted instruments: [Equity Intraday / F&O / Crypto — choose applicable].</li>
                  <li>Short selling: [Allowed / Not Allowed].</li>
                  <li>Maximum position size per trade: [₹X or X% of portfolio — optional].</li>
                </ul>

                <p className="font-bold text-primary mt-4 mb-2">Section 4 — Scoring &amp; Rankings</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Rankings are determined by Net Portfolio Return % at competition close.</li>
                  <li>Formula: (Final Portfolio Value − ₹10,00,000) ÷ ₹10,00,000 × 100</li>
                  <li>
                    In case of a tie in Return %, the participant with the higher Trade Win Rate
                    (profitable trades ÷ total trades) will be ranked higher.
                  </li>
                  <li>
                    Further ties will be broken by lower Maximum Drawdown (peak-to-trough portfolio drop).
                  </li>
                  <li>The live leaderboard will update automatically during market hours.</li>
                </ul>

                <p className="font-bold text-primary mt-4 mb-2">Section 5 — Prohibited Conduct</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Creating multiple accounts to gain unfair advantage.</li>
                  <li>Sharing login credentials with other participants.</li>
                  <li>Using automated bots or scripts to place trades.</li>
                  <li>
                    Any form of coordination to artificially inflate or deflate leaderboard rankings.
                  </li>
                </ul>
                <p>
                  Violation of any rule will result in immediate disqualification. The decision of the
                  organizing committee is final and binding.
                </p>

                <p className="font-bold text-primary mt-4 mb-2">Section 6 — Prizes &amp; Certificates</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>1st Place: [Prize description]</li>
                  <li>2nd Place: [Prize description]</li>
                  <li>3rd Place: [Prize description]</li>
                  <li>
                    All registered participants will receive a digital Certificate of Participation
                    issued by [College Name] and Arthhwise.
                  </li>
                  <li>Top 3 winners receive a co-branded Winner Certificate with their rank, return %, and event details.</li>
                </ul>

                <p className="font-bold text-primary mt-4 mb-2">Section 7 — Disclaimer</p>
                <p>
                  This is a simulated paper trading competition. No real financial transactions are
                  made. Results in this competition do not guarantee or predict real-world investment
                  outcomes. Arthhwise and [College Name] are not responsible for any financial
                  decisions made by participants outside this platform.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/host-event#inquiry-form"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all"
                >
                  <Icon icon="solar:cup-star-bold" width="14" height="14" />
                  Use This Rulebook With Arthhwise
                </Link>
                <a
                  href="https://wa.me/918770117256?text=Hi%20Saurabh%2C%20can%20you%20share%20the%20Arthhwise%20Rulebook%20template%20as%20a%20PDF?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-grey/20 dark:border-white/20 hover:border-primary/40 text-midnight_text dark:text-white text-xs font-bold transition-all"
                >
                  <Icon icon="logos:whatsapp-icon" width="14" height="14" />
                  Get PDF Version on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Resource 2: Step-by-Step Guide */}
          <div className="mb-12 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-grey/10 dark:border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon icon="solar:list-check-bold" width="24" height="24" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Resource 2</span>
                <h2 className="text-lg font-extrabold text-midnight_text dark:text-white">
                  How to Run an Intraday Trading Competition — Step-by-Step Guide
                </h2>
                <p className="text-xs text-muted dark:text-white/60 mt-0.5">
                  A practical guide covering every phase: planning, promotion, execution, and prize distribution.
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {[
                  {
                    step: "Step 1 — Define the Event Format (1-2 Weeks Before)",
                    items: [
                      "Decide the duration: 1-day intraday sprint, 3-day swing, or 1-week full competition.",
                      "Choose the asset classes: equity-only (safest for beginners), or include F&O for advanced students.",
                      "Set a participant target: 50, 100, or 200+ students.",
                      "Decide prizes: certificates only, vouchers, or sponsored cash prizes.",
                      "Get faculty/HR approval and event slot confirmation.",
                    ],
                  },
                  {
                    step: "Step 2 — Set Up Your Event Platform (1 Week Before)",
                    items: [
                      "Submit your event request at arthhwise.com/host-event (takes 2 minutes).",
                      "Receive your private event join code from the Arthhwise team within 24 hours.",
                      "Test the event on the Arthhwise app as a sample participant to verify the join flow.",
                      "Access your Organizer Dashboard — you'll see all registered participants in real time.",
                    ],
                  },
                  {
                    step: "Step 3 — Promote the Event (5-7 Days Before)",
                    items: [
                      "Announce via college WhatsApp groups, Instagram, and notice boards.",
                      "Share the Play Store link and your private join code in communications.",
                      "Hold a 10-minute 'How to Join' demo session for participants (live or recorded).",
                      "Create urgency: set a registration deadline 24 hours before the competition starts.",
                    ],
                  },
                  {
                    step: "Step 4 — Run the Competition (On Event Days)",
                    items: [
                      "Open the Organizer Dashboard at 9:00 AM to monitor participant activity.",
                      "Trading window is live from 9:15 AM to 3:30 PM IST on each event day.",
                      "Post leaderboard screenshots to the group at 12:00 PM (lunch) and 3:00 PM to build excitement.",
                      "After market close, review the final leaderboard and take a screenshot for records.",
                    ],
                  },
                  {
                    step: "Step 5 — Close the Event & Distribute Prizes",
                    items: [
                      "Download the Excel master sheet with all participant ranks, return %, and trade logs.",
                      "Generate winner and participant certificates directly from the Organizer Dashboard.",
                      "Announce winners on social media with a screenshot of the final leaderboard.",
                      "Distribute certificates digitally — they&apos;re branded with your college name and Arthhwise co-branding.",
                    ],
                  },
                ].map((section) => (
                  <div key={section.step} className="p-5 rounded-2xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10">
                    <h3 className="font-extrabold text-primary text-sm mb-3">{section.step}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-midnight_text dark:text-white/80">
                          <Icon icon="solar:check-circle-bold" className="text-green-500 shrink-0 mt-0.5" width="16" height="16" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resource 3: Scoring Guide */}
          <div className="mb-12 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-grey/10 dark:border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon icon="solar:calculator-bold" width="24" height="24" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Resource 3</span>
                <h2 className="text-lg font-extrabold text-midnight_text dark:text-white">
                  Risk-Adjusted Scoring Guide — Sharpe Ratio in Virtual Trading Contests
                </h2>
                <p className="text-xs text-muted dark:text-white/60 mt-0.5">
                  Understand how to score contestants fairly — rewarding smart risk management, not just lucky big bets.
                </p>
              </div>
            </div>
            <div className="p-6 space-y-5 text-sm text-midnight_text dark:text-white/80 leading-relaxed">
              <div className="p-5 rounded-2xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10">
                <h3 className="font-extrabold text-midnight_text dark:text-white mb-3">
                  Why Pure Return % is a Flawed Scoring Method
                </h3>
                <p>
                  Ranking only by total return % rewards participants who got lucky with a single all-in bet
                  rather than those who built a well-managed, diversified portfolio. A student who put 100%
                  of their ₹10L into one penny stock and got a 50% return on it shouldn&apos;t rank above a student
                  who carefully traded 10 different positions and achieved a consistent 35% return.
                </p>
                <p className="mt-3">
                  Risk-adjusted scoring solves this by rewarding <strong>return per unit of risk taken</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10">
                <h3 className="font-extrabold text-primary mb-3">Method 1 — Simple Composite Scoring (Recommended for Beginners)</h3>
                <p className="mb-3">Use a weighted composite of three metrics to create the final score:</p>
                <div className="font-mono text-xs bg-white dark:bg-darkHeroBg p-3 rounded-xl border border-grey/10 dark:border-white/10 mb-3">
                  Final Score = (0.6 × Net Return %) + (0.25 × Win Rate %) − (0.15 × Max Drawdown %)
                </div>
                <ul className="space-y-1.5 text-sm">
                  <li><strong>Net Return %:</strong> Overall portfolio gain from ₹10L starting capital.</li>
                  <li><strong>Win Rate %:</strong> Percentage of trades that were profitable (closed at a gain).</li>
                  <li><strong>Max Drawdown %:</strong> The largest peak-to-trough drop in portfolio value during the event.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10">
                <h3 className="font-extrabold text-primary mb-3">Method 2 — Simplified Sharpe Ratio (For Advanced Events)</h3>
                <p className="mb-3">
                  The Sharpe Ratio measures excess return per unit of risk (volatility). A higher Sharpe Ratio means better
                  risk-adjusted performance.
                </p>
                <div className="font-mono text-xs bg-white dark:bg-darkHeroBg p-3 rounded-xl border border-grey/10 dark:border-white/10 mb-3">
                  Sharpe Ratio ≈ (Daily Average Return − 0%) ÷ Standard Deviation of Daily Returns
                </div>
                <p className="text-xs text-muted dark:text-white/60">
                  (In a virtual trading context, the risk-free rate is set to 0% since no real money is at stake.
                  A Sharpe Ratio above 1.0 is considered good; above 2.0 is excellent.)
                </p>
                <div className="mt-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-xs text-primary font-bold">
                    ✅ Arthhwise automatically calculates and displays Net Return % and Win Rate on the leaderboard.
                    For events requiring Sharpe Ratio scoring, our team can export daily P&L data for manual calculation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resource 4: Promotional Kit */}
          <div className="mb-20 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-grey/10 dark:border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon icon="solar:megaphone-bold" width="24" height="24" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Resource 4</span>
                <h2 className="text-lg font-extrabold text-midnight_text dark:text-white">
                  Promotional Kit — WhatsApp &amp; Instagram Copy Templates
                </h2>
                <p className="text-xs text-muted dark:text-white/60 mt-0.5">
                  Ready-to-use announcement copy. Just fill in your event name, dates, and join code.
                </p>
              </div>
            </div>
            <div className="p-6 space-y-5 text-sm">
              {[
                {
                  label: "WhatsApp Announcement (1st Message — Registration Open)",
                  content: `🚨 [EVENT NAME] — REGISTRATION OPEN 🚨\n\n📈 Think you can beat the market?\n\nJoin [College Name]'s official Stock Market Championship — trade live on real NSE & BSE data using ₹10 Lakh virtual money!\n\n🗓 Dates: [Start Date] to [End Date]\n🏆 Prizes: Certificates + [Cash/Vouchers]\n📱 Platform: Arthhwise App (Free on Play Store)\n🔑 Join Code: [YOUR CODE]\n\n✅ Free to participate | Zero real money risk\n\n📥 Download Arthhwise → [Play Store Link]\nRegister before [Deadline Date] ⚡`,
                },
                {
                  label: "WhatsApp Reminder (24 Hours Before Competition Starts)",
                  content: `⏰ LAST CHANCE — [EVENT NAME] starts TOMORROW!\n\n⚡ [X] students have already registered. Don't get left behind!\n\nDownload Arthhwise → [Play Store Link]\nJoin with code: [YOUR CODE]\n\nTrading begins tomorrow at 9:15 AM sharp 📈\nLive leaderboard will be updated every hour!\n\nGood luck! 🏆`,
                },
                {
                  label: "Instagram Caption",
                  content: `📈 [EVENT NAME] — LIVE!\n\nOur Stock Market Championship is officially live! 🔥\n[X] traders competing for the top spot on our real-time leaderboard right now.\n\n💰 ₹10 Lakh virtual portfolio. Real NSE & BSE prices. Real competition.\n\nTrack the live leaderboard on the Arthhwise app → [Play Store Link]\n\n#StockMarket #PaperTrading #[CollegeName] #FinanceFest #TradingCompetition #Arthhwise #NSE #Investing #FinanceClub #ESummit`,
                },
              ].map((template) => (
                <div key={template.label} className="p-5 rounded-2xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10">
                  <h3 className="font-bold text-primary text-xs uppercase tracking-wider mb-3">{template.label}</h3>
                  <pre className="whitespace-pre-wrap text-xs text-midnight_text dark:text-white/80 leading-relaxed font-sans">
                    {template.content}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-primary/30 to-slate-900 p-10 border border-primary/20 text-white text-center shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Ready to Run Your Competition on Arthhwise?
            </h2>
            <p className="text-white/80 text-sm mb-8 max-w-xl mx-auto">
              All the features in this toolkit are built-in when you host your event on Arthhwise.
              Setup is free, takes under 24 hours, and requires zero technical knowledge.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event#inquiry-form"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <Icon icon="solar:cup-star-bold" width="18" height="18" />
                <span>Request Your Free Event Setup</span>
              </Link>
              <Link
                href="/organize-college-trading-contest"
                className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-sm transition-all flex items-center gap-2"
              >
                <Icon icon="solar:diploma-bold" width="18" height="18" />
                <span>College Events Guide</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default OrganizerToolkitPage;
