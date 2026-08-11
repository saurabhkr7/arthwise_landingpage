"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";

export default function EventOrganizerControlPanel() {
  const params = useParams();
  const router = useRouter();
  const eventSlug = params ? (params.eventSlug as string) : "";

  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [eventData, setEventData] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [finalizationHealth, setFinalizationHealth] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);
  const [notifRetryLoading, setNotifRetryLoading] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Selected student for detailed Trade History Audit Modal
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [tradeLogs, setTradeLogs] = useState<any[]>([]);
  const [loadingTrades, setLoadingTrades] = useState(false);

  // Allowed asset classes quick-edit state
  const [allowedEdit, setAllowedEdit] = useState<string[]>([]);
  const [assetSaving, setAssetSaving] = useState(false);
  const [assetSaveMsg, setAssetSaveMsg] = useState("");

  // Auto-fill passcode from dashboard session if available
  useEffect(() => {
    const storedPasscode = sessionStorage.getItem(`organizer_passcode_${eventSlug}`);
    if (storedPasscode) {
      setPasscode(storedPasscode);
    }
  }, [eventSlug]);

  const fetchFinalizationHealth = useCallback(async (eventId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventId}/finalization/health`, {
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      if (json.success) {
        setFinalizationHealth(json.data);
      }
    } catch (err) {
      console.error("Error fetching finalization health:", err);
    }
  }, [passcode]);

  // Fetch event details and real-time leaderboard rankings
  const fetchDashboardData = useCallback(async () => {
    if (!passcode) return;
    try {
      const eventRes = await fetch(`${API_BASE_URL}/market-event/slug/${eventSlug}`, {
        headers: { Authorization: `Bearer ${passcode}` },
      });

      if (eventRes.status === 401) {
        setIsAuthenticated(false);
        setPasscodeError("Passcode session expired or invalid. Please re-enter.");
        return;
      }

      const eventJson = await eventRes.json();
      if (eventJson.success && eventJson.event) {
        setEventData(eventJson.event);
        setAllowedEdit(eventJson.event.allowedAssetClasses || ["EQUITY"]);
        setIsAuthenticated(true);

        const eventId = eventJson.event.id;
        const lbRes = await fetch(`${API_BASE_URL}/market-event/${eventId}/leaderboard?limit=200`, {
          headers: { Authorization: `Bearer ${passcode}` },
        });
        const lbJson = await lbRes.json();
        if (lbJson.success) {
          setParticipants(lbJson.leaderboard || []);
        }

        fetchFinalizationHealth(eventId);
      }
    } catch (err) {
      console.error("❌ Error fetching organizer dashboard data:", err);
    }
  }, [eventSlug, passcode, fetchFinalizationHealth]);

  // Retry V2 Finalization Execution
  const handleRetryFinalization = async () => {
    if (!eventData?.id) return;
    const ok = confirm("Are you sure you want to retry finalization for this event?");
    if (!ok) return;

    setRetryLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventData.id}/finalization/retry`, {
        method: "POST",
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      alert(json.message || (json.success ? "Finalization triggered successfully." : "Failed to retry finalization."));
      fetchFinalizationHealth(eventData.id);
    } catch (err: any) {
      alert("Error triggering finalization retry.");
    } finally {
      setRetryLoading(false);
    }
  };

  // Retry Push Notifications Dispatch
  const handleRetryNotifications = async () => {
    if (!eventData?.id) return;
    const ok = confirm("Are you sure you want to retry sending results push notifications?");
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
        setAllowedEdit(eventJson.event.allowedAssetClasses || ["EQUITY"]);

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
      console.error("❌ Passcode verification error:", err);
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

  // CSV Export
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
      link.setAttribute("download", `Event_Leaderboard_${eventSlug}_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error exporting CSV:", err);
    }
  };

  // Update allowed asset classes on the live event
  const handleUpdateAssetClasses = async () => {
    if (!eventData?.id || allowedEdit.length === 0) return;
    setAssetSaving(true);
    setAssetSaveMsg("");
    try {
      const orgToken = sessionStorage.getItem("organizer_token");
      const res = await fetch(`${API_BASE_URL}/market-event/organizer/${eventData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${orgToken}`,
        },
        body: JSON.stringify({ allowedAssetClasses: allowedEdit }),
      });
      const json = await res.json();
      if (json.success) {
        setEventData((prev: any) => ({ ...prev, allowedAssetClasses: allowedEdit }));
        setAssetSaveMsg("✅ Asset classes updated. Students can now place orders for enabled classes.");
      } else {
        setAssetSaveMsg(`❌ ${json.message || "Update failed."}`);
      }
    } catch (err) {
      setAssetSaveMsg("❌ Network error. Try again.");
    } finally {
      setAssetSaving(false);
      setTimeout(() => setAssetSaveMsg(""), 5000);
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
      <div className="min-h-screen bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white flex items-center justify-center p-4 pt-28 font-sans transition-colors duration-300">
        <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <Icon icon="solar:lock-keyhole-bold" width="14" height="14" />
              EVENT PASSCODE VERIFICATION
            </span>
            <h1 className="text-2xl font-extrabold mt-4 text-midnight_text dark:text-white">Paper Trading Championship</h1>
            <p className="text-muted dark:text-white/70 text-sm mt-1">Enter your private event passcode to access the live monitoring dashboard.</p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-2">Event Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-midnight_text dark:text-white focus:outline-none focus:border-primary transition"
              />
              {passcodeError && <p className="text-red-500 text-xs mt-2">{passcodeError}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-primary/25 active:scale-[0.98] disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Icon icon="line-md:loading-twotone-loop" width="18" height="18" />
                  Verifying Passcode...
                </span>
              ) : (
                "Access Event Dashboard"
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-grey/10 dark:border-white/10 text-center">
            <button
              onClick={() => router.push("/organizer/dashboard")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              ← Back to Organizer Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white p-6 pt-28 font-sans transition-colors duration-300">
      {/* Top Navigation Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-grey/10 dark:border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs font-extrabold tracking-widest text-green-500 uppercase bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              LIVE ORGANIZER MONITOR
            </span>
            <span className="text-muted dark:text-white/60 text-xs font-medium">• {eventData?.sponsorName || "Event Sponsor"}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-midnight_text dark:text-white mt-1">
            {eventData?.title || "Paper Trading Championship 2026"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${autoRefresh
                ? "bg-green-500/10 text-green-500 border-green-500/30"
                : "bg-gray-100 dark:bg-white/10 text-muted dark:text-white/60 border-grey/10 dark:border-white/10"
              }`}
          >
            <span className={`w-2 h-2 rounded-full ${autoRefresh ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
            Auto Refresh (15s): {autoRefresh ? "ON" : "OFF"}
          </button>

          <button
            onClick={fetchDashboardData}
            className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-midnight_text dark:text-white px-4 py-2 rounded-xl text-xs font-bold transition border border-grey/10 dark:border-white/10 flex items-center gap-1.5"
          >
            <Icon icon="solar:restart-bold" width="14" height="14" />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportToCSV}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-primary/20 flex items-center gap-1.5"
          >
            <Icon icon="solar:file-download-bold" width="14" height="14" />
            <span>Export CSV (Excel)</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto mt-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-bold text-muted dark:text-white/60 uppercase">Registered Students</span>
            <p className="text-2xl font-extrabold text-midnight_text dark:text-white mt-1">
              {participants.length} / {eventData?.maxParticipants || 150}
            </p>
          </div>

          <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-bold text-muted dark:text-white/60 uppercase">Top Return (%)</span>
            <p className="text-2xl font-extrabold text-green-500 mt-1">
              +{participants[0]?.returnPercent ? participants[0].returnPercent.toFixed(2) : "0.00"}%
            </p>
          </div>

          <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-bold text-muted dark:text-white/60 uppercase">Total Trades Placed</span>
            <p className="text-2xl font-extrabold text-primary mt-1">
              {participants.reduce((sum, p) => sum + (p.totalTrades || 0), 0)}
            </p>
          </div>

          <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-bold text-muted dark:text-white/60 uppercase">Starting Capital</span>
            <p className="text-2xl font-extrabold text-amber-500 mt-1">
              ₹{(eventData?.initialCapital || 1000000).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Allowed Asset Classes Quick-Edit */}
        <div className="bg-white dark:bg-darkHeroBg border border-amber-500/20 rounded-2xl p-5 shadow-xl mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">⚡ Allowed Trading Instruments</span>
              <p className="text-xs text-muted dark:text-white/60 mt-0.5">Enable or disable asset classes for students in this live event.</p>
            </div>
            <div className="flex items-center gap-4">
              {["EQUITY", "FNO", "CRYPTO"].map((asset) => (
                <label key={asset} className="flex items-center gap-2 text-xs font-bold text-midnight_text dark:text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowedEdit.includes(asset)}
                    onChange={(e) => {
                      if (e.target.checked) setAllowedEdit((prev) => [...prev, asset]);
                      else setAllowedEdit((prev) => prev.filter((a) => a !== asset));
                    }}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                  {asset}
                </label>
              ))}
              <button
                onClick={handleUpdateAssetClasses}
                disabled={assetSaving || allowedEdit.length === 0}
                className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-xl text-xs font-extrabold transition disabled:opacity-50"
              >
                {assetSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
          {assetSaveMsg && <p className="text-xs mt-3 font-semibold">{assetSaveMsg}</p>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search student by name, enrollment number, or division..."
            className="w-full bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-2xl px-4 py-3 text.midnight_text dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition text-sm shadow-md"
          />
        </div>

        {/* Leaderboard Data Table */}
        <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {loading && !participants.length ? (
            <div className="p-12 text-center text-muted dark:text-white/60">Loading student rankings...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-900/80 text-muted dark:text-white/70 text-xs uppercase font-extrabold border-b border-grey/10 dark:border-white/10">
                    <th className="py-4 px-4">Rank</th>
                    <th className="py-4 px-4">Enrollment No</th>
                    <th className="py-4 px-4">Division</th>
                    <th className="py-4 px-4">Student Name</th>
                    <th className="py-4 px-4 text-right">Portfolio Value</th>
                    <th className="py-4 px-4 text-right">Return (%)</th>
                    <th className="py-4 px-4 text-right">Win Rate</th>
                    <th className="py-4 px-4 text-right">Trades</th>
                    <th className="py-4 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey/10 dark:divide-white/10 text-sm">
                  {filteredParticipants.map((student) => {
                    const isGain = (student.returnPercent || 0) >= 0;
                    return (
                      <tr key={student.userId || student.rank} className="hover:bg-gray-50 dark:hover:bg-white/5 transition">
                        <td className="py-3.5 px-4 font-black text-midnight_text dark:text-white">
                          {student.rank === 1 ? "🥇 1" : student.rank === 2 ? "🥈 2" : student.rank === 3 ? "🥉 3" : `#${student.rank}`}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-muted dark:text-white/80">
                          {student.customFieldValues?.enrollmentNo || "N/A"}
                        </td>
                        <td className="py-3.5 px-4 text-muted dark:text-white/70">{student.customFieldValues?.division || ""}</td>
                        <td className="py-3.5 px-4 font-bold text-midnight_text dark:text-white">{student.displayName}</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-midnight_text dark:text-white">
                          ₹{(student.eventValuation || 1000000).toLocaleString("en-IN")}
                        </td>
                        <td className={`py-3.5 px-4 text-right font-mono font-extrabold ${isGain ? "text-green-500" : "text-red-500"}`}>
                          {isGain ? "+" : ""}
                          {student.returnPercent ? student.returnPercent.toFixed(2) : "0.00"}%
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-muted dark:text-white/80">
                          {student.winRate ? student.winRate.toFixed(0) : 0}%
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-muted dark:text-white/70">{student.totalTrades || 0}</td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => openTradeAudit(student)}
                            className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-xl text-xs font-bold transition border border-primary/20"
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

      {/* Trade Audit Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl p-6 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-grey/10 dark:border-white/10">
              <div>
                <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-md">
                  STUDENT TRADE AUDIT
                </span>
                <h3 className="text-xl font-bold text-midnight_text dark:text-white mt-1">
                  {selectedStudent.displayName} ({selectedStudent.customFieldValues?.enrollmentNo || "N/A"})
                </h3>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-midnight_text dark:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-grow my-4">
              {loadingTrades ? (
                <div className="p-8 text-center text-muted dark:text-white/60">Loading student trade history...</div>
              ) : !tradeLogs.length ? (
                <div className="p-8 text-center text-muted dark:text-white/50">No trades executed by this student yet.</div>
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-900 text-muted dark:text-white/70 uppercase font-bold border-b border-grey/10 dark:border-white/10">
                      <th className="py-2.5 px-3">Symbol</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3 text-right">Qty</th>
                      <th className="py-2.5 px-3 text-right">Price</th>
                      <th className="py-2.5 px-3 text-right">Total Value</th>
                      <th className="py-2.5 px-3 text-right">P&L</th>
                      <th className="py-2.5 px-3 text-right">Executed At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grey/10 dark:divide-white/10 font-mono">
                    {tradeLogs.map((trade) => {
                      const isBuy = trade.side === "BUY";
                      const isProfit = (trade.pnl || 0) >= 0;
                      return (
                        <tr key={trade._id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="py-2.5 px-3 font-bold text-midnight_text dark:text-white">{trade.symbol}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${isBuy ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                              {trade.side}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right text-midnight_text dark:text-white">{trade.quantity}</td>
                          <td className="py-2.5 px-3 text-right text-midnight_text dark:text-white">₹{trade.price}</td>
                          <td className="py-2.5 px-3 text-right text-midnight_text dark:text-white">₹{trade.totalValue?.toLocaleString("en-IN")}</td>
                          <td className={`py-2.5 px-3 text-right font-bold ${isProfit ? "text-green-500" : "text-red-500"}`}>
                            {trade.side === "SELL" ? `₹${trade.pnl?.toFixed(2)}` : "---"}
                          </td>
                          <td className="py-2.5 px-3 text-right text-muted dark:text-white/60">
                            {trade.executedAt ? new Date(trade.executedAt).toLocaleTimeString() : "---"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <div className="pt-3 border-t border-grey/10 dark:border-white/10 text-right">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-midnight_text dark:text-white px-5 py-2 rounded-xl text-xs font-bold transition"
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
