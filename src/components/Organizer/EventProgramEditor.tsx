"use client";

import React, { useState } from "react";

export type EventProgramSessionDraft = {
  key: string;
  title: string;
  sequence: number;
  bookKey: string;
  mode: "LIVE_MARKET" | "SCENARIO_SIMULATION";
  startsAt: string;
  endsAt: string;
  positionPolicy: "CARRY" | "CLOSE_AT_SESSION_END";
  allowedAssetClasses: string[];
  equityUniverse: { mode: "ALL" | "CURATED"; instruments: Array<{ symbol: string; name?: string; sector?: string }> };
  /** Raw editor text; removed before the session draft is sent to the parent/API. */
  equityUniverseText?: string;
  profileData?: Record<string, any>;
  profileFileName?: string;
  simulationProfileId?: string;
};

type Props = {
  onChange: (sessions: EventProgramSessionDraft[], enabled: boolean) => void;
  initialEnabled?: boolean;
  initialSessions?: EventProgramSessionDraft[];
  locked?: boolean;
};

const cardClass = "rounded-2xl border border-grey/20 dark:border-white/10 bg-gray-50 dark:bg-slate-900/60 p-4 space-y-4";
const inputClass = "w-full rounded-xl border border-grey/20 dark:border-white/10 bg-white dark:bg-slate-950 px-3 py-2.5 text-sm text-midnight_text dark:text-white";

const newSession = (sequence: number): EventProgramSessionDraft => ({
  key: `session_${sequence + 1}`,
  title: `Session ${sequence + 1}`,
  sequence,
  bookKey: "LIVE",
  mode: "LIVE_MARKET",
  startsAt: "",
  endsAt: "",
  positionPolicy: "CARRY",
  allowedAssetClasses: ["EQUITY"],
  equityUniverse: { mode: "ALL", instruments: [] },
  equityUniverseText: "",
});

export default function EventProgramEditor({
  onChange,
  initialEnabled = false,
  initialSessions = [],
  locked = false,
}: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [sessions, setSessions] = useState<EventProgramSessionDraft[]>(initialSessions);
  const publish = (next: EventProgramSessionDraft[]) => {
    const ordered = next.map((session, sequence) => ({ ...session, sequence }));
    setSessions(ordered);
    onChange(ordered.map(({ equityUniverseText: _editorText, profileFileName: _fileName, ...session }) => session), enabled);
  };
  const update = (index: number, patch: Partial<EventProgramSessionDraft>) => {
    publish(sessions.map((session, current) => current === index ? { ...session, ...patch } : session));
  };
  const setMode = (index: number, mode: EventProgramSessionDraft["mode"]) => {
    const current = sessions[index];
    const sequence = current.sequence;
    update(index, {
      mode,
      bookKey: mode === "LIVE_MARKET" ? "LIVE" : `SIM_${sequence + 1}`,
      positionPolicy: mode === "LIVE_MARKET" ? "CARRY" : "CLOSE_AT_SESSION_END",
      allowedAssetClasses: ["EQUITY"],
      equityUniverse: mode === "LIVE_MARKET" ? current.equityUniverse : { mode: "CURATED", instruments: [] },
      profileData: undefined,
      profileFileName: undefined,
    });
  };
  const loadProfile = async (index: number, file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!Array.isArray(parsed.instruments) || !parsed.instruments.length || !Number(parsed.durationSeconds)) {
        throw new Error("Profile must include instruments and durationSeconds.");
      }
      update(index, { profileData: parsed, profileFileName: file.name });
    } catch (error: any) {
      window.alert(error.message || "Could not read the simulation profile JSON.");
    }
  };

  return (
    <section className="border-t border-grey/10 dark:border-white/10 pt-6 space-y-4">
      <div className="flex items-start gap-3">
        <input id="multi-session-event" type="checkbox" checked={enabled} disabled={locked} onChange={(event) => {
          setEnabled(event.target.checked);
          if (!event.target.checked) { setSessions([]); onChange([], false); }
          else onChange(sessions, true);
        }} className="mt-1 h-4 w-4 accent-primary" />
        <div>
          <label htmlFor="multi-session-event" className="text-sm font-bold text-midnight_text dark:text-white">Use multiple sessions in one event</label>
          <p className="mt-1 text-xs text-muted dark:text-white/60">
            Participants join once and keep one event account/cash balance. Live and simulated sessions can use separate position books.
          </p>
        </div>
      </div>

      {locked && <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-700 dark:text-amber-300">
        Session settings can only be edited before the event starts. The schedule is locked now to protect active or completed trading sessions.
      </div>}

      {enabled && <div className="space-y-4">
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-xs text-blue-700 dark:text-blue-300">
          Configure sessions in chronological order. Reuse <strong>LIVE</strong> as the book key to carry live positions between live sessions. Simulated sessions close their positions at the session end.
        </div>
        {sessions.map((session, index) => <div key={`${session.key}-${index}`} className={cardClass}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold">Session {index + 1}</h4>
            {!locked && <button type="button" onClick={() => publish(sessions.filter((_, current) => current !== index))} className="text-xs font-semibold text-red-500">Remove</button>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="space-y-1 text-xs font-semibold">Session title
              <input className={inputClass} value={session.title} disabled={locked} onChange={(event) => update(index, { title: event.target.value, key: event.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || `session_${index + 1}` })} />
            </label>
            <label className="space-y-1 text-xs font-semibold">Market data
              <select className={inputClass} value={session.mode} disabled={locked} onChange={(event) => setMode(index, event.target.value as EventProgramSessionDraft["mode"])}>
                <option value="LIVE_MARKET">Live market</option>
                <option value="SCENARIO_SIMULATION">Simulated market</option>
              </select>
            </label>
            <label className="space-y-1 text-xs font-semibold">Starts at
              <input className={inputClass} type="datetime-local" value={session.startsAt} disabled={locked} onChange={(event) => update(index, { startsAt: event.target.value })} />
            </label>
            <label className="space-y-1 text-xs font-semibold">Ends at
              <input className={inputClass} type="datetime-local" value={session.endsAt} disabled={locked} onChange={(event) => update(index, { endsAt: event.target.value })} />
            </label>
            <label className="space-y-1 text-xs font-semibold">Position book key
              <input className={inputClass} value={session.bookKey} disabled={locked} onChange={(event) => update(index, { bookKey: event.target.value.trim().toUpperCase() })} />
            </label>
            <label className="space-y-1 text-xs font-semibold">Position handling at session end
              <select className={inputClass} value={session.positionPolicy} disabled={locked} onChange={(event) => update(index, { positionPolicy: event.target.value as EventProgramSessionDraft["positionPolicy"] })}>
                <option value="CARRY">Carry positions in this book</option>
                <option value="CLOSE_AT_SESSION_END">Close all positions at session end</option>
              </select>
            </label>
          </div>
          {session.mode === "LIVE_MARKET" ? <div>
            <label className="space-y-1 text-xs font-semibold">Live equity universe
              <select className={inputClass} value={session.equityUniverse.mode} disabled={locked} onChange={(event) => update(index, { equityUniverse: { ...session.equityUniverse, mode: event.target.value as "ALL" | "CURATED" } })}>
                <option value="ALL">All NSE equities</option>
                <option value="CURATED">Selected stocks only</option>
              </select>
            </label>
            {session.equityUniverse.mode === "CURATED" && <textarea
              disabled={locked}
              className={`${inputClass} mt-3`} rows={4} placeholder="HDFCBANK, TCS, ITC"
              value={session.equityUniverseText ?? session.equityUniverse.instruments.map((item) => item.symbol).join(", ")}
              onChange={(event) => {
                const text = event.target.value;
                const instruments = text.split(/[\s,;]+/).map((symbol) => symbol.trim().toUpperCase()).filter(Boolean).map((symbol) => ({ symbol }));
                update(index, {
                  equityUniverseText: text,
                  equityUniverse: { mode: "CURATED", instruments },
                });
              }}
            />}
            {session.equityUniverse.mode === "CURATED" && <p className="mt-1 text-xs text-muted dark:text-white/60">Separate stock symbols with spaces, commas, or new lines.</p>}
          </div> : <div>
            {locked ? <p className="text-xs text-muted dark:text-white/60">Attached simulation profile: {session.simulationProfileId || "profile linked"}</p> : <>
              <label className="block text-xs font-semibold">Scenario profile JSON
                <input className={`${inputClass} mt-2`} type="file" accept="application/json,.json" onChange={(event) => loadProfile(index, event.target.files?.[0])} />
              </label>
              {session.profileData && <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">Loaded {session.profileFileName}: {session.profileData.instruments.length} instruments · {session.profileData.durationSeconds}s</p>}
            </>}
          </div>}
        </div>)}
        {!locked && <button type="button" onClick={() => publish([...sessions, newSession(sessions.length)])} className="rounded-xl border border-primary/30 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/5">
          + Add session
        </button>}
        {!locked && sessions.length < 2 && <p className="text-xs text-amber-600">Add at least two sessions to enable a multi-session event.</p>}
      </div>}
    </section>
  );
}
