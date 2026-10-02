"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface Section {
  id: string;
  title: string;
  badge?: string;
  icon: string;
}

const sections: Section[] = [
  { id: "overview", title: "Overview & Architecture", icon: "solar:server-square-bold" },
  { id: "contest-lifecycle", title: "Contest Provisioning & Lobbies", icon: "solar:settings-bold" },
  { id: "leaderboard-engine", title: "Live Leaderboard Engine", icon: "solar:chart-2-bold" },
  { id: "data-export", title: "Excel Master Export Schema", icon: "solar:file-download-bold" },
  { id: "certificate-api", title: "Certificate Verification API", icon: "solar:diploma-bold" },
  { id: "webhooks", title: "Webhooks & Campus LMS", icon: "solar:transmission-bold" },
];

export const OrganizerDocs: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="py-12 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
      <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Icon icon="solar:code-square-bold" width="16" height="16" />
            Organizer &amp; Developer Hub
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Organizer &amp; Developer <span className="text-primary">Documentation</span>
          </h1>
          <p className="text-base md:text-lg text-muted dark:text-white/80 leading-relaxed">
            Technical specifications, scoring algorithms, export schemas, and webhook integrations for college finance clubs, fest committees, and corporate tournament administrators.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          
          {/* Sidebar Nav */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-28 space-y-1.5 p-4 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted dark:text-white/60 px-3 mb-2 block">
                Documentation Index
              </span>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeSection === s.id
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "text-midnight_text dark:text-white/80 hover:bg-grey/10 dark:hover:bg-white/10"
                  }`}
                >
                  <Icon icon={s.icon} width="16" height="16" className="shrink-0" />
                  <span className="truncate">{s.title}</span>
                </a>
              ))}

              <div className="pt-4 mt-4 border-t border-grey/10 dark:border-white/10">
                <Link
                  href="/host-event#inquiry-form"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all"
                >
                  <Icon icon="solar:cup-star-bold" width="16" height="16" />
                  <span>Request Free Event</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="col-span-12 lg:col-span-9 space-y-12">
            
            {/* Section 1: Overview */}
            <section id="overview" className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon icon="solar:server-square-bold" width="22" height="22" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Architecture</span>
                  <h2 className="text-2xl font-bold">Platform Overview &amp; Execution Model</h2>
                </div>
              </div>

              <p className="text-sm text-muted dark:text-white/80 leading-relaxed mb-4">
                Arthhwise provides institutional-grade virtual trading infrastructure built specifically for the Indian financial ecosystem. The engine connects directly to high-throughput NSE &amp; BSE market data streams, evaluating equity and derivatives executions in simulated environments with zero real capital risk.
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-grey/5 dark:bg-white/5 border border-grey/10 dark:border-white/10">
                  <span className="text-xs font-bold text-primary block mb-1">Virtual Capital Isolation</span>
                  <p className="text-xs text-muted dark:text-white/70">
                    Each participant receives a fresh, isolated ₹10 Lakh competition portfolio. Personal paper trading holdings are preserved.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-grey/5 dark:bg-white/5 border border-grey/10 dark:border-white/10">
                  <span className="text-xs font-bold text-primary block mb-1">Live NSE Tick Matcher</span>
                  <p className="text-xs text-muted dark:text-white/70">
                    Orders fill against actual NSE Depth of Market (DOM) prints. Unrealistic off-market bid/ask prints are filtered out.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-grey/5 dark:bg-white/5 border border-grey/10 dark:border-white/10">
                  <span className="text-xs font-bold text-primary block mb-1">SEBI Safe &amp; Compliant</span>
                  <p className="text-xs text-muted dark:text-white/70">
                    100% paper simulation. No Demat linking, zero real broker write calls, and compliant for university academic fests.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Contest Provisioning */}
            <section id="contest-lifecycle" className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon icon="solar:settings-bold" width="22" height="22" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Tournament Setup</span>
                  <h2 className="text-2xl font-bold">Contest Lifecycle &amp; Private Lobbies</h2>
                </div>
              </div>

              <p className="text-sm text-muted dark:text-white/80 leading-relaxed mb-4">
                Organizers can configure private trading tournaments in under 24 hours. Contests are protected by custom join codes (PINs) to ensure only verified college students or employees participate.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-grey/10 dark:border-white/10 mb-6">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-gray-50 dark:bg-slate-900 border-b border-grey/10 dark:border-white/10 font-bold uppercase text-muted dark:text-white/70">
                    <tr>
                      <th className="p-3.5">Parameter</th>
                      <th className="p-3.5">Default</th>
                      <th className="p-3.5">Configurable Options</th>
                      <th className="p-3.5">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grey/10 dark:divide-white/10">
                    <tr>
                      <td className="p-3.5 font-bold font-mono">initial_capital</td>
                      <td className="p-3.5 font-mono">₹10,00,000</td>
                      <td className="p-3.5 font-mono">₹1L to ₹50L</td>
                      <td className="p-3.5 text-muted dark:text-white/70">Virtual cash credited to student wallet upon joining.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold font-mono">allowed_instruments</td>
                      <td className="p-3.5 font-mono">EQUITY, FNO</td>
                      <td className="p-3.5 font-mono">EQUITY_ONLY, FNO_ONLY, CRYPTO</td>
                      <td className="p-3.5 text-muted dark:text-white/70">Restricts allowed asset categories for the tournament.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold font-mono">scoring_mode</td>
                      <td className="p-3.5 font-mono">MAX_RETURN</td>
                      <td className="p-3.5 font-mono">SHARPE_RATIO, SKILLS_INDEX, INTRADAY</td>
                      <td className="p-3.5 text-muted dark:text-white/70">Algorithm used to rank leaderboard standings.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold font-mono">join_access</td>
                      <td className="p-3.5 font-mono">PRIVATE_PIN</td>
                      <td className="p-3.5 font-mono">PUBLIC, EMAIL_WHITELIST, COLLEGE_DOMAIN</td>
                      <td className="p-3.5 text-muted dark:text-white/70">Access controls ensuring verified enrollment.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Leaderboard Engine */}
            <section id="leaderboard-engine" className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon icon="solar:chart-2-bold" width="22" height="22" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Algorithm</span>
                  <h2 className="text-2xl font-bold">Live Leaderboard &amp; Valuation Engine</h2>
                </div>
              </div>

              <p className="text-sm text-muted dark:text-white/80 leading-relaxed mb-4">
                During market hours (9:15 AM – 3:30 PM IST), participant portfolios are continuously marked to market using live NSE tick data. Tie-breakers and rankings are computed deterministically.
              </p>

              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto mb-6 shadow-inner">
                <div className="text-slate-400 mb-2">// Valuation &amp; Ranking Formula</div>
                <div className="text-green-400">Total Portfolio Value = Cash Balance + ∑(Open Quantity × Current NSE LTP)</div>
                <div className="text-blue-400 mt-1">Net Return % = ((Total Value - Initial Capital) / Initial Capital) × 100</div>
                <div className="text-amber-400 mt-2">// Tie-Breaking Hierarchy:</div>
                <div className="text-slate-300">1. Net Return % (Descending)</div>
                <div className="text-slate-300">2. Trade Win-Rate % (Profitable Trades / Total Completed Trades)</div>
                <div className="text-slate-300">3. Lower Maximum Drawdown %</div>
                <div className="text-slate-300">4. Timestamp of Final Trade Execution (Earlier wins)</div>
              </div>
            </section>

            {/* Section 4: Excel Export */}
            <section id="data-export" className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon icon="solar:file-download-bold" width="22" height="22" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Data Audit</span>
                  <h2 className="text-2xl font-bold">One-Click Excel / CSV Master Export</h2>
                </div>
              </div>

              <p className="text-sm text-muted dark:text-white/80 leading-relaxed mb-4">
                Upon tournament conclusion, organizers can download a comprehensive Master Excel Workbook from the Organizer Portal. The export contains two dedicated worksheets for complete auditability.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-grey/5 dark:bg-white/5 border border-grey/10 dark:border-white/10">
                  <span className="text-xs font-bold text-primary block mb-1">Sheet 1: Final Leaderboard &amp; Student Scores</span>
                  <p className="text-xs text-muted dark:text-white/70 mb-2">
                    Rank, Full Name, Student Roll No, College Email, Starting Capital, Ending Value, Net Profit/Loss (INR), Return %, Win Rate %, Total Orders Placed.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-grey/5 dark:bg-white/5 border border-grey/10 dark:border-white/10">
                  <span className="text-xs font-bold text-primary block mb-1">Sheet 2: Trade Audit Log</span>
                  <p className="text-xs text-muted dark:text-white/70 mb-2">
                    Timestamp (IST), Student ID, Stock Symbol, Transaction (BUY/SELL), Quantity, Execution Price, Order Type (MARKET/LIMIT), P&amp;L upon square-off.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Certificate API */}
            <section id="certificate-api" className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon icon="solar:diploma-bold" width="22" height="22" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Digital Verification</span>
                  <h2 className="text-2xl font-bold">Public Certificate Verification API</h2>
                </div>
              </div>

              <p className="text-sm text-muted dark:text-white/80 leading-relaxed mb-4">
                Every winner and participant certificate includes a unique cryptographic verification UUID. University faculty, HR recruiters, and LinkedIn profiles can verify credential authenticity via the public verification endpoint.
              </p>

              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner">
                <div className="text-slate-400 mb-1">GET https://arthhwise.com/verify/:certificateId</div>
                <div className="text-slate-400 mb-3">Accept: application/json</div>
                <div className="text-slate-200">{"{"}</div>
                <div className="text-slate-200 pl-4">&quot;status&quot;: &quot;VERIFIED&quot;,</div>
                <div className="text-slate-200 pl-4">&quot;participantName&quot;: &quot;Rahul Sharma&quot;,</div>
                <div className="text-slate-200 pl-4">&quot;institutionName&quot;: &quot;BVPIMSR Mumbai&quot;,</div>
                <div className="text-slate-200 pl-4">&quot;tournamentTitle&quot;: &quot;National Stock Market Championship 2026&quot;,</div>
                <div className="text-slate-200 pl-4">&quot;rank&quot;: 1,</div>
                <div className="text-slate-200 pl-4">&quot;netReturnPercent&quot;: &quot;+24.8%&quot;,</div>
                <div className="text-slate-200 pl-4">&quot;issuedAt&quot;: &quot;2026-08-25T15:30:00Z&quot;</div>
                <div className="text-slate-200">{"}"}</div>
              </div>
            </section>

            {/* Section 6: Webhooks */}
            <section id="webhooks" className="p-8 rounded-3xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-xl scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon icon="solar:transmission-bold" width="22" height="22" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Integration</span>
                  <h2 className="text-2xl font-bold">Webhooks &amp; University ERP / LMS Sync</h2>
                </div>
              </div>

              <p className="text-sm text-muted dark:text-white/80 leading-relaxed mb-4">
                Integrate live competition events into university portals, Discord communities, or corporate Slack channels. Webhooks dispatch HTTP POST JSON payloads signed with your organizer secret.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-grey/5 dark:bg-white/5 border border-grey/10 dark:border-white/10">
                  <span className="text-xs font-bold text-primary font-mono block mb-1">tournament.finalized</span>
                  <p className="text-xs text-muted dark:text-white/70">
                    Fired when market closes and official rankings settle. Delivers top 10 winners, total volume, and certificate URLs.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-grey/5 dark:bg-white/5 border border-grey/10 dark:border-white/10">
                  <span className="text-xs font-bold text-primary font-mono block mb-1">leaderboard.hourly_snapshot</span>
                  <p className="text-xs text-muted dark:text-white/70">
                    Dispatched every hour between 9:15 AM and 3:30 PM IST to power external campus digital displays and Discord bots.
                  </p>
                </div>
              </div>
            </section>

          </main>

        </div>

      </div>
    </div>
  );
};
