"use client";

import React, { useEffect, useState } from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Icon } from "@iconify/react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";

interface MarketEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: "LIVE" | "UPCOMING" | "COMPLETED";
  sponsorName: string;
  sponsorLogoUrl?: string;
  bannerImageUrl?: string;
  initialCapital: number;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  participantCount: number;
}

// Static mock fallback in case DB is empty or during static compilation
const fallbackEvents: MarketEvent[] = [
  {
    id: "demo1",
    title: "National Paper Trading Championship 2026",
    slug: "national-championship-2026",
    description: "The ultimate national simulated trading tournament for college students across India. Practice equity and F&O trading live.",
    status: "COMPLETED",
    sponsorName: "National Finance Association",
    initialCapital: 1000000,
    startTime: "2026-07-15T09:15:00.000Z",
    endTime: "2026-07-18T15:30:00.000Z",
    maxParticipants: 500,
    participantCount: 412,
  },
  {
    id: "demo2",
    title: "Inter-College Stock Pitch Fest",
    slug: "inter-college-fest-2026",
    description: "Lobby contest for stock pitching and derivatives virtual execution. Organized for financial literacy month.",
    status: "COMPLETED",
    sponsorName: "Department of Management Studies",
    initialCapital: 500000,
    startTime: "2026-08-01T09:15:00.000Z",
    endTime: "2026-08-03T15:30:00.000Z",
    maxParticipants: 300,
    participantCount: 284,
  }
];

export default function ChampionshipsListingPage() {
  const [events, setEvents] = useState<MarketEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/market-event/public/listing`);
        const json = await res.json();
        if (json.success && json.events && json.events.length > 0) {
          setEvents(json.events);
        } else {
          setEvents(fallbackEvents);
        }
      } catch (err) {
        console.error("Error fetching public event list:", err);
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const liveEvents = events.filter((e) => e.status === "LIVE");
  const upcomingEvents = events.filter((e) => e.status === "UPCOMING");
  const completedEvents = events.filter((e) => e.status === "COMPLETED");

  const breadcrumbs = [
    { href: "/", text: "Home" },
    { href: "/championships", text: "Championship Lobbies" },
  ];

  return (
    <>
      <HeroSub
        title="Trading Lobbies & Championships"
        description="Browse live stock league lobbies, register for upcoming college contests, or check the results of finalized championships."
        breadcrumbLinks={breadcrumbs}
      />

      <section className="py-16 bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white transition-colors duration-300">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">

          {/* Section 1: LIVE Lobbies */}
          {liveEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                Live Championships & Active Lobbies
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Section 2: UPCOMING Lobbies */}
          {upcomingEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-2">
                <Icon icon="solar:clock-circle-bold" className="text-primary" />
                Upcoming Lobbies & Registrations Open
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Section 3: COMPLETED / Hall of Fame */}
          <div>
            <div className="max-w-3xl mb-8">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <Icon icon="solar:cup-star-bold" width="14" height="14" />
                CHAMPIONSHIP HALL OF FAME
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold mt-3 mb-2">
                Finalized Lobbies & Historical Results
              </h2>
              <p className="text-sm text-muted dark:text-white/70">
                Browse final leaderboards and trading statistics from completed inter-college fests, corporate leagues, and national competitions.
              </p>
            </div>

            {completedEvents.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl p-8 max-w-md mx-auto">
                <Icon icon="solar:cup-outline" width="48" height="48" className="text-amber-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg">No completed events yet</h3>
                <p className="text-xs text-muted dark:text-white/60 mt-1">
                  Once active student paper trading lobbies complete, their final results and certificates will reside here.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

const EventCard: React.FC<{ event: MarketEvent }> = ({ event }) => {
  const isCompleted = event.status === "COMPLETED";
  const isLive = event.status === "LIVE";

  return (
    <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-primary/30 transition-all duration-300">
      
      {/* Banner */}
      <div className="h-32 bg-slate-900 relative overflow-hidden">
        {event.bannerImageUrl ? (
          <img src={event.bannerImageUrl} alt={event.title} className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-900 to-slate-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${
            isLive
              ? "bg-green-500/20 text-green-400 border-green-500/30"
              : isCompleted
              ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
              : "bg-primary/20 text-primary border-primary/30"
          }`}>
            {event.status}
          </span>
          <h3 className="text-base font-bold text-white mt-1.5 truncate leading-tight">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-5 space-y-4 flex-grow text-xs text-muted dark:text-white/70">
        <p className="line-clamp-2 leading-relaxed">{event.description}</p>
        
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-grey/10 dark:border-white/10">
          <div>
            <span className="block font-semibold text-[10px] text-gray-400 uppercase">Organizer</span>
            <span className="font-bold text-midnight_text dark:text-white truncate block">{event.sponsorName}</span>
          </div>
          <div>
            <span className="block font-semibold text-[10px] text-gray-400 uppercase">Traders</span>
            <span className="font-bold text-midnight_text dark:text-white block">{event.participantCount} / {event.maxParticipants}</span>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-4 bg-gray-50 dark:bg-slate-900/60 border-t border-grey/10 dark:border-white/10">
        {isCompleted ? (
          <div className="w-full text-center py-2 text-xs font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center gap-1.5">
            <Icon icon="solar:cup-star-bold" width="16" height="16" />
            <span>Leaderboard Finalized</span>
          </div>
        ) : (
          <Link
            href="https://play.google.com/store/apps/details?id=com.arthwise"
            target="_blank"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-xl text-center text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-primary/10"
          >
            <Icon icon="solar:login-bold" width="14" height="14" />
            <span>Join League in App</span>
          </Link>
        )}
      </div>

    </div>
  );
};
