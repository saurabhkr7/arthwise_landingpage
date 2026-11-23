import React from "react";

export type MarketSourceRecord = {
  marketDataMode?: string | null;
  marketContextLabel?: string | null;
  programSessionTitle?: string | null;
  autoSettled?: boolean;
};

export default function MarketSourceBadge({ record }: { record: MarketSourceRecord }) {
  if (!record.marketContextLabel) return null; // Older servers must not be guessed as live.
  const simulated = record.marketDataMode === "SCENARIO_SIMULATION";
  const known = simulated || record.marketDataMode === "LIVE_MARKET";
  const color = !known ? "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300"
    : simulated ? "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-200"
      : "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200";
  return <span className="inline-flex flex-wrap items-center gap-1.5 mt-1 font-sans">
    <span title={record.programSessionTitle || undefined} className={`rounded px-2 py-0.5 text-[10px] font-bold ${color}`}>
      {record.marketContextLabel}
    </span>
    {record.autoSettled && <span className="text-[10px] text-muted dark:text-white/60">Auto-settled</span>}
  </span>;
}
