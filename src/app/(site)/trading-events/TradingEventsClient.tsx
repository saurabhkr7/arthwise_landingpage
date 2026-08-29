"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.arthwise";

interface TradingEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: "LIVE" | "UPCOMING" | "COMPLETED";
  sponsorName: string;
  sponsorLogoUrl: string;
  bannerImageUrl: string;
  initialCapital: number;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  allowedAssetClasses: string[];
  isPrivate: boolean;
  participantCount: number;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "TBD";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const cfg = {
    LIVE: { label: "🔴 LIVE", classes: "bg-green-500/20 text-green-400 border-green-500/30" },
    UPCOMING: { label: "⏳ UPCOMING", classes: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
    COMPLETED: { label: "✅ COMPLETED", classes: "bg-slate-600/40 text-slate-300 border-slate-500/30" },
  }[status] ?? { label: status, classes: "bg-grey/10 text-muted border-grey/20" };
  return (
    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}

function AssetTag({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
      enabled
        ? "bg-primary/10 text-primary"
        : "bg-grey/10 dark:bg-white/5 text-muted dark:text-white/30 line-through"
    }`}>
      {enabled ? "☑" : "☐"} {label}
    </span>
  );
}

function EventCard({ event }: { event: TradingEvent }) {
  const isCompleted = event.status === "COMPLETED";
  const isUpcoming = event.status === "UPCOMING";

  const hasEquity = event.allowedAssetClasses.includes("EQUITY");
  const hasFno = event.allowedAssetClasses.includes("FNO");
  const hasCrypto = event.allowedAssetClasses.includes("CRYPTO");
  const hasCommodity = event.allowedAssetClasses.includes("COMMODITY");

  return (
    <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-xl hover:border-primary/40 hover:shadow-2xl transition-all duration-300 group">
      
      {/* Banner Header */}
      <div className="h-40 bg-slate-900 relative overflow-hidden">
        {event.bannerImageUrl ? (
          <img
            src={event.bannerImageUrl}
            alt={event.title}
            className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-primary/20 to-slate-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        
        {/* Sponsor logo overlay */}
        {event.sponsorLogoUrl && (
          <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden flex items-center justify-center p-1">
            <img src={event.sponsorLogoUrl} alt={event.sponsorName} className="w-full h-full object-contain" />
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="flex-1 min-w-0 pr-2">
            <StatusBadge status={event.status} />
            <h2 className="text-base font-bold text-white mt-1.5 leading-tight line-clamp-2">{event.title}</h2>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-grow space-y-4">
        
        {/* Organiser */}
        <div className="flex items-center gap-2">
          <Icon icon="solar:buildings-bold" width="14" height="14" className="text-muted dark:text-white/40 shrink-0" />
          <span className="text-xs text-muted dark:text-white/60 truncate">{event.sponsorName || "Arthhwise"}</span>
        </div>

        {/* Date row */}
        <div className="flex items-center gap-2 py-2.5 px-3 rounded-xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10">
          <Icon icon="solar:calendar-bold" width="16" height="16" className="text-primary shrink-0" />
          <div className="text-xs">
            <span className="text-muted dark:text-white/50 font-semibold block text-[10px] uppercase tracking-wide">Duration</span>
            <span className="font-bold text-midnight_text dark:text-white">
              {formatDate(event.startTime)} – {formatDate(event.endTime)}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10">
            <span className="text-muted dark:text-white/50 font-semibold block text-[10px] uppercase tracking-wide mb-0.5">Starting Capital</span>
            <span className="font-extrabold text-midnight_text dark:text-white text-sm">
              ₹{(event.initialCapital || 1000000).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-heroBg dark:bg-darkmode border border-grey/10 dark:border-white/10">
            <span className="text-muted dark:text-white/50 font-semibold block text-[10px] uppercase tracking-wide mb-0.5">Participants</span>
            <span className="font-extrabold text-midnight_text dark:text-white text-sm">
              {event.participantCount}
              <span className="text-muted dark:text-white/40 font-normal"> / {event.maxParticipants}</span>
            </span>
          </div>
        </div>

        {/* Markets */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted dark:text-white/40 block mb-1.5">Markets</span>
          <div className="flex flex-wrap gap-1.5">
            <AssetTag label="NSE" enabled={true} />
            <AssetTag label="BSE" enabled={true} />
          </div>
        </div>

        {/* Trading instruments */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted dark:text-white/40 block mb-1.5">Trading</span>
          <div className="flex flex-wrap gap-1.5">
            <AssetTag label="Equity" enabled={hasEquity} />
            <AssetTag label="Intraday" enabled={hasEquity} />
            <AssetTag label="Delivery" enabled={hasEquity} />
            <AssetTag label="F&O" enabled={hasFno} />
            <AssetTag label="Crypto" enabled={hasCrypto} />
            <AssetTag label="Commodities" enabled={hasCommodity} />
          </div>
        </div>

        {/* Competition + Entry row */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-grey/10 dark:border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-muted dark:text-white/60">
            <Icon icon="solar:cup-star-bold" width="12" height="12" className="text-amber-400" />
            <span>Highest Return Wins</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted dark:text-white/60">
            <Icon icon={event.isPrivate ? "solar:lock-bold" : "solar:global-bold"} width="12" height="12" className="text-primary" />
            <span>{event.isPrivate ? "Private Event" : "Open to All"}</span>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-4 border-t border-grey/10 dark:border-white/10 bg-heroBg dark:bg-slate-900/40">
        {isCompleted ? (
          <Link
            href="/host-event#inquiry-form"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-primary/30 hover:bg-primary/5 text-primary text-xs font-bold transition-all"
          >
            <Icon icon="solar:add-circle-bold" width="16" height="16" />
            Create New Championship
          </Link>
        ) : (
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md ${
              isUpcoming
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/20"
                : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
            }`}
          >
            <Icon icon="logos:google-play-icon" width="14" height="14" />
            {isUpcoming ? "Join Event on App" : "Trade Now — Download App"}
          </a>
        )}
      </div>
    </div>
  );
}

export default function TradingEventsClient() {
  const [events, setEvents] = useState<TradingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "LIVE" | "UPCOMING" | "COMPLETED">("ALL");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/market-event/public/listing`, {
          next: { revalidate: 60 },
        } as RequestInit);
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || "Failed to load events.");
        setEvents(json.events || []);
      } catch (err: any) {
        setError(err.message || "Could not load events.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = activeFilter === "ALL" ? events : events.filter((e) => e.status === activeFilter);

  const counts = {
    ALL: events.length,
    LIVE: events.filter((e) => e.status === "LIVE").length,
    UPCOMING: events.filter((e) => e.status === "UPCOMING").length,
    COMPLETED: events.filter((e) => e.status === "COMPLETED").length,
  };

  return (
    <div className="min-h-screen bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
      <div className="pt-24" />

      {/* Hero */}
      <section className="pt-10 pb-12 text-center">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-4">
            <Icon icon="solar:cup-star-bold" width="16" height="16" />
            Live &amp; Upcoming Events
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-midnight_text dark:text-white leading-tight mb-4">
            Paper Trading <span className="text-primary">Championships</span>
          </h1>
          <p className="text-base md:text-lg text-muted dark:text-white/80 max-w-2xl mx-auto mb-8">
            Compete with real NSE &amp; BSE market data using ₹10 Lakh virtual money. Zero real money. Pure skill.
            Download the app and join any event below.
          </p>

          {/* Host CTA */}
          <div className="inline-flex items-center gap-2 p-1 pr-4 rounded-2xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 shadow-lg">
            <span className="bg-primary/10 text-primary rounded-xl p-2">
              <Icon icon="solar:buildings-bold" width="18" height="18" />
            </span>
            <span className="text-sm text-muted dark:text-white/70">Want to run your own event?</span>
            <Link href="/host-event" className="text-sm font-bold text-primary hover:underline">
              Host a Championship →
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {(["ALL", "LIVE", "UPCOMING", "COMPLETED"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeFilter === f
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-white dark:bg-darkHeroBg text-muted dark:text-white/60 border-grey/10 dark:border-white/10 hover:border-primary/30"
              }`}
            >
              {f === "ALL" ? "All Events" : f === "LIVE" ? "🔴 Live" : f === "UPCOMING" ? "⏳ Upcoming" : "✅ Completed"}
              <span className="ml-2 opacity-70">({counts[f]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <section className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <Icon icon="line-md:loading-twotone-loop" width="48" height="48" className="text-primary" />
            <p className="text-muted dark:text-white/70 font-medium text-sm">Loading championships...</p>
          </div>
        ) : error ? (
          <div className="max-w-lg mx-auto py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 flex items-center justify-center mx-auto mb-4">
              <Icon icon="solar:danger-triangle-bold" width="28" height="28" />
            </div>
            <h3 className="text-lg font-bold mb-2">Could not load events</h3>
            <p className="text-sm text-muted dark:text-white/60 mb-6">{error}</p>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm"
            >
              <Icon icon="logos:google-play-icon" width="16" height="16" />
              Download Arthhwise App
            </a>
          </div>
        ) : filtered.length === 0 ? (
          <div className="max-w-lg mx-auto py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <Icon icon="solar:cup-star-bold" width="28" height="28" />
            </div>
            <h3 className="text-xl font-bold mb-2">No {activeFilter !== "ALL" ? activeFilter.toLowerCase() + " " : ""}events right now</h3>
            <p className="text-sm text-muted dark:text-white/60 mb-6">
              {activeFilter === "COMPLETED"
                ? "No events have ended yet."
                : "Be the first — host a championship for your college or team."}
            </p>
            <Link
              href="/host-event#inquiry-form"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm"
            >
              <Icon icon="solar:add-circle-bold" width="16" height="16" />
              Host an Event — Free
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Bottom CTA Bar */}
        {!loading && !error && events.length > 0 && (
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-slate-900 via-primary/30 to-slate-900 p-8 border border-primary/20 text-white text-center shadow-2xl">
            <h2 className="text-xl md:text-2xl font-extrabold mb-3">
              Want to host your own championship?
            </h2>
            <p className="text-white/70 text-sm mb-6 max-w-xl mx-auto">
              Set up a private event for your college, Finance Club, or corporate team in under 24 hours.
              Completely free for educational institutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/organize-college-trading-contest"
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <Icon icon="solar:diploma-bold" width="16" height="16" />
                College Events
              </Link>
              <Link
                href="/corporate-stock-leagues"
                className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-sm transition-all flex items-center gap-2"
              >
                <Icon icon="solar:buildings-bold" width="16" height="16" />
                Corporate Leagues
              </Link>
              <Link
                href="/organizer-toolkit"
                className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-sm transition-all flex items-center gap-2"
              >
                <Icon icon="solar:folder-with-files-bold" width="16" height="16" />
                Free Toolkit
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
