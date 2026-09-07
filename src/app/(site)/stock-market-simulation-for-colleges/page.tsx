import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Stock Market Simulation for Colleges & Universities | Finance Lab Platform | Arthhwise",
  description:
    "Institutional stock market simulation software for colleges and business schools. Live NSE market ticks, Sharpe ratio scoring, student performance analytics, and automated grading exports.",
  keywords: [
    "stock market simulation for colleges",
    "finance lab software India",
    "university trading simulator",
    "stock market learning platform for colleges",
    "business school paper trading software",
    "academic trading lab NSE simulator",
    "MBA finance lab simulation",
  ],
  alternates: {
    canonical: "/stock-market-simulation-for-colleges",
  },
  openGraph: {
    title: "Stock Market Simulation for Colleges & Universities | Arthhwise",
    description:
      "Bridge classroom theory with live market reality. Real-time NSE data simulation for business schools and undergraduate universities.",
    url: "https://arthhwise.com/stock-market-simulation-for-colleges",
    siteName: "Arthhwise",
  },
};

const CollegeSimulationPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
          { name: "Stock Market Simulation for Colleges", href: "/stock-market-simulation-for-colleges" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      <section className="relative pt-8 pb-16 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
              <Icon icon="solar:diploma-bold" width="16" height="16" />
              Academic Finance Lab Infrastructure
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              Institutional <span className="text-primary">Stock Market Simulation</span> for Colleges
            </h1>
            <p className="text-base md:text-xl text-muted dark:text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Enable commerce, BBA, and MBA students to trade equities, options, and futures risk-free. Instructors gain detailed student audit logs, risk-adjusted Sharpe ratios, and gradebook exports.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Request Campus Partnership</span>
                <Icon icon="solar:arrow-right-linear" width="18" height="18" />
              </Link>
              <Link
                href="/organizer-toolkit"
                className="px-8 py-4 rounded-xl bg-white dark:bg-darkHeroBg hover:bg-gray-100 dark:hover:bg-white/10 border border-grey/20 dark:border-white/10 font-bold text-base transition-all text-midnight_text dark:text-white flex items-center gap-2"
              >
                <span>Free Finance Lab Toolkit</span>
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
                Web-First Finance Lab: Deployable instantly across college computer labs without installing external desktop clients.
              </span>
            </div>
            <Link href="/host-event" className="text-primary font-bold text-xs hover:underline shrink-0">
              Campus Onboarding Inquiry →
            </Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:calculator-minimalistic-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Academic Scoring Metrics</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Grade students on portfolio diversification, risk-adjusted return (Sharpe ratio), and maximum drawdown rather than luck-based speculation.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:file-download-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Professor Gradebook Export</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Generate comprehensive CSV/Excel files containing student roll numbers, trade counts, win rates, and final valuations for seamless grading.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:users-group-rounded-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Classroom Cohort Separation</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Run isolated cohorts for Section A vs Section B, or create specialized derivatives simulation labs for advanced postgraduate students.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CollegeSimulationPage;
