"use client";

import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";

export default function EventStockUniversePanel({ event, token, onUpdated }: {
  event: any; token: string; onUpdated: () => void;
}) {
  const [symbol, setSymbol] = useState("");
  const [sector, setSector] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  if (event?.eventMode === "SCENARIO_SIMULATION" || event?.equityUniverse?.mode !== "CURATED") return null;
  const instruments = event.equityUniverse.instruments || [];
  const canAdd = ["UPCOMING", "LIVE"].includes(event.status) && Date.now() < Date.parse(event.endTime);
  const addStock = async () => {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/market-event/${event.id || event._id}/equity-universe/stocks`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ symbol: symbol.trim().toUpperCase(), sector: sector.trim() || "EQUITY" }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Could not add stock.");
      setSymbol(""); setSector(""); setMessage("Stock added. Participants will see it on their next market refresh."); onUpdated();
    } catch (error: any) { setMessage(error.message || "Could not add stock."); }
    finally { setSaving(false); }
  };
  return <section className="rounded-2xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 p-5 mb-6">
    <h2 className="font-extrabold text-sm text-midnight_text dark:text-white">Event stocks · Live market</h2>
    <p className="text-xs text-muted dark:text-white/60 mt-1">{instruments.length} permitted stocks. You can add stocks while this event is live. Existing stocks remain available.</p>
    <div className="flex flex-wrap gap-2 mt-3">{instruments.map((item: any) => <span key={item.symbol} className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">{item.symbol}</span>)}</div>
    {canAdd && <form onSubmit={(e) => { e.preventDefault(); addStock(); }} className="flex flex-wrap gap-2 mt-4">
      <input aria-label="NSE stock symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="NSE symbol, e.g. ITC" required maxLength={40} className="rounded-xl border border-grey/20 dark:border-white/10 bg-gray-50 dark:bg-slate-900 px-3 py-2 text-xs text-midnight_text dark:text-white" />
      <input aria-label="Stock sector" value={sector} onChange={(e) => setSector(e.target.value)} placeholder="Sector (optional)" maxLength={60} className="rounded-xl border border-grey/20 dark:border-white/10 bg-gray-50 dark:bg-slate-900 px-3 py-2 text-xs text-midnight_text dark:text-white" />
      <button disabled={saving || instruments.length >= 100} className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white disabled:opacity-50">{saving ? "Validating…" : "Add stock"}</button>
    </form>}
    {message && <p role="status" className="text-xs mt-3 text-midnight_text dark:text-white">{message}</p>}
  </section>;
}
