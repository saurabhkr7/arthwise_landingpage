import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Breadcrumb from "@/components/Breadcrumb";
import InquiryForm from "@/components/HostEvent/InquiryForm";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Host College Paper Trading Competition | Arthhwise Campus",
  description:
    "Organize stock market championships and paper trading competitions for your college fest, E-Summit, or Finance Club. Turn-key platform with private join codes, real-time leaderboards, Excel export, and certificates.",
  keywords: [
    "host paper trading competition",
    "college stock market event platform",
    "virtual trading contest software",
    "organize paper trading contest",
    "stock market fest platform India",
    "Finance Club event partner",
    "E-Cell paper trading game",
    "Arthhwise Campus",
  ],
  alternates: {
    canonical: "/host-event",
  },
  openGraph: {
    title: "Host College Paper Trading Competition | Arthhwise Campus",
    description:
      "Turn-key platform to host stock market competitions for your college fest or Finance Club. Free for educational institutions.",
    url: "https://arthhwise.com/host-event",
    siteName: "Arthhwise",
  },
};

const HostEventPage: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Host Event", href: "/host-event" },
        ]}
      />

      <div className="pt-24 bg-heroBg dark:bg-darkmode">

      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-20 overflow-hidden bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">

          {/* Organizer Login Quick Callout Bar */}
          <div className="max-w-3xl mx-auto mb-10 p-5 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shrink-0">
                <Icon icon="solar:user-bold" width="22" height="22" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-midnight_text dark:text-white uppercase tracking-wider">
                  Existing Event Organizer?
                </h3>
                <p className="text-xs text-muted dark:text-white/70 mt-0.5">
                  Access your live leaderboard dashboard, student master list, and certificate downloads.
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

          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-4">
              <Icon icon="solar:cup-star-bold" width="16" height="16" />
              Arthhwise Campus & Corporate Platform
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              The Go-To Platform to Host <span className="text-primary">Stock Market Championships</span>
            </h1>
            <p className="text-base md:text-lg text-muted dark:text-white/80 leading-relaxed mb-8">
              Empower your college fest, Finance & Investment Cell, E-Summit, or corporate team with a professional, real-time paper trading league. Includes co-branded app banners, isolated ₹10L virtual wallets, live leaderboards, and automated certificates.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#inquiry-form"
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Request Event Setup (100% Free)</span>
                <Icon icon="solar:alt-arrow-down-linear" width="18" height="18" />
              </a>

              <a
                href="https://wa.me/918770117256?text=Hi%20Saurabh%2C%20I%20want%20to%20discuss%20hosting%20a%20trading%20competition%20for%20our%20college!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-green-600/20"
              >
                <Icon icon="logos:whatsapp-icon" width="18" height="18" />
                <span>Instant WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Key Value Proposition Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl transition-all hover:border-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon icon="solar:key-minimalistic-bold" width="24" height="24" />
              </div>
              <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-2">
                Private Contest Join Codes
              </h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Provide a unique access code (e.g. <span className="font-bold text-primary">CAMPUS2026</span>) to ensure only authorized students or members participate in your private tournament.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl transition-all hover:border-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon icon="solar:chart-line-duotone" width="24" height="24" />
              </div>
              <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-2">
                Real-Time Live Leaderboard
              </h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Automated rank updates during market hours (9:15 AM - 3:30 PM). Features Net Return % rankings with trade win-rate tie-breaker rules.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl transition-all hover:border-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon icon="solar:file-download-bold" width="24" height="24" />
              </div>
              <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-2">
                1-Click Faculty Master Export
              </h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Download complete Excel/CSV sheets with student Roll Numbers, Division/Class, Full Name, Email, Rank, Return %, and Trade Audit logs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl transition-all hover:border-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon icon="solar:diploma-bold" width="24" height="24" />
              </div>
              <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-2">
                Co-Branded PDF Certificates
              </h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Automated high-res PDF certificate generation customized with your university logo, department header, and faculty signature lines.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl transition-all hover:border-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon icon="solar:shield-check-bold" width="24" height="24" />
              </div>
              <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-2">
                Isolated Portfolio Backup
              </h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                Participants get a fresh ₹10,00,000 competition wallet while their personal paper portfolio is safely backed up and restored post-event.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl transition-all hover:border-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon icon="solar:devices-bold" width="24" height="24" />
              </div>
              <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-2">
                Android & iOS App Execution
              </h3>
              <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                100% feature parity across devices. Android users trade natively via Google Play Store, while iOS users execute via TestFlight or web fallback.
              </p>
            </div>
          </div>

          {/* Social Proof Showcase Card */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-primary/30 to-slate-900 p-8 border border-primary/20 text-white mb-16 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/20 px-3 py-1 rounded-md mb-3 inline-block">
                  Campus Platform Standard
                </span>
                <h3 className="text-2xl font-extrabold mb-2 text-white">
                  National Management & Commerce Universities
                </h3>
                <p className="text-sm text-white/80 max-w-xl">
                  Host live paper trading championships for ~100+ business students with real-time NSE price feeds, isolated wallets, and automated leaderboard rankings.
                </p>
              </div>
              <div className="shrink-0 text-center md:text-right">
                <span className="text-3xl font-extrabold text-primary">100+</span>
                <p className="text-xs text-white/60">Simultaneous Traders per Event</p>
              </div>
            </div>
          </div>

          {/* Navigation to Specific Target Pages */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-midnight_text dark:text-white text-center mb-10">
              Explore Our Custom Solutions &amp; Event Toolkits
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/organize-college-trading-contest"
                className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl hover:border-primary/40 hover:shadow-2xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon icon="solar:diploma-bold" width="20" height="20" />
                  </div>
                  <h3 className="text-base font-bold text-midnight_text dark:text-white mb-2">
                    College Championships
                  </h3>
                  <p className="text-xs text-muted dark:text-white/60 leading-relaxed mb-4">
                    Turn-key solutions for Finance Clubs, Management fests, and campus E-Summits.
                  </p>
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 duration-200">
                  Read college guide &rarr;
                </span>
              </Link>

              <Link
                href="/corporate-stock-leagues"
                className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl hover:border-primary/40 hover:shadow-2xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon icon="solar:buildings-bold" width="20" height="20" />
                  </div>
                  <h3 className="text-base font-bold text-midnight_text dark:text-white mb-2">
                    Corporate Leagues
                  </h3>
                  <p className="text-xs text-muted dark:text-white/60 leading-relaxed mb-4">
                    Gamify financial literacy programs, L&amp;D exercises, and internal office leagues.
                  </p>
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 duration-200">
                  Read corporate guide &rarr;
                </span>
              </Link>

              <Link
                href="/organizer-toolkit"
                className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl hover:border-primary/40 hover:shadow-2xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon icon="solar:folder-with-files-bold" width="20" height="20" />
                  </div>
                  <h3 className="text-base font-bold text-midnight_text dark:text-white mb-2">
                    Free Organizer Toolkit
                  </h3>
                  <p className="text-xs text-muted dark:text-white/60 leading-relaxed mb-4">
                    Download rulebook templates, intraday guidelines, Sharpe scoring guides, and promos.
                  </p>
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 duration-200">
                  Access free toolkit &rarr;
                </span>
              </Link>

              <Link
                href="/trading-events"
                className="p-6 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl hover:border-primary/40 hover:shadow-2xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon icon="solar:cup-star-bold" width="20" height="20" />
                  </div>
                  <h3 className="text-base font-bold text-midnight_text dark:text-white mb-2">
                    Live Championships
                  </h3>
                  <p className="text-xs text-muted dark:text-white/60 leading-relaxed mb-4">
                    See live, upcoming, and past virtual stock market tournaments active on the platform.
                  </p>
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 duration-200">
                  Browse championships &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* Inquiry Form Anchor Section */}
          <div id="inquiry-form" className="max-w-3xl mx-auto">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default HostEventPage;
