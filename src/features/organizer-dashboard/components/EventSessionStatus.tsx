import React from "react";
import MarketSourceBadge, { MarketSourceRecord } from "./MarketSourceBadge";

type Session = MarketSourceRecord & { title: string; startsAt?: string; mode?: string };
type Event = { eventProgramEnabled?: boolean; programSessionPhase?: string;
  activeProgramSession?: Session | null; nextProgramSession?: Session | null };

export default function EventSessionStatus({ event }: { event: Event | null }) {
  if (!event?.eventProgramEnabled || !event.programSessionPhase) return null;
  const active = event.programSessionPhase === "ACTIVE" ? event.activeProgramSession : null;
  const next = event.nextProgramSession;
  const heading = active ? "Trading now" : event.programSessionPhase === "UPCOMING" ? "First session starts soon"
    : event.programSessionPhase === "BETWEEN_SESSIONS" ? "Between sessions · Trading paused" : "Sessions finished";
  const nextDate = next?.startsAt ? new Date(next.startsAt) : null;
  const nextTime = nextDate && Number.isFinite(nextDate.getTime())
    ? nextDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : null;
  return <section aria-label="Current event session" className="rounded-2xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 p-5 mb-6">
    <h2 className="text-sm font-extrabold text-midnight_text dark:text-white">{heading}</h2>
    {active && <><p className="text-sm text-midnight_text dark:text-white mt-1">{active.title}</p>
      <MarketSourceBadge record={{ ...active, marketDataMode: active.mode }} /></>}
    {!active && event.programSessionPhase === "BETWEEN_SESSIONS" && <p className="text-xs text-muted dark:text-white/60 mt-1">Balances and carried positions are preserved.</p>}
    {next && !["ENDED", "COMPLETED"].includes(event.programSessionPhase) && <p className="text-xs text-muted dark:text-white/60 mt-2">Next: {next.title}{nextTime ? ` · ${nextTime} IST` : ""}</p>}
  </section>;
}
