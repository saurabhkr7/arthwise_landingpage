import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Trading Assessment Platform for Banks & Investment Firms | Arthhwise",
  description:
    "Evaluate candidate trading aptitude, risk management discipline, and market psychology. The 1-to-2 hour simulation platform for investment banks, proprietary trading desks, and financial recruiter hiring rounds.",
  keywords: [
    "trader hiring assessment simulation",
    "investment bank trading assessment test",
    "finance candidate aptitude simulator India",
    "prop trading desk hiring test",
    "campus recruitment trading simulation",
    "stock market aptitude evaluation software",
    "candidate risk management testing platform",
  ],
  alternates: {
    canonical: "/trading-assessment-platform",
  },
  openGraph: {
    title: "Trading Assessment Platform for Banks & Investment Firms | Arthhwise",
    description:
      "Filter candidate talent through simulated market conditions. Measure risk discipline, execution speed, and decision making under pressure.",
    url: "https://arthhwise.com/trading-assessment-platform",
    siteName: "Arthhwise",
  },
};

const AssessmentPlatformPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Trading Assessment Platform", href: "/trading-assessment-platform" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      {/* Hero */}
      <section className="relative pt-8 pb-16 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
              <Icon icon="solar:user-check-rounded-bold" width="16" height="16" />
              Institutional Recruitment &amp; Talent Evaluation
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              The Simulated <span className="text-primary">Trading Assessment Platform</span> for Hiring
            </h1>
            <p className="text-base md:text-xl text-muted dark:text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Interviews alone cannot reveal how a candidate reacts when a position drops 5% in seconds. Put hundreds of campus applicants or trainee traders through a customized 1-to-2 hour live simulation to benchmark their true risk management, emotional discipline, and execution acumen.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Schedule a Recruitment Pilot</span>
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

      {/* Web-First Banner */}
      <section className="py-6 bg-white dark:bg-darkHeroBg border-y border-grey/10 dark:border-white/10">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="p-4 rounded-2xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[10px] font-extrabold uppercase">
                Coming Soon
              </span>
              <span className="text-sm font-bold text-midnight_text dark:text-white">
                Browser-Based Hiring Portal: Candidates complete their assessment on office desktops or laptops via web browser.
              </span>
            </div>
            <Link href="/host-event" className="text-primary font-bold text-xs hover:underline shrink-0">
              Request Recruiter Access →
            </Link>
          </div>
        </div>
      </section>

      {/* How Banks & Prop Desks Use It */}
      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2 block">
              Objective Hiring Intelligence
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Judge What Resumes Cannot Show
            </h2>
            <p className="text-sm md:text-base text-muted dark:text-white/70">
              Streamline Round 1 campus recruitment or associate onboarding with behavioral trading benchmarks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Icon icon="solar:shield-warning-bold" width="26" height="26" />
              </div>
              <h3 className="text-xl font-bold mb-3">Risk Discipline Index</h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Track whether candidates set stop-losses, revenge trade after a loss, or oversize their positions. Filter out gamblers from disciplined risk managers.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Icon icon="solar:clock-circle-bold" width="26" height="26" />
              </div>
              <h3 className="text-xl font-bold mb-3">1–2 Hour Fast Assessment</h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Inject dynamic corporate news flashes every 10–15 minutes during a live assessment. Evaluate how candidates assimilate data and execute trades under time pressure.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Icon icon="solar:document-text-bold" width="26" height="26" />
              </div>
              <h3 className="text-xl font-bold mb-3">Recruiter Scorecards &amp; Export</h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Download candidate rankings with win-rate %, Sharpe ratio, trade frequency, maximum drawdown, and complete execution audit trails for selection panels.
              </p>
            </div>
          </div>

          {/* Recruiter Workflow */}
          <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl">
            <h3 className="text-xl md:text-2xl font-extrabold mb-8 text-center">
              The 4-Step Recruiter Assessment Pipeline
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-extrabold inline-flex items-center justify-center">1</span>
                <h4 className="font-bold text-sm">Define Cohort &amp; Rules</h4>
                <p className="text-xs text-muted dark:text-white/60">Choose allowed assets (Equities, F&amp;O) and scoring weights (Sharpe or Skills Score).</p>
              </div>
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-extrabold inline-flex items-center justify-center">2</span>
                <h4 className="font-bold text-sm">Distribute Access Code</h4>
                <p className="text-xs text-muted dark:text-white/60">Candidates enter your private hiring lobby with their application roll number.</p>
              </div>
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-extrabold inline-flex items-center justify-center">3</span>
                <h4 className="font-bold text-sm">Live 90-Min Simulation</h4>
                <p className="text-xs text-muted dark:text-white/60">Candidates trade under live or simulated news volatility while your team monitors live analytics.</p>
              </div>
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-extrabold inline-flex items-center justify-center">4</span>
                <h4 className="font-bold text-sm">Export Shortlist</h4>
                <p className="text-xs text-muted dark:text-white/60">Export the top 10% disciplined candidates directly to Round 2 technical interviews.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AssessmentPlatformPage;
