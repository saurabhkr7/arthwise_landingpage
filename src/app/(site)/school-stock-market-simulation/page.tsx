import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "School Stock Market Simulation & Financial Literacy Game | Arthhwise",
  description:
    "Engaging, risk-free stock market simulation software for high schools (Grades 9-12). Teach practical budgeting, investing fundamentals, and NSE trading in a safe virtual classroom environment.",
  keywords: [
    "school stock market simulation",
    "financial literacy game for high school students",
    "CBSE stock market competition",
    "high school paper trading India",
    "young investors stock game",
    "school economics finance project simulation",
  ],
  alternates: {
    canonical: "/school-stock-market-simulation",
  },
  openGraph: {
    title: "School Stock Market Simulation & Financial Literacy Game | Arthhwise",
    description:
      "Safe, gamified financial literacy for high schools. Students learn investing fundamentals with ₹10 Lakh virtual money.",
    url: "https://arthhwise.com/school-stock-market-simulation",
    siteName: "Arthhwise",
  },
};

const SchoolSimulationPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
          { name: "School Stock Market Simulation", href: "/school-stock-market-simulation" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode" />

      <section className="relative pt-8 pb-16 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
              <Icon icon="solar:book-bookmark-bold" width="16" height="16" />
              K-12 &amp; High School Financial Literacy
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              Safe &amp; Engaging <span className="text-primary">School Stock Market Simulation</span>
            </h1>
            <p className="text-base md:text-xl text-muted dark:text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Introduce Grades 9 to 12 students to financial literacy and real-world economics. Students build long-term virtual portfolios using ₹10 Lakh simulated capital with zero real money risk, protected by teacher-controlled safety parameters.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/host-event"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Register Your School (Complimentary)</span>
                <Icon icon="solar:arrow-right-linear" width="18" height="18" />
              </Link>
              <Link
                href="/learn"
                className="px-8 py-4 rounded-xl bg-white dark:bg-darkHeroBg hover:bg-gray-100 dark:hover:bg-white/10 border border-grey/20 dark:border-white/10 font-bold text-base transition-all text-midnight_text dark:text-white flex items-center gap-2"
              >
                <span>Explore School Learning Modules</span>
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
                Web-First Classroom Mode: Students can access the simulator on school computer lab PCs via web browser.
              </span>
            </div>
            <Link href="/host-event" className="text-primary font-bold text-xs hover:underline shrink-0">
              School Teacher Onboarding →
            </Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:shield-check-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Safe Learning Environment</h3>
              <p className="text-sm text-muted dark:text-white/70">
                100% paper trading with no real money, no advertisements, and no Demat linking prompts. Perfect for minors learning market literacy under CBSE/ICSE economics curriculums.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:chart-line-duotone" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Long-Term Investing Focus</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Encourage portfolio balance by restricting high-frequency scalping. Teachers can set maximum stock allocation caps to reward smart compounding.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <Icon icon="solar:diploma-verified-bold" width="28" height="28" className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Participation Certificates</h3>
              <p className="text-sm text-muted dark:text-white/70">
                Reward every participating student with a personalized certificate of financial literacy, enhancing their high school profile and college applications.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SchoolSimulationPage;
