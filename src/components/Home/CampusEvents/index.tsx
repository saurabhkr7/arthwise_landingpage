"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const CampusEvents: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-darkmode via-darkmode to-midnight_text/95 text-white relative overflow-hidden">
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column - Content & Copy */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Icon icon="solar:cup-star-bold" width="16" height="16" />
              <span>Campus & Corporate Event Platform</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Host Stock Market Competitions at Your <span className="text-primary">College Fest</span>
            </h2>

            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Transform your university event, E-Summit, or Finance Club festival into an interactive trading championship. Arthhwise provides a complete turn-key paper trading platform with co-branded app banners, private join codes, live leaderboards, and automated PDF certificates.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-primary/20 text-primary shrink-0">
                  <Icon icon="solar:key-minimalistic-bold" width="20" height="20" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Private Join Codes</h3>
                  <p className="text-xs text-white/70 mt-0.5">Exclusive entry for your college participants.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-primary/20 text-primary shrink-0">
                  <Icon icon="solar:chart-line-duotone" width="20" height="20" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Live Leaderboard</h3>
                  <p className="text-xs text-white/70 mt-0.5">Real-time P&L ranks & win-rate tie-breakers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-primary/20 text-primary shrink-0">
                  <Icon icon="solar:file-download-bold" width="20" height="20" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">1-Click Excel Export</h3>
                  <p className="text-xs text-white/70 mt-0.5">Full student master lists & trade audit logs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-primary/20 text-primary shrink-0">
                  <Icon icon="solar:diploma-bold" width="20" height="20" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Automated Certificates</h3>
                  <p className="text-xs text-white/70 mt-0.5">Co-branded PDF certificates for rankers.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/host-event"
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Host an Event (100% Free for Colleges)</span>
                <Icon icon="solar:alt-arrow-right-linear" width="18" height="18" />
              </Link>

              <a
                href="https://wa.me/918770117256?text=Hi%20Saurabh%2C%20we%20want%20to%20host%20a%20Paper%20Trading%20Competition%20at%20our%20college!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-200 border border-white/15 flex items-center gap-2"
              >
                <Icon icon="logos:whatsapp-icon" width="18" height="18" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column - Visual Showcase Card */}
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-6 border border-white/15 shadow-2xl backdrop-blur-xl">
              {/* Event Header Banner Mockup */}
              <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-primary/30 to-slate-900 p-5 border border-primary/30 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase bg-primary/20 px-2.5 py-1 rounded-md">
                    DEPARTMENT OF MANAGEMENT STUDIES
                  </span>
                  <span className="flex items-center gap-1 text-xs text-green-400 font-bold bg-green-950/60 px-2.5 py-0.5 rounded-full border border-green-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    LIVE MARKET
                  </span>
                </div>
                <h4 className="text-xl font-extrabold text-white mb-1">
                  National Campus Paper Trading League 2026
                </h4>
                <p className="text-xs text-white/70">
                  ₹10,00,000 Virtual Capital • Real-Time NSE Price Feeds • Intraday & Delivery
                </p>
              </div>

              {/* Sample Live Leaderboard Preview */}
              <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-white/80">Live Leaderboard</span>
                  <span className="text-[11px] text-primary font-semibold">Code: CAMPUS2026</span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-amber-500/30">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-extrabold flex items-center justify-center">
                        1
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">Yuvraj Barnwal</p>
                        <p className="text-[10px] text-white/50">BBA Sem-3 • Roll: 2024031001</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-green-400">+14.25%</p>
                      <p className="text-[10px] text-white/60">₹11,42,500</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-400/20 text-slate-300 text-xs font-extrabold flex items-center justify-center">
                        2
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">Sumit Kumar Verma</p>
                        <p className="text-[10px] text-white/50">BBA Sem-3 • Roll: 2024031042</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-green-400">+9.80%</p>
                      <p className="text-[10px] text-white/60">₹10,98,000</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-600 text-xs font-extrabold flex items-center justify-center">
                        3
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">Vaishnavi Singh</p>
                        <p className="text-[10px] text-white/50">BBA Sem-3 • Roll: 2024031088</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-green-400">+7.40%</p>
                      <p className="text-[10px] text-white/60">₹10,74,000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Badges */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-white/60 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <Icon icon="solar:shield-check-bold" className="text-primary" />
                  Isolated Virtual Wallets
                </span>
                <span className="flex items-center gap-1">
                  <Icon icon="solar:devices-bold" className="text-primary" />
                  Android & iOS Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusEvents;
