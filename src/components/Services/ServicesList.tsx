"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const servicesData = [
  {
    icon: "solar:chart-2-bold",
    title: "Futures & Options (F&O) Trading",
    badge: "Trending Feature",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    description:
      "Master Indian derivatives trading risk-free. Practice with live NSE options chains, Implied Volatility (IV), Delta, Open Interest (OI), and an ultra-fast Depth of Market (DOM) price ladder.",
    link: "https://play.google.com/store/apps/details?id=com.arthwise",
    linkText: "Practice F&O on Mobile App",
    isExternal: true,
  },
  {
    icon: "solar:cup-star-bold",
    title: "Campus & Corporate Trading Events",
    badge: "For Colleges & Organizations",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
    description:
      "Host private stock market championships for your college fest, Finance Club, E-Summit, or corporate team. Turn-key platform with co-branded app banners, private join codes, live leaderboards, and PDF certificates.",
    link: "/host-event",
    linkText: "Host an Event (100% Free)",
    isExternal: false,
  },
  {
    icon: "solar:bitcoin-circle-bold",
    title: "Crypto Virtual Trading",
    badge: "24/7 Markets",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    description:
      "Practice paper trading Bitcoin, Ethereum, Solana, and major digital assets with 24/7 live global market price feeds and zero financial risk.",
    link: "https://play.google.com/store/apps/details?id=com.arthwise",
    linkText: "Trade Crypto Risk-Free",
    isExternal: true,
  },
  {
    icon: "solar:book-bookmark-bold",
    title: "Structured Educational Courses",
    badge: "Beginner to Advanced",
    badgeColor: "bg-green-500/10 text-green-500 border-green-500/20",
    description:
      "Learn stock market fundamentals, candlestick pattern recognition, technical analysis, and risk management through interactive bite-sized learning courses.",
    link: "/learn",
    linkText: "Explore Free Courses",
    isExternal: false,
  },
  {
    icon: "solar:gamepad-bold",
    title: "Daily Contests & Financial Quizzes",
    badge: "Gamified Learning",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    description:
      "Compete in daily simulated trading games with ₹10,00,000 virtual capital. Test your financial literacy with daily interactive stock market quizzes.",
    link: "https://play.google.com/store/apps/details?id=com.arthwise",
    linkText: "Join Daily Contests",
    isExternal: true,
  },
  {
    icon: "solar:users-group-two-rounded-bold",
    title: "Social Trading Community",
    badge: "Peer Learning",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    description:
      "Connect with thousands of aspiring traders across India. Discuss stock picks, share portfolio insights, analyze market trends, and learn together.",
    link: "https://play.google.com/store/apps/details?id=com.arthwise",
    linkText: "Join Community App",
    isExternal: true,
  },
];

const ServicesList: React.FC = () => {
  return (
    <section className="py-16 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
      <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-4">
            <Icon icon="solar:stars-bold" width="16" height="16" />
            What Arthhwise Provides
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
            Comprehensive Trading & <span className="text-primary">Learning Services</span>
          </h2>
          <p className="text-base md:text-lg text-muted dark:text-white/80 leading-relaxed">
            From risk-free paper trading and F&O derivatives simulation to campus events and interactive courses, Arthhwise gives you everything you need to master the stock market.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl p-8 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon icon={service.icon} width="28" height="28" />
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-muted dark:text-white/70 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-grey/10 dark:border-white/10">
                {service.isExternal ? (
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                  >
                    <span>{service.linkText}</span>
                    <Icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
                  </a>
                ) : (
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                  >
                    <span>{service.linkText}</span>
                    <Icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-slate-900 via-primary/30 to-slate-900 p-8 border border-primary/20 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-2">Ready to Start Your Trading Journey?</h3>
            <p className="text-sm text-white/80 max-w-xl">
              Download the free Arthhwise app on Android and get ₹10,00,000 virtual capital instantly to practice paper trading, F&O options, and daily contests.
            </p>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.arthwise"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shrink-0 shadow-lg shadow-primary/25 flex items-center gap-2"
          >
            <Icon icon="logos:google-play-icon" width="18" height="18" />
            <span>Get App on Google Play</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ServicesList;
