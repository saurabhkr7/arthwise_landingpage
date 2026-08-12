import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Organize a College Stock Market Competition | Arthhwise Campus",
  description:
    "The turn-key platform to organize a college stock market competition, paper trading fest, or E-Summit finance event. Private join codes, real-time leaderboards, Excel export, and co-branded certificates — free for colleges.",
  keywords: [
    "organize college stock market competition",
    "host paper trading competition college India",
    "virtual trading app for E-Summit",
    "finance fest stock market event platform",
    "investment club paper trading",
    "college trading championship organizer",
    "stock market competition management software",
    "automated certificate paper trading contest",
    "college finance club event platform India",
  ],
  alternates: {
    canonical: "/organize-college-trading-contest",
  },
  openGraph: {
    title: "Organize a College Stock Market Competition | Arthhwise Campus",
    description:
      "Run a professional paper trading competition for your college fest, Finance Club, or E-Summit in under 24 hours. Free for educational institutions.",
    url: "https://arthhwise.com/organize-college-trading-contest",
    siteName: "Arthhwise",
  },
};

const steps = [
  {
    step: "01",
    title: "Submit Your Request",
    desc: "Fill out the Event Hosting form with your college name, expected participants, and preferred dates. Takes 2 minutes.",
    icon: "solar:clipboard-bold",
  },
  {
    step: "02",
    title: "We Configure Your Event",
    desc: "Our team sets up your private event in the app — including your college name, join code, and scoring rules — within 24 hours.",
    icon: "solar:settings-bold",
  },
  {
    step: "03",
    title: "Students Join & Trade",
    desc: "Share the join code with participants. They download Arthhwise, join using the code, and start trading with ₹10 Lakh virtual cash on live NSE/BSE data.",
    icon: "solar:chart-line-duotone",
  },
  {
    step: "04",
    title: "Download Results & Certificates",
    desc: "After the event ends, download the complete Excel sheet with ranks and trade logs, and auto-generate PDF certificates for winners.",
    icon: "solar:diploma-bold",
  },
];

const features = [
  {
    icon: "solar:key-minimalistic-bold",
    title: "Private Event Join Codes",
    desc: "Only authorized students can join your event. Set a custom code like DJSCE2026 to keep the competition exclusive.",
  },
  {
    icon: "solar:chart-2-bold",
    title: "Real-Time Live Leaderboard",
    desc: "Rank updates auto-refresh during market hours (9:15 AM – 3:30 PM IST). Net return % with trade win-rate as a tie-breaker.",
  },
  {
    icon: "solar:diploma-bold",
    title: "Automated PDF Certificates",
    desc: "Winner and participant certificates generated instantly with your college name, rank, and return percentage.",
  },
  {
    icon: "solar:file-download-bold",
    title: "Excel/CSV Master Export",
    desc: "One-click export of all student details: Roll Number, Name, Email, Division, Rank, Return %, and full Trade Audit log.",
  },
  {
    icon: "solar:shield-check-bold",
    title: "Isolated Contest Portfolio",
    desc: "Participants get a fresh ₹10L contest wallet — their regular paper portfolio is safely backed up and restored after the event.",
  },
  {
    icon: "solar:atom-bold",
    title: "Equity, F&O & Crypto",
    desc: "Configure which asset classes are enabled — equity intraday, futures, options, or crypto — based on your event format.",
  },
];

const faqs = [
  {
    q: "What is the minimum number of participants required?",
    a: "There is no minimum. Even 10-student pilot events are fully supported. Most college fest events run between 50 and 300 participants.",
  },
  {
    q: "How long can a trading competition run?",
    a: "Events can run for a single day (intraday), a weekend, 1 week, or up to 30 days. You set the start and end date when requesting the event.",
  },
  {
    q: "Is this SEBI compliant? Are students at any financial risk?",
    a: "Completely safe. Arthhwise uses 100% virtual paper money. No real money is involved at any point. Students trade with simulated ₹10 Lakh wallets on real live market data — zero financial risk.",
  },
  {
    q: "Can we add options (F&O) trading to the competition?",
    a: "Yes. You can enable Futures & Options (F&O) along with equity and crypto. F&O is fully simulated with live option chains, strike prices, and Greeks.",
  },
  {
    q: "How do students join the event?",
    a: "Students download the Arthhwise app from the Play Store, create an account, and enter your private join code to register for the event.",
  },
  {
    q: "What does it cost?",
    a: "Arthhwise Campus events are 100% free for educational institutions. There is no setup cost, no subscription, and no per-student charge.",
  },
];

const OrganizeCollegeContestPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
          { name: "Organize College Trading Contest", href: "/organize-college-trading-contest" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      <section className="relative pt-8 pb-20 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">

          {/* Organizer Login Bar */}
          <div className="max-w-3xl mx-auto mb-10 p-5 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shrink-0">
                <Icon icon="solar:user-bold" width="22" height="22" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-midnight_text dark:text-white uppercase tracking-wider">
                  Already Have an Event Running?
                </h3>
                <p className="text-xs text-muted dark:text-white/70 mt-0.5">
                  Access your live leaderboard, student master list, and certificate downloads.
                </p>
              </div>
            </div>
            <Link
              href="/organizer/login"
              className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <span>Organizer Portal Login</span>
              <Icon icon="solar:alt-arrow-right-linear" width="16" height="16" />
            </Link>
          </div>

          {/* Hero Text */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-4">
              <Icon icon="solar:cup-star-bold" width="16" height="16" />
              College &amp; Campus Platform
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              Organize a College{" "}
              <span className="text-primary">Stock Market Competition</span>{" "}
              in Under 24 Hours
            </h1>
            <p className="text-base md:text-lg text-muted dark:text-white/80 leading-relaxed mb-8">
              Purpose-built for Finance Clubs, E-Summits, Investment Cells, and Management Fests across India.
              Give your students a live paper trading arena with real NSE/BSE data, private join codes,
              a real-time leaderboard, and co-branded winner certificates — completely free.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event#inquiry-form"
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Request Event Setup — Free</span>
                <Icon icon="solar:alt-arrow-right-linear" width="18" height="18" />
              </Link>
              <a
                href="https://wa.me/918770117256?text=Hi%20Saurabh%2C%20I%20want%20to%20organize%20a%20college%20stock%20market%20competition%20using%20Arthhwise!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-green-600/20"
              >
                <Icon icon="logos:whatsapp-icon" width="18" height="18" />
                <span>WhatsApp Us Instantly</span>
              </a>
            </div>
          </div>

          {/* 4-Step Process */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-midnight_text dark:text-white text-center mb-12">
              From Request to Live Event in{" "}
              <span className="text-primary">4 Simple Steps</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl hover:border-primary/30 transition-all relative"
                >
                  <span className="absolute top-4 right-5 text-4xl font-extrabold text-primary/10 dark:text-primary/20 select-none">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon icon={s.icon} width="24" height="24" />
                  </div>
                  <h3 className="text-base font-bold text-midnight_text dark:text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted dark:text-white/70 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Grid */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-midnight_text dark:text-white text-center mb-12">
              Everything an Organizer Needs —{" "}
              <span className="text-primary">Built In</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon icon={f.icon} width="24" height="24" />
                  </div>
                  <h3 className="text-base font-bold text-midnight_text dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-muted dark:text-white/70 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-midnight_text dark:text-white text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="p-6 rounded-2xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-md"
                >
                  <h3 className="text-sm font-bold text-midnight_text dark:text-white mb-2 flex items-start gap-2">
                    <Icon icon="solar:question-circle-bold" className="text-primary shrink-0 mt-0.5" width="18" height="18" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted dark:text-white/70 leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-primary/30 to-slate-900 p-10 border border-primary/20 text-white text-center shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Ready to Run Your College Trading Competition?
            </h2>
            <p className="text-white/80 text-sm mb-8 max-w-xl mx-auto">
              Join the growing list of Finance Clubs and E-Summits across India using Arthhwise Campus.
              Setup is free, fast, and requires zero technical knowledge.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event#inquiry-form"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <Icon icon="solar:cup-star-bold" width="18" height="18" />
                <span>Request Your Free Event Now</span>
              </Link>
              <Link
                href="/organizer-toolkit"
                className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-sm transition-all flex items-center gap-2"
              >
                <Icon icon="solar:folder-with-files-bold" width="18" height="18" />
                <span>Download Free Organizer Toolkit</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default OrganizeCollegeContestPage;
