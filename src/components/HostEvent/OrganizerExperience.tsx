"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState } from "react";
import InquiryForm from "@/components/HostEvent/InquiryForm";

type Instrument = {
  name: string;
  symbol: string;
  price: string;
  move: string;
  tone: "up" | "down";
  detail: string;
};

const instruments: Instrument[] = [
  {
    name: "Arthhwise Energy",
    symbol: "ARTH",
    price: "₹1,284.50",
    move: "+7.44%",
    tone: "up",
    detail: "Float 1,00,000 · Circuit ±10%",
  },
  {
    name: "Kestrel Bank",
    symbol: "KEST",
    price: "₹642.20",
    move: "−1.41%",
    tone: "down",
    detail: "Float 2,50,000 · Circuit ±8%",
  },
  {
    name: "Verdant Agro",
    symbol: "VERD",
    price: "₹446.10",
    move: "−1.91%",
    tone: "down",
    detail: "Float 1,50,000 · Circuit ±10%",
  },
  {
    name: "Nifty 50 ETF",
    symbol: "NIFTY",
    price: "₹512.75",
    move: "+1.07%",
    tone: "up",
    detail: "4 constituents · Rebalances every 2 rounds",
  },
];

const orders = [
  ["BUY", "Bull Runners", "120 ARTH", "12:41:52"],
  ["SELL", "Finomics", "40 KEST", "12:41:47"],
  ["BUY", "Alpha", "300 VERD", "12:41:41"],
  ["BUY", "Capital Crew", "25 NIFTY", "12:41:36"],
];

const leaderboard = [
  ["01", "Alpha", "₹11,71,947", "+17.19%"],
  ["02", "Bull Runners", "₹11,54,867", "+15.49%"],
  ["03", "Finomics", "₹11,07,508", "+10.75%"],
  ["04", "Capital Crew", "₹10,94,910", "+9.49%"],
  ["05", "Market Mavens", "₹10,77,212", "+7.72%"],
];

const sectionLinks = [
  ["setup", "01", "Configure"],
  ["registration", "02", "Register"],
  ["live-market", "03", "Trade live"],
  ["leaderboard", "04", "Publish results"],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary dark:text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-primary" />
      {children}
    </span>
  );
}

function Sparkline({ muted = false }: { muted?: boolean }) {
  return (
    <svg viewBox="0 0 440 120" className="h-full w-full text-primary dark:text-primary" role="img" aria-label="Illustrative price movement chart">
      <path d="M0 100 H440 M0 60 H440 M0 20 H440" stroke="currentColor" opacity=".12" strokeDasharray="2 5" />
      <path
        d="M0 96 C18 91 25 88 42 78 S66 90 83 72 S109 67 125 63 S150 43 168 61 S190 83 209 71 S230 76 249 54 S274 59 293 36 S313 51 330 29 S356 48 375 18 S394 38 410 20 S429 25 440 12"
        fill="none"
        stroke={muted ? "#94a3b8" : "currentColor"}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M0 96 C18 91 25 88 42 78 S66 90 83 72 S109 67 125 63 S150 43 168 61 S190 83 209 71 S230 76 249 54 S274 59 293 36 S313 51 330 29 S356 48 375 18 S394 38 410 20 S429 25 440 12 V120 H0 Z"
        fill={muted ? "#94a3b8" : "currentColor"}
        opacity=".07"
      />
    </svg>
  );
}

function WindowBar({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border dark:border-white/10 px-4 py-3 text-[10px] tracking-[0.16em] text-muted dark:text-slate-500">
      <span className="h-2 w-2 rounded-full bg-rose-400/80" />
      <span className="h-2 w-2 rounded-full bg-amber-300/80" />
      <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
      <span className="ml-2 truncate font-mono">arthhwise / {path}</span>
    </div>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="border-r border-border dark:border-white/10 px-4 py-4 last:border-r-0">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted dark:text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-midnight_text dark:text-white">{value}</div>
      {detail && <div className="mt-1 text-[11px] text-muted dark:text-slate-500">{detail}</div>}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-midnight_text dark:text-white md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-7 text-muted dark:text-white/70 md:text-lg">{children}</p>
    </div>
  );
}

export default function OrganizerExperience() {
  const [activeInstrument, setActiveInstrument] = useState(0);
  const [marketOpen, setMarketOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Finance Fest '26");

  const selected = instruments[activeInstrument];

  return (
    <main className="overflow-hidden bg-heroBg text-midnight_text dark:bg-darkmode dark:text-white">
      <section className="relative border-b border-border bg-[radial-gradient(circle_at_75%_10%,rgba(47,115,242,.12),transparent_32%),linear-gradient(135deg,#f3f9fd_0%,#ffffff_60%,#e7f5ff_100%)] px-4 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40 dark:border-white/10 dark:bg-[radial-gradient(circle_at_75%_10%,rgba(38,111,104,.28),transparent_30%),linear-gradient(135deg,#0b1827_0%,#070d18_58%,#071019_100%)]">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <Eyebrow>Arthhwise campus events</Eyebrow>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-0.065em] text-midnight_text dark:text-white md:text-7xl">
                Host your own
                <span className="block text-primary dark:text-slate-500">live market.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted dark:text-slate-300">
                Set up a live stock-market competition, bring in your participants, open the market, and let every trade count toward a leaderboard your audience can see.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#inquiry-form" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-primary/90 dark:bg-primary dark:text-white dark:hover:bg-primary/90">
                  Request event setup <Icon icon="solar:arrow-right-up-linear" width="18" />
                </a>
                <a href="#event-journey" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3.5 text-sm font-bold text-midnight_text transition hover:border-primary/60 hover:bg-primary/5 dark:border-white/15 dark:text-white dark:hover:border-primary/60 dark:hover:bg-white/5">
                  See how it works <Icon icon="solar:arrow-down-linear" width="18" />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-5 text-xs text-muted dark:text-slate-500">
                <span className="flex items-center gap-2"><Icon icon="solar:shield-check-bold" className="text-primary dark:text-primary" /> Virtual money only</span>
                <span className="flex items-center gap-2"><Icon icon="solar:users-group-rounded-bold" className="text-primary dark:text-primary" /> Built for 1000+ participants</span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white/90 shadow-2xl shadow-primary/10 dark:border-white/15 dark:bg-[#0c1424]/95 dark:shadow-black/30">
              <WindowBar path="admin / event monitor" />
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 text-[10px] uppercase tracking-[0.18em] dark:border-white/10">
                <span className="flex items-center gap-2 text-primary dark:text-primary"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary dark:bg-primary" /> {marketOpen ? "Market open" : "Registration open"}</span>
                <span className="text-muted dark:text-slate-500">Finance Fest '26 · Room F26K7</span>
              </div>
              <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4 dark:border-white/10">
                <Stat label="Teams" value="128" detail="registered" />
                <Stat label="Orders" value={marketOpen ? "4,821" : "0"} detail={marketOpen ? "this event" : "before open"} />
                <Stat label="Round" value={marketOpen ? "02 / 04" : "Pre-open"} detail={marketOpen ? "active" : "countdown"} />
                <Stat label="Event" value="LIVE" detail="illustrative" />
              </div>
              <div className="grid gap-0 md:grid-cols-[1.25fr_.75fr]">
                <div className="border-b border-border p-5 md:border-b-0 md:border-r dark:border-white/10">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted dark:text-slate-500">
                    <span>{selected.symbol} · {selected.price}</span>
                    <span className={selected.tone === "up" ? "text-green-600 dark:text-primary" : "text-rose-500 dark:text-rose-400"}>{selected.move}</span>
                  </div>
                  <div className="mt-5 h-36"><Sparkline /></div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted dark:text-slate-500"><span>This round</span><span>09:15–10:00 IST</span></div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted dark:text-slate-500">Prices</div>
                  <div className="mt-4 space-y-3">
                    {instruments.map((item) => (
                      <button key={item.symbol} onClick={() => setActiveInstrument(instruments.indexOf(item))} className="flex w-full items-center justify-between text-left text-xs transition hover:text-primary dark:hover:text-white">
                        <span className="text-midnight_text/80 dark:text-slate-300">{item.symbol}</span>
                        <span className="font-mono text-muted dark:text-slate-400">{item.price}</span>
                        <span className={item.tone === "up" ? "text-green-600 dark:text-primary" : "text-rose-500 dark:text-rose-400"}>{item.move}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-border px-5 py-4 text-xs text-muted dark:border-white/10 dark:text-slate-400">
                <span className="mr-3 text-[10px] uppercase tracking-[0.18em] text-muted dark:text-slate-500">Recent orders</span>
                {marketOpen ? "Bull Runners bought 120 ARTH · 12:41:52" : "Orders will appear here when the market opens"}
              </div>
            </div>
          </div>

          <nav id="event-journey" className="mt-20 grid gap-2 border-t border-border pt-5 sm:grid-cols-4 dark:border-white/10">
            {sectionLinks.map(([id, number, label]) => (
              <a key={id} href={`#${id}`} className="group flex items-center gap-3 py-2 text-sm text-muted transition hover:text-primary dark:text-slate-500 dark:hover:text-white">
                <span className="font-mono text-[10px] text-primary dark:text-primary">{number}</span>
                <span>{label}</span>
                <Icon icon="solar:arrow-down-right-linear" className="ml-auto opacity-0 transition group-hover:opacity-100" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="border-b border-border px-4 py-20 md:px-8 md:py-28 dark:border-white/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="The event journey" title="Everything your floor team needs in one flow.">
            The page should make the experience feel tangible: configure the event, load the cohort, open the bell, follow every trade, and publish the final ranking.
          </SectionHeading>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Build", "Create instruments, rounds, rules, starting capital, and sponsor details before the doors open."],
              ["02", "Run", "Control the opening bell, live rounds, price events, announcements, and participant activity."],
              ["03", "Score", "Calculate net worth automatically, show rank changes on the big screen, and export the result."],
            ].map(([number, title, copy]) => (
              <div key={number} className="rounded-2xl border border-border bg-white p-6 transition hover:border-primary/40 hover:bg-primary/[.03] dark:border-white/10 dark:bg-white/[.025] dark:hover:border-primary/40 dark:hover:bg-white/[.04]">
                <div className="font-mono text-xs text-primary dark:text-primary">{number}</div>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-midnight_text dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted dark:text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="setup" className="border-b border-border px-4 py-20 md:px-8 md:py-28 dark:border-white/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="01 · Configure" title="Build the market before the doors open.">
            Give the event its own format. Choose what participants can trade, how much virtual capital they start with, and what rules determine a winner.
          </SectionHeading>
          <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-white shadow-xl dark:border-white/10 dark:bg-[#0c1424]">
            <WindowBar path="admin / event setup" />
            <div className="grid lg:grid-cols-[.85fr_1.15fr]">
              <div className="border-b border-border p-6 lg:border-b-0 lg:border-r dark:border-white/10">
                <div className="flex items-center justify-between"><span className="text-sm font-semibold text-midnight_text dark:text-white">Finance Fest '26</span><span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] uppercase tracking-wider text-primary dark:bg-primary/10 dark:text-primary">Draft</span></div>
                <div className="mt-6 space-y-4">
                  {[
                    ["Event format", "Live intraday competition"],
                    ["Starting capital", "₹10,00,000 per team"],
                    ["Market hours", "09:15–12:15 IST"],
                    ["Scoring", "Net worth + tie-break rules"],
                  ].map(([label, value]) => (
                    <div key={label} className="border-b border-border pb-3 dark:border-white/10"><div className="text-[10px] uppercase tracking-[0.16em] text-muted dark:text-slate-500">{label}</div><div className="mt-1 text-sm text-midnight_text dark:text-slate-200">{value}</div></div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs leading-5 text-muted dark:border-primary/20 dark:bg-primary/5 dark:text-slate-300"><Icon icon="solar:info-circle-bold" className="mr-1 text-primary" /> You can customise the rulebook without changing the participant experience.</div>
              </div>
              <div className="p-6">
                <div className="mb-5 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.18em] text-muted dark:text-slate-500">Instrument catalogue</span><span className="text-xs text-muted dark:text-slate-500">{instruments.length} enabled</span></div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {instruments.map((item, index) => (
                    <button key={item.symbol} onClick={() => setActiveInstrument(index)} className={`rounded-xl border p-4 text-left transition ${activeInstrument === index ? "border-primary/50 bg-primary/10 dark:border-primary/50 dark:bg-primary/10" : "border-border bg-midnight_text/[.02] hover:border-primary/25 dark:border-white/10 dark:bg-white/[.02] dark:hover:border-white/25"}`}>
                      <div className="flex items-center justify-between"><span className="text-sm font-semibold text-midnight_text dark:text-white">{item.name}</span><span className="font-mono text-[10px] text-muted dark:text-slate-500">{item.symbol}</span></div>
                      <div className="mt-4 h-14"><Sparkline muted={item.tone === "down"} /></div>
                      <div className="mt-3 text-[11px] text-muted dark:text-slate-500">{item.detail}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-border px-4 py-3 text-xs dark:border-white/10"><span className="text-muted dark:text-slate-400">Selected instrument</span><span className="font-mono text-primary dark:text-primary">{selected.symbol} · {selected.price}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="registration" className="border-b border-border px-4 py-20 md:px-8 md:py-28 dark:border-white/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="02 · Registration" title="Your entire cohort. One upload.">
            Load participant data before the event, validate it in one pass, and give every team a controlled room link. No manual account creation on event day.
          </SectionHeading>
          <div className="mt-14 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <div className="space-y-3">
              {[
                ["COLUMNS", "Team name, username, password, email, roll number"],
                ["VALIDATION", "Duplicates, missing fields, and capacity checked before import"],
                ["ON THE DAY", "Participants sign in through the event link you distribute"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-border bg-white p-5 dark:border-white/10 dark:bg-white/[.025]"><div className="text-[10px] font-bold tracking-[0.18em] text-primary">{label}</div><p className="mt-2 text-sm leading-6 text-muted dark:text-slate-400">{value}</p></div>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-xl dark:border-white/10 dark:bg-[#0c1424]">
              <WindowBar path="admin / participant accounts / teams.csv" />
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 dark:border-white/10"><div><div className="text-sm font-semibold text-midnight_text dark:text-white">teams.csv</div><div className="mt-1 text-xs text-muted dark:text-slate-500">247 rows · 14 KB · ready to upload</div></div><span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary dark:bg-primary/10 dark:text-primary">Validated</span></div>
              <div className="grid grid-cols-[.4fr_1.1fr_1fr] border-b border-border px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-muted dark:border-white/10 dark:text-slate-500"><span>#</span><span>Team name</span><span>Username</span></div>
              <div className="divide-y divide-border px-5 dark:divide-white/5">
                {["Alpha · alpha01", "Market Mavens · mavens02", "Bull Runners · bullrun03", "Capital Crew · capcrew04", "Finomics · finomics05", "Quant Squad · quant247"].map((row, index) => {
                  const parts = row.split(" · ");
                  return <div key={row} className="grid grid-cols-[.4fr_1.1fr_1fr] py-3 text-xs text-midnight_text dark:text-slate-300"><span className="font-mono text-muted dark:text-slate-500">{String(index + 1).padStart(3, "0")}</span><span>{parts[0]}</span><span className="font-mono text-muted dark:text-slate-500">{parts[1]}</span></div>;
                })}
              </div>
              <div className="grid gap-3 border-t border-border p-5 sm:grid-cols-2 dark:border-white/10">
                {["Names and usernames", "Duplicates in file", "Room capacity", "Accounts assigned"].map((label, index) => <div key={label} className="flex items-center gap-2 text-xs text-muted dark:text-slate-400"><Icon icon="solar:check-circle-bold" className="text-primary" /><span>{label}</span><span className="ml-auto font-mono text-primary">{index === 2 ? "247 / 300" : "passed"}</span></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="live-market" className="border-b border-border px-4 py-20 md:px-8 md:py-28 dark:border-white/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="03 · Live market" title="When the bell rings, everyone has a screen to follow.">
            Participants trade inside an isolated event market while organizers control rounds, announcements, and market activity from one live console.
          </SectionHeading>
          <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-white shadow-xl dark:border-white/10 dark:bg-[#0c1424]">
            <WindowBar path="admin / simulation overview / round controls" />
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5 dark:border-white/10">
              <div><div className="text-[10px] uppercase tracking-[0.18em] text-muted dark:text-slate-500">Round 02 · Opening bell</div><div className="mt-2 flex items-center gap-2 text-sm font-semibold"><span className={`h-2 w-2 rounded-full ${marketOpen ? "animate-pulse bg-primary" : "bg-amber-400"}`} /> {marketOpen ? "Market open" : "Pre-open countdown"}</div></div>
              <div className="flex flex-wrap gap-2"><button onClick={() => setMarketOpen(!marketOpen)} className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white dark:bg-primary">{marketOpen ? "Pause market" : "Open market"}</button><button className="rounded-lg border border-border px-4 py-2 text-xs font-bold text-midnight_text hover:border-primary/40 dark:border-white/15 dark:text-white dark:hover:border-white/30">End round</button><button className="rounded-lg border border-border px-4 py-2 text-xs font-bold text-midnight_text hover:border-primary/40 dark:border-white/15 dark:text-white dark:hover:border-white/30">Extend 5:00</button></div>
            </div>
            <div className="grid lg:grid-cols-[1.15fr_.85fr]">
              <div className="border-b border-border p-5 lg:border-b-0 lg:border-r dark:border-white/10">
                <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted dark:text-slate-500"><span>Participant view · Team Alpha</span><span className="text-primary">{marketOpen ? "Live" : "Waiting"}</span></div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-primary/[.04] p-4 dark:bg-white/[.03]"><div className="text-[10px] uppercase tracking-wider text-muted dark:text-slate-500">Available cash</div><div className="mt-2 text-lg font-semibold text-midnight_text dark:text-white">₹7,42,600</div></div>
                  <div className="rounded-xl bg-primary/[.04] p-4 dark:bg-white/[.03]"><div className="text-[10px] uppercase tracking-wider text-muted dark:text-slate-500">Portfolio value</div><div className="mt-2 text-lg font-semibold text-midnight_text dark:text-white">₹10,84,250</div></div>
                  <div className="rounded-xl bg-primary/[.04] p-4 dark:bg-white/[.03]"><div className="text-[10px] uppercase tracking-wider text-muted dark:text-slate-500">Current rank</div><div className="mt-2 text-lg font-semibold text-midnight_text dark:text-white">#12 <span className="text-xs text-primary">↑ 4</span></div></div>
                </div>
                <div className="mt-5 rounded-xl border border-border p-4 dark:border-white/10"><div className="flex items-center justify-between text-xs"><span className="font-semibold text-midnight_text dark:text-white">{selected.name}</span><span className="font-mono text-primary">{selected.price} {selected.move}</span></div><div className="mt-4 h-40"><Sparkline /></div><div className="mt-4 flex gap-2"><button className="flex-1 rounded-lg bg-primary py-2 text-xs font-bold text-white">Buy</button><button className="flex-1 rounded-lg border border-border py-2 text-xs font-bold text-midnight_text dark:border-white/15 dark:text-white">Sell</button></div></div>
              </div>
              <div className="p-5"><div className="mb-5 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.18em] text-muted dark:text-slate-500">Activity log</span><span className="text-[10px] text-primary">● LIVE</span></div><div className="space-y-3">{orders.map(([type, team, order, time]) => <div key={time} className="flex items-center gap-3 border-b border-border pb-3 text-xs dark:border-white/5"><span className={`rounded px-1.5 py-1 font-mono text-[10px] ${type === "BUY" ? "bg-primary/10 text-primary" : "bg-rose-400/10 text-rose-500 dark:text-rose-300"}`}>{type}</span><span className="text-midnight_text/80 dark:text-slate-300">{team}</span><span className="ml-auto font-mono text-muted dark:text-slate-500">{order}</span><span className="font-mono text-[10px] text-muted/70 dark:text-slate-600">{time}</span></div>)}</div><div className="mt-8 text-[10px] uppercase tracking-[0.18em] text-muted dark:text-slate-500">Quick actions</div><div className="mt-3 grid gap-2 sm:grid-cols-2"><button className="rounded-lg border border-border px-3 py-2 text-left text-xs text-muted hover:border-primary/40 dark:border-white/10 dark:text-slate-300 dark:hover:border-primary/40">Push news event</button><button className="rounded-lg border border-border px-3 py-2 text-left text-xs text-muted hover:border-primary/40 dark:border-white/10 dark:text-slate-300 dark:hover:border-primary/40">Adjust price</button><button className="rounded-lg border border-border px-3 py-2 text-left text-xs text-muted hover:border-primary/40 dark:border-white/10 dark:text-slate-300 dark:hover:border-primary/40">Disable instrument</button><button className="rounded-lg border border-border px-3 py-2 text-left text-xs text-muted hover:border-primary/40 dark:border-white/10 dark:text-slate-300 dark:hover:border-primary/40">Edit team cash</button></div></div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Start or pause rounds", "Publish market-moving news", "See every action in one log"].map((item, index) => <div key={item} className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-4 text-sm text-muted dark:border-white/10 dark:bg-white/[.02] dark:text-slate-300"><span className="font-mono text-xs text-primary">0{index + 1}</span>{item}</div>)}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-4 py-20 md:px-8 md:py-28 dark:border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
          <SectionHeading eyebrow="Event identity" title="They enter your competition, not a generic lobby.">
            Use the event name, organizer, sponsor, custom rulebook, and join link across the participant entry screen, market bulletin, leaderboard, and final results.
          </SectionHeading>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#0c1424]">
            <div className="mb-5 flex flex-wrap gap-2">{["Finance Fest '26", "Stock Wars '26", "Market Masters"].map((room) => <button key={room} onClick={() => setSelectedRoom(room)} className={`rounded-full border px-3 py-1.5 text-xs transition ${selectedRoom === room ? "border-primary/50 bg-primary/10 text-primary dark:border-primary/50 dark:bg-primary/10 dark:text-primary" : "border-border text-muted hover:text-primary dark:border-white/10 dark:text-slate-500 dark:hover:text-white"}`}>{room}</button>)}</div>
            <div className="rounded-xl border border-border bg-heroBg p-5 dark:border-white/10 dark:bg-[#101b2d]"><div className="flex items-start justify-between gap-4"><div><div className="text-[10px] uppercase tracking-[0.18em] text-primary">Illustrative branded room</div><h3 className="mt-3 text-2xl font-semibold text-midnight_text dark:text-white">{selectedRoom}</h3><p className="mt-1 text-sm text-muted dark:text-slate-400">Powered by Arthhwise · Presented by Commerce Society</p></div><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon icon="solar:buildings-2-bold" width="24" /></div></div><div className="mt-8 grid gap-3 sm:grid-cols-3"><div className="rounded-lg bg-white p-3 dark:bg-white/[.04]"><div className="text-[10px] uppercase tracking-wider text-muted dark:text-slate-500">Sponsor</div><div className="mt-1 text-xs text-midnight_text dark:text-slate-200">Apex Capital</div></div><div className="rounded-lg bg-white p-3 dark:bg-white/[.04]"><div className="text-[10px] uppercase tracking-wider text-muted dark:text-slate-500">Join link</div><div className="mt-1 font-mono text-xs text-midnight_text dark:text-slate-200">arthhwise.com/join/F26</div></div><div className="rounded-lg bg-white p-3 dark:bg-white/[.04]"><div className="text-[10px] uppercase tracking-wider text-muted dark:text-slate-500">Rules</div><div className="mt-1 text-xs text-midnight_text dark:text-slate-200">Custom rulebook</div></div></div></div>
          </div>
        </div>
      </section>

      <section id="leaderboard" className="border-b border-border px-4 py-20 md:px-8 md:py-28 dark:border-white/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="04 · Score and publish" title="When the market closes, the numbers decide.">
            The leaderboard is continuously marked to market during the event, then locked when you close the final round. Display it on the big screen, inside the app, or in your final report.
          </SectionHeading>
          <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-white shadow-xl dark:border-white/10 dark:bg-[#0c1424]">
            <WindowBar path="admin / realtime leaderboard" />
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5 dark:border-white/10"><div><div className="text-[10px] uppercase tracking-[0.18em] text-muted dark:text-slate-500">Finance Fest '26 · Closing auction</div><div className="mt-2 text-sm font-semibold text-midnight_text dark:text-white">Top 5 of 128 teams</div></div><span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">Live · updates every trade</span></div>
            <div className="overflow-x-auto"><div className="min-w-[620px]"><div className="grid grid-cols-[.25fr_1fr_1fr_.6fr] border-b border-border px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-muted dark:border-white/10 dark:text-slate-500"><span>#</span><span>Team</span><span>Net worth</span><span>Return</span></div>{leaderboard.map(([rank, team, value, returnValue]) => <div key={rank} className="grid grid-cols-[.25fr_1fr_1fr_.6fr] items-center border-b border-border px-5 py-4 text-sm dark:border-white/5"><span className="font-mono text-primary">{rank}</span><span className="font-semibold text-midnight_text dark:text-slate-200">{team}</span><span className="font-mono text-midnight_text/80 dark:text-slate-300">{value}</span><span className="font-mono text-primary">{returnValue}</span></div>)}</div></div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-5 text-xs text-muted dark:text-slate-500"><span>Net worth = cash + holdings + eligible escrow</span><div className="flex gap-2"><button className="rounded-lg border border-border px-3 py-2 text-muted hover:border-primary/40 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/25">Projector view</button><button className="rounded-lg bg-primary px-3 py-2 font-bold text-white">Export results</button></div></div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>Your event, next</Eyebrow>
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-midnight_text dark:text-white md:text-6xl">Ready to host your market event?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted dark:text-slate-400">Tell us your date, format, sponsor requirements, and expected participation. We will help turn the flow above into your competition.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#inquiry-form" className="rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white hover:bg-primary/90">Request event setup <Icon icon="solar:arrow-right-up-linear" className="ml-1 inline" /></a><Link href="/documentation" className="rounded-xl border border-border px-5 py-3.5 text-sm font-bold text-midnight_text hover:border-primary/60 dark:border-white/15 dark:text-white dark:hover:border-primary/60">Read organizer documentation</Link></div>
        </div>
        <div id="inquiry-form" className="mx-auto mt-16 max-w-3xl rounded-3xl bg-white p-1 text-midnight_text shadow-xl dark:bg-darkHeroBg"><InquiryForm /></div>
      </section>
    </main>
  );
}
