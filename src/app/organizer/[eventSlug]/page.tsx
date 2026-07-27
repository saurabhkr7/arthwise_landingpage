"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";

// Environment or default API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";

export default function OrganizerDashboardPage() {
  const params = useParams();
  const eventSlug = params?.eventSlug as string;

  const [passcode, setPasscode] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeError, setPasscodeError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [eventData, setEventData] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  // Trade Audit Modal State
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [tradeLogs, setTradeLogs] = useState<any[]>([]);
  const [loadingTrades, setLoadingTrades] = useState<boolean>(false);

  // V2 Finalization Health & Operations States
  const [finalizationHealth, setFinalizationHealth] = useState<any>(null);
  const [loadingHealth, setLoadingHealth] = useState<boolean>(false);
  const [healthError, setHealthError] = useState<string>("");
  const [retryLoading, setRetryLoading] = useState<boolean>(false);
  const [notifRetryLoading, setNotifRetryLoading] = useState<boolean>(false);

  // Check stored passcode on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(`organizer_passcode_${eventSlug}`);
    if (stored) {
      setPasscode(stored);
      setIsAuthenticated(true);
    }
  }, [eventSlug]);

  const fetchDashboardData = useCallback(async () => {
    if (!eventSlug) return;
    setLoading(true);

    try {
      // 1. Fetch active/specific event data by slug
      const eventRes = await fetch(`${API_BASE_URL}/market-event/slug/${eventSlug}`, {
        headers: { Authorization: `Bearer ${passcode}` },
      });

      if (eventRes.status === 401) {
        sessionStorage.removeItem(`organizer_passcode_${eventSlug}`);
        setIsAuthenticated(false);
        setPasscodeError("Invalid passcode session. Please log in again.");
        setLoading(false);
        return;
      }

      const eventJson = await eventRes.json();

      if (eventJson.success && eventJson.event) {
        setEventData(eventJson.event);

        // 2. Fetch leaderboard data for organizer
        const eventId = eventJson.event.id;
        const lbRes = await fetch(`${API_BASE_URL}/market-event/${eventId}/leaderboard?limit=200`, {
          headers: { Authorization: `Bearer ${passcode}` },
        });

        if (lbRes.status === 401) {
          sessionStorage.removeItem(`organizer_passcode_${eventSlug}`);
          setIsAuthenticated(false);
          setPasscodeError("Invalid passcode session. Please log in again.");
          setLoading(false);
          return;
        }

        const lbJson = await lbRes.json();

        if (lbJson.success) {
          setParticipants(lbJson.leaderboard || []);
        }
        fetchFinalizationHealth(eventId);
      }
    } catch (err) {
      console.error("Error fetching organizer dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, [eventSlug, passcode]);

  const fetchFinalizationHealth = useCallback(async (eventId: string) => {
    setLoadingHealth(true);
    setHealthError("");
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventId}/finalization-health`, {
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      if (json.success) {
        setFinalizationHealth(json.health);
      }
    } catch (err: any) {
      console.error(err);
      setHealthError("Failed to load finalization health.");
    } finally {
      setLoadingHealth(false);
    }
  }, [passcode]);

  const handleRetryFinalization = async () => {
    if (!eventData?.id) return;
    const ok = window.confirm(
      "⚠️ WARNING: You are forcing event finalization. If the event is still running, this will close all positions early, compile final results, and restore/unlock all students' personal portfolios. This action is IRREVERSIBLE. Are you sure you want to proceed?"
    );
    if (!ok) return;

    setRetryLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventData.id}/finalization/retry`, {
        method: "POST",
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      alert(json.message || (json.success ? "Finalization retry queued successfully." : "Could not request finalization retry."));
      fetchFinalizationHealth(eventData.id);
    } catch (err: any) {
      alert("Error triggering finalization retry.");
    } finally {
      setRetryLoading(false);
    }
  };

  const handleRetryNotifications = async () => {
    if (!eventData?.id) return;
    const ok = window.confirm(
      "Are you sure you want to retry sending results push notifications to all participants of this event?"
    );
    if (!ok) return;

    setNotifRetryLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventData.id}/finalization/notifications/retry`, {
        method: "POST",
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      alert(json.message || (json.success ? "Notification retry completed successfully." : "Could not retry notifications."));
      fetchFinalizationHealth(eventData.id);
    } catch (err: any) {
      alert("Error triggering notification retry.");
    } finally {
      setNotifRetryLoading(false);
    }
  };

  // Handle Login / Passcode submit
  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setPasscodeError("Please enter the event passcode.");
      return;
    }

    setLoading(true);
    setPasscodeError("");
    try {
      const eventRes = await fetch(`${API_BASE_URL}/market-event/slug/${eventSlug}`, {
        headers: { Authorization: `Bearer ${passcode.trim()}` },
      });

      if (eventRes.status === 401) {
        setPasscodeError("Incorrect passcode. Access denied.");
        return;
      }

      const eventJson = await eventRes.json();
      if (eventJson.success && eventJson.event) {
        sessionStorage.setItem(`organizer_passcode_${eventSlug}`, passcode.trim());
        setIsAuthenticated(true);
        setEventData(eventJson.event);

        // Load leaderboard next
        const eventId = eventJson.event.id;
        const lbRes = await fetch(`${API_BASE_URL}/market-event/${eventId}/leaderboard?limit=200`, {
          headers: { Authorization: `Bearer ${passcode.trim()}` },
        });
        const lbJson = await lbRes.json();
        if (lbJson.success) {
          setParticipants(lbJson.leaderboard || []);
        }
      } else {
        setPasscodeError(eventJson.message || "Failed to load event.");
      }
    } catch (err) {
      console.error("❌ [OrganizerPortal] Passcode verification fetch error:", err);
      setPasscodeError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, fetchDashboardData]);

  // Auto-refresh interval
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh, fetchDashboardData]);

  // Fetch Trade Audit Log for a student
  const openTradeAudit = async (student: any) => {
    setSelectedStudent(student);
    setLoadingTrades(true);
    try {
      const eventId = eventData?.id;
      const res = await fetch(`${API_BASE_URL}/market-event/${eventId}/trades/${student.userId}`, {
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      if (json.success) {
        setTradeLogs(json.trades || []);
      }
    } catch (err) {
      console.error("Error fetching student trade audit:", err);
    } finally {
      setLoadingTrades(false);
    }
  };

  // CSV Export (fetches secure dataset including email addresses)
  const exportToCSV = async () => {
    try {
      const eventId = eventData?.id;
      if (!eventId) return;

      const res = await fetch(`${API_BASE_URL}/market-event/${eventId}/export`, {
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      if (!json.success || !json.data) return;

      const headers = [
        "Rank",
        "Enrollment Number",
        "Division",
        "Student Name",
        "Email Address",
        "Net Portfolio Valuation (INR)",
        "Return (%)",
        "Win Rate (%)",
        "Total Trades",
      ];

      const rows = json.data.map((p: any) => [
        p.rank,
        `"${p.enrollmentNo}"`,
        `"${p.division}"`,
        `"${p.name}"`,
        `"${p.email}"`,
        p.eventValuation,
        p.returnPercent ? p.returnPercent.toFixed(2) : "0.00",
        p.winRate ? p.winRate.toFixed(1) : "0",
        p.totalTrades || 0,
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((e: any) => e.join(","))].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `BVPIM_Leaderboard_${eventSlug}_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error exporting CSV:", err);
    }
  };

  // Filter participants by search query
  const filteredParticipants = participants.filter((p) => {
    const q = searchQuery.toLowerCase();
    const name = (p.displayName || "").toLowerCase();
    const enroll = (p.customFieldValues?.enrollmentNo || "").toLowerCase();
    const div = (p.customFieldValues?.division || "").toLowerCase();
    return name.includes(q) || enroll.includes(q) || div.includes(q);
  });

  // Passcode Auth View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center p-4 pt-24">
        <div className="bg-[#1E293B] border border-slate-700/60 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
              FACULTY & ORGANIZER PORTAL
            </span>
            <h1 className="text-2xl font-black mt-4 text-white">BVPIM Trading Championship</h1>
            <p className="text-slate-400 text-sm mt-1">Enter your private event passcode to access the live monitoring dashboard.</p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Event Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition"
              />
              {passcodeError && <p className="text-red-400 text-xs mt-2">{passcodeError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold py-3 rounded-xl transition shadow-lg shadow-sky-500/20"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-6 pt-28 md:pt-32 font-sans">
      {/* Top Navigation Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              🟢 LIVE ORGANIZER MONITOR
            </span>
            <span className="text-slate-500 text-sm">• Uka Tarsadia University</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            {eventData?.title || "BVPIM Paper Trading Championship 2026"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 border ${
              autoRefresh
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-slate-800 text-slate-400 border-slate-700"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${autoRefresh ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
            Auto Refresh (15s): {autoRefresh ? "ON" : "OFF"}
          </button>

          <button
            onClick={fetchDashboardData}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-xs font-bold transition border border-slate-700"
          >
            🔄 Refresh Now
          </button>

          <button
            onClick={exportToCSV}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-black transition shadow-md shadow-sky-500/20"
          >
            📊 Export CSV (Excel)
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto mt-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Registered Students</span>
            <p className="text-2xl font-black text-white mt-1">
              {participants.length} / {eventData?.maxParticipants || 150}
            </p>
          </div>

          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Top Return (%)</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">
              +{participants[0]?.returnPercent ? participants[0].returnPercent.toFixed(2) : "0.00"}%
            </p>
          </div>

          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Trades Placed</span>
            <p className="text-2xl font-black text-sky-400 mt-1">
              {participants.reduce((sum, p) => sum + (p.totalTrades || 0), 0)}
            </p>
          </div>

          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Starting Capital</span>
            <p className="text-2xl font-black text-amber-400 mt-1">
              ₹{(eventData?.initialCapital || 1000000).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* V2 Operations Control Center */}
        {finalizationHealth && (
          <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-slate-800/60 mb-4">
              <div>
                <span className="text-[10px] font-black tracking-widest text-sky-400 uppercase bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                  V2 ENGINE OPERATIONS
                </span>
                <h2 className="text-lg font-bold text-white mt-1.5">Finalization lock & lease state</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRetryFinalization}
                  disabled={retryLoading}
                  className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition"
                >
                  {retryLoading ? "Triggering..." : "🔄 Retry Finalization"}
                </button>
                <button
                  onClick={handleRetryNotifications}
                  disabled={notifRetryLoading}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition"
                >
                  {notifRetryLoading ? "Retrying..." : "✉️ Retry Push Notifications"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Engine Status</span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    finalizationHealth.systemStatus === "HEALTHY"
                      ? "bg-emerald-400 animate-pulse"
                      : finalizationHealth.systemStatus === "RETRYING"
                      ? "bg-amber-400 animate-pulse"
                      : "bg-red-500 animate-pulse"
                  }`} />
                  <p className="text-slate-200 font-bold uppercase">{finalizationHealth.systemStatus}</p>
                </div>
              </div>

              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Attempts Count</span>
                <p className="text-slate-200 font-mono font-bold mt-1.5 text-sm">{finalizationHealth.finalizationAttempt}</p>
              </div>

              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60 col-span-1 md:col-span-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Lease Lock Valid Until</span>
                <p className="text-slate-200 mt-1.5 font-mono font-semibold">
                  {finalizationHealth.finalizationLeaseUntil
                    ? new Date(finalizationHealth.finalizationLeaseUntil).toLocaleString("en-IN")
                    : "No active execution lease lock"}
                </p>
              </div>
            </div>

            {finalizationHealth.finalizationError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs font-mono mt-4 overflow-x-auto">
                <strong>Error details:</strong> {finalizationHealth.finalizationError}
              </div>
            )}
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search student by name, enrollment number, or division..."
            className="w-full bg-[#1E293B] border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
          />
        </div>

        {/* Leaderboard Data Table */}
        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {loading && !participants.length ? (
            <div className="p-12 text-center text-slate-400">Loading student rankings...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 text-slate-400 text-xs uppercase font-extrabold border-b border-slate-800">
                    <th className="py-3.5 px-4">Rank</th>
                    <th className="py-3.5 px-4">Enrollment No</th>
                    <th className="py-3.5 px-4">Division</th>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-4 text-right">Portfolio Value</th>
                    <th className="py-3.5 px-4 text-right">Return (%)</th>
                    <th className="py-3.5 px-4 text-right">Win Rate</th>
                    <th className="py-3.5 px-4 text-right">Trades</th>
                    <th className="py-3.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredParticipants.map((student) => {
                    const isGain = (student.returnPercent || 0) >= 0;
                    return (
                      <tr key={student.userId || student.rank} className="hover:bg-slate-800/40 transition">
                        <td className="py-3.5 px-4 font-black">
                          {student.rank === 1 ? "🥇 1" : student.rank === 2 ? "🥈 2" : student.rank === 3 ? "🥉 3" : `#${student.rank}`}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {student.customFieldValues?.enrollmentNo || "N/A"}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">{student.customFieldValues?.division || "BBA"}</td>
                        <td className="py-3.5 px-4 font-bold text-white">{student.displayName}</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-200">
                          ₹{(student.eventValuation || 1000000).toLocaleString("en-IN")}
                        </td>
                        <td className={`py-3.5 px-4 text-right font-mono font-extrabold ${isGain ? "text-emerald-400" : "text-red-400"}`}>
                          {isGain ? "+" : ""}
                          {student.returnPercent ? student.returnPercent.toFixed(2) : "0.00"}%
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                          {student.winRate ? student.winRate.toFixed(0) : 0}%
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-slate-400">{student.totalTrades || 0}</td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => openTradeAudit(student)}
                            className="bg-slate-800 hover:bg-slate-700 text-sky-400 px-3 py-1.5 rounded-lg text-xs font-bold transition border border-slate-700"
                          >
                            Inspect Audit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Trade Audit Log Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-start pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase">TRADE AUDIT INSPECTOR</span>
                <h3 className="text-xl font-black text-white mt-1">{selectedStudent.displayName}</h3>
                <p className="text-slate-400 text-xs">
                  Enrollment: {selectedStudent.customFieldValues?.enrollmentNo || "N/A"} • Division: {selectedStudent.customFieldValues?.division || "BBA"}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto my-4">
              {loadingTrades ? (
                <div className="p-8 text-center text-slate-400">Loading student trade history...</div>
              ) : !tradeLogs.length ? (
                <div className="p-8 text-center text-slate-500">No trades executed by this student yet.</div>
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900/60 text-slate-400 uppercase font-bold border-b border-slate-800">
                      <th className="py-2.5 px-3">Symbol</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3 text-right">Qty</th>
                      <th className="py-2.5 px-3 text-right">Price</th>
                      <th className="py-2.5 px-3 text-right">Total Value</th>
                      <th className="py-2.5 px-3 text-right">P&L</th>
                      <th className="py-2.5 px-3 text-right">Executed At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {tradeLogs.map((trade) => {
                      const isBuy = trade.side === "BUY";
                      const isProfit = (trade.pnl || 0) >= 0;
                      return (
                        <tr key={trade._id} className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3 font-bold text-white">{trade.symbol}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${isBuy ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                              {trade.side}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-200">{trade.quantity}</td>
                          <td className="py-2.5 px-3 text-right text-slate-200">₹{trade.price}</td>
                          <td className="py-2.5 px-3 text-right text-slate-200">₹{trade.totalValue?.toLocaleString("en-IN")}</td>
                          <td className={`py-2.5 px-3 text-right font-bold ${isProfit ? "text-emerald-400" : "text-red-400"}`}>
                            {trade.side === "SELL" ? `₹${trade.pnl?.toFixed(2)}` : "---"}
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-400">
                            {trade.executedAt ? new Date(trade.executedAt).toLocaleTimeString() : "---"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
