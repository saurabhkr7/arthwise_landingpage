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
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [announcementSending, setAnnouncementSending] = useState(false);
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [announcementTargetUserIds, setAnnouncementTargetUserIds] = useState<string[] | null>(null);
  const [announcementTargetLabel, setAnnouncementTargetLabel] = useState<string>("");
  const [announcementRetryId, setAnnouncementRetryId] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [certificateLoading, setCertificateLoading] = useState(false);
  const [certificateMessage, setCertificateMessage] = useState("");
  const [groupByField, setGroupByField] = useState("");
  const [groupAnalytics, setGroupAnalytics] = useState<any[]>([]);
  const [groupLoading, setGroupLoading] = useState(false);

  // ── Leaderboard Table Pagination State ──
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // ── Compliance Filter Scripts State ──
  const [complianceScripts, setComplianceScripts] = useState<any[]>([]);
  const [selectedScriptId, setSelectedScriptId] = useState<string>("");
  const [scriptScanData, setScriptScanData] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [filterTab, setFilterTab] = useState<"VIOLATING" | "COMPLIANT" | "ALL">("VIOLATING");
  const [selectedViolatorIds, setSelectedViolatorIds] = useState<string[]>([]);
  const [eliminationModalOpen, setEliminationModalOpen] = useState(false);
  const [eliminationReason, setEliminationReason] = useState("");
  const [eliminating, setEliminating] = useState(false);
  const [complianceMessage, setComplianceMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [infoModalScript, setInfoModalScript] = useState<any | null>(null);
  const [symbolSearchQuery, setSymbolSearchQuery] = useState("");
  const [copiedSymbols, setCopiedSymbols] = useState(false);

  // 10-Minute Cooldown live countdown ticker
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const timer = setInterval(() => {
      setCooldownRemaining((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownRemaining]);

  const formatCooldown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const ANNOUNCEMENT_TITLE_LIMIT = 80;
  const ANNOUNCEMENT_DESCRIPTION_LIMIT = 500;

  const fetchGroupAnalytics = useCallback(async (eventId: string, fieldKey: string) => {
    if (!fieldKey) { setGroupAnalytics([]); return; }
    setGroupLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventId}/group-analytics?field=${encodeURIComponent(fieldKey)}`, {
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      if (res.ok && json.success) setGroupAnalytics(json.groups || []);
      else setGroupAnalytics([]);
    } finally {
      setGroupLoading(false);
    }
  }, [passcode]);

  const fetchCertificates = useCallback(async (eventId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventId}/certificates`, {
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      if (res.ok && json.success) setCertificates(json.certificates || []);
      else if (json.code !== "CERTIFICATES_NOT_READY") setCertificateMessage(json.message || "Could not load certificates.");
    } catch (err) {
      setCertificateMessage("Network error while loading certificates.");
    }
  }, [passcode]);

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

  const fetchComplianceScripts = useCallback(async (eventId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventId}/compliance/scripts`, {
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        const scripts = json.scripts || [];
        setComplianceScripts(scripts);
        if (scripts.length > 0) {
          setSelectedScriptId((prev) => {
            const exists = scripts.some((s: any) => s.scriptId === prev);
            return exists ? prev : scripts[0].scriptId;
          });
          const activeScript = scripts.find((s: any) => s.scriptId === (selectedScriptId || scripts[0].scriptId)) || scripts[0];
          if (activeScript && activeScript.cooldownRemainingSeconds > 0) {
            setCooldownRemaining(activeScript.cooldownRemainingSeconds);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching compliance scripts:", err);
    }
  }, [passcode, selectedScriptId]);

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
        if (groupByField) fetchGroupAnalytics(eventId, groupByField);

        fetchFinalizationHealth(eventId);
        fetchCertificates(eventId);
        fetchComplianceScripts(eventId);
        const announcementRes = await fetch(`${API_BASE_URL}/market-event/${eventId}/announcements?limit=10`, {
          headers: { Authorization: `Bearer ${passcode}` },
        });
        const announcementJson = await announcementRes.json();
        if (announcementJson.success) setAnnouncements(announcementJson.data || []);
      }
    } catch (err) {
      console.error("❌ Error fetching organizer dashboard data:", err);
    }
  }, [eventSlug, passcode, fetchFinalizationHealth, fetchCertificates, groupByField, fetchGroupAnalytics, fetchComplianceScripts]);

  const removeParticipant = async (student: any) => {
    if (!eventData?.id || !student?.userId) return;
    if (!confirm(`Remove ${student.displayName || "this participant"} from the event? Their audit history will be retained.`)) return;
    const res = await fetch(`${API_BASE_URL}/market-event/${eventData.id}/participants/${student.userId}/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${passcode}` },
      body: JSON.stringify({ reason: "REMOVED_BY_ORGANIZER" }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) alert(json.message || "Could not remove participant.");
    else {
      fetchDashboardData();
      if (selectedScriptId) fetchComplianceScripts(eventData.id);
    }
  };

  // ── Compliance Script Handlers ──
  const handleRunComplianceScan = async (scriptId: string, force = false) => {
    if (!eventData?.id || !scriptId) return;
    setScanning(true);
    setComplianceMessage(null);
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventData.id}/compliance/scripts/${scriptId}/run${force ? "?force=true" : ""}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setScriptScanData(json);
        setCooldownRemaining(json.cooldownRemainingSeconds || 600);
        setComplianceMessage({
          type: "success",
          text: `Scan complete: ${json.violatingCount} violator${json.violatingCount === 1 ? "" : "s"} flagged out of ${json.totalEvaluated} participants.`,
        });
        setSelectedViolatorIds([]);
        fetchComplianceScripts(eventData.id);
      } else if (res.status === 429) {
        setCooldownRemaining(json.cooldownRemainingSeconds || 60);
        setComplianceMessage({
          type: "info",
          text: `Cooldown active. Next scan available in ${formatCooldown(json.cooldownRemainingSeconds || 60)}.`,
        });
      } else {
        setComplianceMessage({
          type: "error",
          text: json.message || "Failed to execute compliance scan.",
        });
      }
    } catch (err) {
      setComplianceMessage({
        type: "error",
        text: "Network error while running compliance scan.",
      });
    } finally {
      setScanning(false);
    }
  };


  const handleBulkEliminate = async () => {
    if (!eventData?.id || selectedViolatorIds.length === 0) return;
    setEliminating(true);
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventData.id}/compliance/bulk-remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${passcode}`,
        },
        body: JSON.stringify({
          scriptId: selectedScriptId,
          userIds: selectedViolatorIds,
          reason: eliminationReason || "Violated NIFTY 50 trading rules.",
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setComplianceMessage({
          type: "success",
          text: `Successfully disqualified and removed ${json.removedCount} participant${json.removedCount === 1 ? "" : "s"}.`,
        });
        setEliminationModalOpen(false);
        setSelectedViolatorIds([]);
        setEliminationReason("");
        await handleRunComplianceScan(selectedScriptId, true);
        fetchDashboardData();
      } else {
        alert(json.message || "Could not eliminate selected participants.");
      }
    } catch (err) {
      alert("Network error while eliminating participants.");
    } finally {
      setEliminating(false);
    }
  };

  const handleGenerateCertificates = async () => {
    if (!eventData?.id || eventData.status !== "COMPLETED") return;
    setCertificateLoading(true);
    setCertificateMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventData.id}/certificates/generate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setCertificateMessage(json.message || "Could not generate certificates.");
        return;
      }
      setCertificateMessage(`Certificates ready: ${json.stats?.generated || 0} generated, ${json.stats?.existing || 0} already issued.`);
      await fetchCertificates(eventData.id);
    } catch (err) {
      setCertificateMessage("Network error while generating certificates.");
    } finally {
      setCertificateLoading(false);
    }
  };

  const openWarningModalForViolators = (
    userIds: string[],
    targetLabel: string,
    script?: any
  ) => {
    if (!userIds || userIds.length === 0) return;
    setAnnouncementTargetUserIds(userIds);
    setAnnouncementTargetLabel(targetLabel);

    const scriptKey = script?.scriptKey || script?.key;
    if (scriptKey === "MAX_25_PERCENT_SINGLE_STOCK") {
      setAnnouncementTitle("Portfolio Limit Warning: Max 25% Single Stock");
      setAnnouncementDescription(
        "Notice: You have exceeded the 25% single-stock allocation limit (₹2,50,000 max per stock). Please reduce your holding to within the permitted limit before 10:00 AM on the next trading day to avoid disqualification."
      );
    } else if (scriptKey === "MAX_20_TRADES_PER_DAY") {
      setAnnouncementTitle("Trading Limit Warning: Max 20 Trades/Day");
      setAnnouncementDescription(
        "Notice: You have exceeded the daily ceiling of 20 trades for today. Further trades today may lead to immediate disqualification. Please manage your positions accordingly."
      );
    } else {
      setAnnouncementTitle(`Rule Violation Notice: ${script?.title || "Trading Rules"}`);
      setAnnouncementDescription(
        `Notice: An audit flagged non-compliance with the competition rules (${script?.title || "Trading Policy"}). Please align your trades and open positions immediately to avoid disqualification.`
      );
    }
    setAnnouncementMessage("");
    setAnnouncementModalOpen(true);
  };

  const handleSendAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventData?.id) return;
    if (!announcementTitle.trim() || !announcementDescription.trim()) {
      setAnnouncementMessage("Please enter both a title and a description.");
      return;
    }

    setAnnouncementSending(true);
    setAnnouncementMessage("");
    try {
      const payload: any = {
        title: announcementTitle.trim(),
        description: announcementDescription.trim(),
      };
      if (announcementTargetUserIds && announcementTargetUserIds.length > 0) {
        payload.targetUserIds = announcementTargetUserIds;
      }

      const res = await fetch(`${API_BASE_URL}/market-event/${eventData.id}/announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${passcode}`,
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setAnnouncementMessage(json.message || "Could not queue the announcement.");
        return;
      }
      setAnnouncementMessage(
        announcementTargetUserIds && announcementTargetUserIds.length > 0
          ? `Warning queued for ${json.data?.queuedCount || 0} targeted violator(s). ${json.data?.skippedCount || 0} have no push token.`
          : `Queued for ${json.data?.queuedCount || 0} participants. ${json.data?.skippedCount || 0} have no push token.`
      );
      setAnnouncementTitle("");
      setAnnouncementDescription("");
      setAnnouncementTargetUserIds(null);
      setAnnouncementTargetLabel("");
      setAnnouncementModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      setAnnouncementMessage("Network error while sending the announcement.");
    } finally {
      setAnnouncementSending(false);
    }
  };

  const handleRetryAnnouncement = async (announcementId: string) => {
    if (!eventData?.id) return;
    setAnnouncementRetryId(announcementId);
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${eventData.id}/announcements/${announcementId}/retry`, {
        method: "POST",
        headers: { Authorization: `Bearer ${passcode}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) alert(json.message || "Could not retry this announcement.");
      else fetchDashboardData();
    } catch (err) {
      alert("Network error while retrying the announcement.");
    } finally {
      setAnnouncementRetryId(null);
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

      const customFieldColumns = (eventData?.customVerificationFields || []).filter((field: any) =>
        participants.some((participant: any) => String(participant.customFieldValues?.[field.fieldKey] || '').trim())
      );
      const headers = [
        "Rank",
        ...customFieldColumns.map((field: any) => field.fieldLabel || field.fieldKey),
        "Student Name",
        "Email Address",
        "Open Holdings",
        "Net Portfolio Valuation (INR)",
        "Return (%)",
        "Win Rate (%)",
        "Total Trades",
      ];

      const rows = json.data.map((p: any) => [
        p.rank,
        ...customFieldColumns.map((field: any) => `"${p.customFieldValues?.[field.fieldKey] || ""}"`),
        `"${p.name}"`,
        `"${p.email}"`,
        p.openHoldingsCount || 0,
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
    const customValues = Object.values(p.customFieldValues || {}).join(" ").toLowerCase();
    return name.includes(q) || customValues.includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filteredParticipants.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredParticipants.length);
  const paginatedParticipants = filteredParticipants.slice(startIndex, endIndex);

  const visibleCustomFields = (eventData?.customVerificationFields || []).filter((field: any) =>
    participants.some((participant: any) => String(participant.customFieldValues?.[field.fieldKey] || '').trim())
  );

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

          <button
            onClick={() => {
              setAnnouncementTargetUserIds(null);
              setAnnouncementTargetLabel("");
              setAnnouncementTitle("");
              setAnnouncementDescription("");
              setAnnouncementMessage("");
              setAnnouncementModalOpen(true);
            }}
            disabled={!['UPCOMING', 'LIVE'].includes(eventData?.status)}
            className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-amber-500/20 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon icon="solar:bell-bing-bold" width="14" height="14" />
            <span>Notify Participants</span>
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

        {/* Event Finalization & Automated Settlement Control */}
        <section className="bg-white dark:bg-darkHeroBg border border-emerald-500/20 rounded-2xl p-5 shadow-xl mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">⚙️ Competition Settlement & Status</span>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${eventData?.status === "COMPLETED"
                    ? "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400"
                    : eventData?.status === "FINALIZATION_BLOCKED" || finalizationHealth?.systemStatus === "NEEDS_ATTENTION"
                      ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 animate-pulse"
                      : eventData?.status === "FINALIZATION_RETRYING"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400"
                  }`}>
                  {eventData?.status === "COMPLETED"
                    ? "✅ Event Completed"
                    : eventData?.status === "FINALIZATION_BLOCKED"
                      ? "⚠️ Finalization Blocked"
                      : eventData?.status === "FINALIZATION_RETRYING"
                        ? "🔄 Finalization Retrying"
                        : eventData?.status === "LIVE"
                          ? "🟢 Live Session Active"
                          : eventData?.status || "Upcoming"}
                </span>
              </div>
              <p className="text-xs text-muted dark:text-white/60 mt-1">
                {eventData?.status === "COMPLETED"
                  ? "All portfolio positions are liquidated, final rankings are locked, and certificates are generated."
                  : finalizationHealth?.systemStatus === "NEEDS_ATTENTION"
                  ? "The scheduled event time has passed, but finalization was halted. Use the reconciliation action on the organizer dashboard event card to retry settlement."
                    : "Automatic settlement will execute at event closing time. All active stock positions will be settled at closing prices."}
              </p>
              {finalizationHealth && (
                <div className="flex flex-wrap gap-4 mt-3 text-[11px] font-semibold text-muted dark:text-white/70">
                  <span>Accounts Settled: <strong className="text-midnight_text dark:text-white">{finalizationHealth.completedAccounts || 0} / {finalizationHealth.accounts || 0}</strong></span>
                  <span>Pending Orders: <strong className="text-midnight_text dark:text-white">{finalizationHealth.openOrders || 0}</strong></span>
                  {finalizationHealth.failedNotifications > 0 && (
                    <span className="text-red-500">Failed Notifications: <strong>{finalizationHealth.failedNotifications}</strong></span>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {finalizationHealth?.failedNotifications > 0 && (
                <button
                  onClick={handleRetryNotifications}
                  disabled={notifRetryLoading}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition disabled:opacity-50"
                >
                  {notifRetryLoading ? "Sending..." : "🔔 Retry Notifications"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Certificate generation and downloads */}
        <section className="bg-white dark:bg-darkHeroBg border border-primary/20 rounded-2xl p-5 shadow-xl mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">🏆 Certificates</span>
              <p className="text-xs text-muted dark:text-white/60 mt-1">
                Generate immutable PDFs after final rankings are completed. Participants can verify and print them publicly.
              </p>
            </div>
            <button
              onClick={handleGenerateCertificates}
              disabled={certificateLoading || eventData?.status !== "COMPLETED"}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {certificateLoading ? "Generating PDFs..." : eventData?.status === "COMPLETED" ? "Generate / Refresh Certificates" : `Available after completion (${eventData?.status || "..."})`}
            </button>
          </div>
          {certificateMessage && <p className="text-xs mt-3 font-semibold text-primary">{certificateMessage}</p>}
          {eventData?.status === "COMPLETED" && certificates.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded-xl border border-grey/10 dark:border-white/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-slate-900 text-muted dark:text-white/70 uppercase font-bold">
                  <tr>
                    <th className="px-3 py-2.5">Rank</th>
                    <th className="px-3 py-2.5">Participant</th>
                    <th className="px-3 py-2.5">Type</th>
                    <th className="px-3 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey/10 dark:divide-white/10">
                  {certificates.map((certificate) => (
                    <tr key={certificate.certificateId}>
                      <td className="px-3 py-2.5 font-bold">#{certificate.rank}</td>
                      <td className="px-3 py-2.5 font-semibold">{certificate.userName}</td>
                      <td className="px-3 py-2.5 text-muted dark:text-white/60">{certificate.certificateType}</td>
                      <td className="px-3 py-2.5 text-right space-x-3">
                        <a className="text-primary font-bold hover:underline" href={certificate.verificationUrl} target="_blank" rel="noreferrer">View</a>
                        {certificate.downloadUrl ? <a className="text-primary font-bold hover:underline" href={certificate.downloadUrl} download>Download PDF</a> : <span className="text-muted">PDF pending</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : eventData?.status === "COMPLETED" ? (
            <p className="text-xs mt-4 text-muted dark:text-white/60">No certificates generated yet.</p>
          ) : null}
        </section>

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

        {/* Event announcement history */}
        {announcements.length > 0 && (
          <div className="bg-white dark:bg-darkHeroBg border border-primary/20 rounded-2xl p-5 shadow-xl mb-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">📣 Participant Announcements</span>
                <p className="text-xs text-muted dark:text-white/60 mt-0.5">Delivery status for messages sent to this event only.</p>
              </div>
              <button
                onClick={() => {
                  setAnnouncementTargetUserIds(null);
                  setAnnouncementTargetLabel("");
                  setAnnouncementTitle("");
                  setAnnouncementDescription("");
                  setAnnouncementMessage("");
                  setAnnouncementModalOpen(true);
                }}
                className="text-xs font-bold text-primary hover:underline"
              >
                Send another
              </button>
            </div>
            <div className="space-y-2">
              {announcements.map((announcement) => (
                <div key={announcement._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-gray-50 dark:bg-white/5 px-3 py-2.5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold truncate">{announcement.title}</p>
                      {announcement.targetUserIds && announcement.targetUserIds.length > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                          ⚠️ Targeted ({announcement.targetUserIds.length})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted dark:text-white/60 truncate">{announcement.description}</p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] whitespace-nowrap">
                    <span className={`font-extrabold ${announcement.status === "FAILED" || announcement.status === "PARTIAL" ? "text-amber-500" : "text-green-500"}`}>{announcement.status}</span>
                    <span className="text-muted dark:text-white/60">✓ {announcement.sentCount || 0} · ⏭ {announcement.skippedCount || 0} · ✕ {announcement.failedCount || 0}</span>
                    {(announcement.status === "FAILED" || announcement.status === "PARTIAL") && (
                      <button
                        onClick={() => handleRetryAnnouncement(announcement._id)}
                        disabled={announcementRetryId === announcement._id}
                        className="text-primary font-bold hover:underline disabled:opacity-50"
                      >
                        {announcementRetryId === announcement._id ? "Retrying..." : "Retry"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Banner Message if active */}
        {complianceMessage && (
          <div
            className={`mb-6 p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm font-semibold transition ${complianceMessage.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
                : complianceMessage.type === "error"
                  ? "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                  : "bg-primary/10 border-primary/30 text-primary"
              }`}
          >
            <div className="flex items-center gap-2">
              <Icon
                icon={
                  complianceMessage.type === "success"
                    ? "solar:check-circle-bold"
                    : complianceMessage.type === "error"
                      ? "solar:danger-triangle-bold"
                      : "solar:info-circle-bold"
                }
                width="20"
                height="20"
              />
              <span>{complianceMessage.text}</span>
            </div>
            <button
              onClick={() => setComplianceMessage(null)}
              className="text-xs font-bold opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Compliance & Trading Rule Audits Section ── */}
        <section className="bg-white dark:bg-darkHeroBg border border-primary/20 rounded-3xl p-6 shadow-xl mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-grey/10 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1.5">
                  <Icon icon="solar:shield-check-bold" width="14" height="14" />
                  Compliance & Trading Rule Audits
                </span>
                {complianceScripts.length > 0 && (
                  <span className="text-xs text-muted dark:text-white/60 font-semibold">
                    • {complianceScripts.length} Active Filter{complianceScripts.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-extrabold text-midnight_text dark:text-white mt-2">
                Real-Time Contest Rule Compliance
              </h2>
              <p className="text-xs text-muted dark:text-white/60 mt-0.5">
                Automatically audit participants against competition restrictions and eliminate rule violators with one click.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-muted dark:text-white/50 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-grey/10 dark:border-white/10 flex items-center gap-1.5">
                <Icon icon="solar:lock-bold" width="13" height="13" />
                <span>Managed by Event Administrator</span>
              </span>
            </div>
          </div>

          {complianceScripts.length === 0 ? (
            <div className="py-10 text-center bg-gray-50/50 dark:bg-white/[0.02] rounded-2xl border border-dashed border-grey/20 dark:border-white/10 my-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 text-muted dark:text-white/60 flex items-center justify-center mx-auto mb-3">
                <Icon icon="solar:shield-check-bold" width="24" height="24" />
              </div>
              <h3 className="text-sm font-bold text-midnight_text dark:text-white">No Compliance Filters Attached</h3>
              <p className="text-xs text-muted dark:text-white/60 max-w-md mx-auto mt-1">
                No compliance or trading rule filter scripts are currently configured for this event by the administrator. Contact your competition administrator if rule auditing is required.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-5">
              {/* Script Selector Tabs if multiple scripts */}
              {complianceScripts.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {complianceScripts.map((s) => {
                    const isSelected = s.scriptId === selectedScriptId;
                    return (
                      <button
                        key={s.scriptId}
                        onClick={() => {
                          setSelectedScriptId(s.scriptId);
                          setScriptScanData(null);
                          setSelectedViolatorIds([]);
                          if (s.cooldownRemainingSeconds > 0) setCooldownRemaining(s.cooldownRemainingSeconds);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border ${isSelected
                            ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                            : "bg-gray-100 dark:bg-white/5 text-midnight_text dark:text-white/70 border-grey/10 hover:bg-gray-200"
                          }`}
                      >
                        <span>{s.title}</span>
                        {s.lastResultSummary?.violatingCount > 0 && (
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${isSelected ? "bg-white text-primary" : "bg-red-500 text-white"
                              }`}
                          >
                            {s.lastResultSummary.violatingCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Active Script Details & Controls Card */}
              {(() => {
                const activeScript =
                  complianceScripts.find((s) => s.scriptId === selectedScriptId) || complianceScripts[0];
                if (!activeScript) return null;

                const summary = scriptScanData || {
                  totalEvaluated: activeScript.lastResultSummary?.totalEvaluated || participants.length,
                  compliantCount: activeScript.lastResultSummary?.compliantCount || 0,
                  violatingCount: activeScript.lastResultSummary?.violatingCount || 0,
                  summary: activeScript.lastEvaluatedAt
                    ? `${activeScript.lastResultSummary?.violatingCount || 0} violator(s) flagged at ${new Date(activeScript.lastEvaluatedAt).toLocaleTimeString()}`
                    : "Not evaluated yet. Click 'Run Filter Scan' to audit participants.",
                  evaluatedAt: activeScript.lastEvaluatedAt,
                  violatingParticipants: [],
                  compliantParticipants: [],
                };

                const violatingList = scriptScanData?.violatingParticipants || [];
                const compliantList = scriptScanData?.compliantParticipants || [];
                const allList = [...violatingList, ...compliantList];

                const displayedParticipants =
                  filterTab === "VIOLATING"
                    ? violatingList
                    : filterTab === "COMPLIANT"
                      ? compliantList
                      : allList;

                const isAllSelected =
                  violatingList.length > 0 &&
                  violatingList.every((v: any) => selectedViolatorIds.includes(String(v.userId)));

                return (
                  <div>
                    {/* Active Script Top Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-grey/10 dark:border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-extrabold text-midnight_text dark:text-white">
                            {activeScript.title}
                          </h3>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                            {activeScript.scriptKey}
                          </span>
                        </div>
                        <p className="text-xs text-muted dark:text-white/60 mt-1 max-w-2xl">
                          {activeScript.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2.5 self-start lg:self-center">
                        {/* 10-Minute Cooldown Run Scan Button */}
                        <button
                          onClick={() => handleRunComplianceScan(activeScript.scriptId)}
                          disabled={scanning || cooldownRemaining > 0}
                          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 shadow-md ${cooldownRemaining > 0
                              ? "bg-gray-200 dark:bg-white/10 text-muted dark:text-white/40 cursor-not-allowed border border-grey/20 dark:border-white/10"
                              : "bg-primary hover:bg-primary/90 text-white shadow-primary/25 active:scale-[0.98]"
                            }`}
                        >
                          {scanning ? (
                            <>
                              <Icon icon="line-md:loading-twotone-loop" width="16" height="16" />
                              <span>Scanning Orders...</span>
                            </>
                          ) : cooldownRemaining > 0 ? (
                            <>
                              <Icon icon="solar:clock-circle-bold" width="16" height="16" />
                              <span>Next scan in {formatCooldown(cooldownRemaining)}</span>
                            </>
                          ) : (
                            <>
                              <Icon icon="solar:play-bold" width="16" height="16" />
                              <span>Run Filter Scan</span>
                            </>
                          )}
                        </button>

                        {/* Filter Scope & Timing Tooltip / Info Modal Trigger */}
                        <button
                          type="button"
                          onClick={() => {
                            setInfoModalScript(activeScript);
                            setSymbolSearchQuery("");
                            setCopiedSymbols(false);
                          }}
                          className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-midnight_text dark:text-white transition border border-grey/10 dark:border-white/10 flex items-center justify-center shadow-xs"
                          title="Filter Scope, Schedule & Approved Stocks"
                        >
                          <Icon icon="solar:info-circle-bold" width="18" height="18" className="text-primary" />
                        </button>
                      </div>
                    </div>

                    {/* Metric Cards Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                      <div className="bg-gray-50 dark:bg-slate-900/40 border border-grey/10 dark:border-white/10 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-muted dark:text-white/60 uppercase">Participants Scanned</span>
                          <p className="text-xl font-black text-midnight_text dark:text-white mt-0.5">
                            {summary.totalEvaluated}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-white/10 text-muted dark:text-white/80 flex items-center justify-center">
                          <Icon icon="solar:users-group-two-rounded-bold" width="20" height="20" />
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-slate-900/40 border border-green-500/20 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-green-600 dark:text-green-400 uppercase">Compliant</span>
                          <p className="text-xl font-black text-green-500 mt-0.5">
                            {summary.compliantCount}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                          <Icon icon="solar:shield-check-bold" width="20" height="20" />
                        </div>
                      </div>

                      <div className={`bg-gray-50 dark:bg-slate-900/40 border rounded-2xl p-4 flex items-center justify-between ${summary.violatingCount > 0 ? "border-red-500/30 bg-red-500/5" : "border-grey/10 dark:border-white/10"
                        }`}>
                        <div>
                          <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase">Flagged Violations</span>
                          <p className={`text-xl font-black mt-0.5 ${summary.violatingCount > 0 ? "text-red-500" : "text-muted"}`}>
                            {summary.violatingCount}
                          </p>
                        </div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${summary.violatingCount > 0 ? "bg-red-500/10 text-red-500 animate-pulse" : "bg-gray-200 dark:bg-white/10 text-muted"
                          }`}>
                          <Icon icon="solar:danger-triangle-bold" width="20" height="20" />
                        </div>
                      </div>
                    </div>

                    {/* Scan Status line */}
                    {activeScript.lastEvaluatedAt && (
                      <p className="text-[11px] text-muted dark:text-white/50 mt-2 flex items-center gap-1.5">
                        <Icon icon="solar:clock-circle-linear" width="13" height="13" />
                        <span>Last evaluated: {new Date(activeScript.lastEvaluatedAt).toLocaleTimeString()} ({new Date(activeScript.lastEvaluatedAt).toLocaleDateString()})</span>
                      </p>
                    )}

                    {/* Filter Tabs & Bulk Actions Bar */}
                    {scriptScanData && (
                      <div className="mt-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-grey/10 dark:border-white/10">
                          {/* Tabs */}
                          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-900 p-1 rounded-xl w-fit">
                            <button
                              onClick={() => setFilterTab("VIOLATING")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${filterTab === "VIOLATING"
                                  ? "bg-red-500 text-white shadow"
                                  : "text-muted dark:text-white/60 hover:text-midnight_text"
                                }`}
                            >
                              <span>🔴 Violations</span>
                              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                                {violatingList.length}
                              </span>
                            </button>

                            <button
                              onClick={() => setFilterTab("COMPLIANT")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${filterTab === "COMPLIANT"
                                  ? "bg-green-600 text-white shadow"
                                  : "text-muted dark:text-white/60 hover:text-midnight_text"
                                }`}
                            >
                              <span>🟢 Compliant</span>
                              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                                {compliantList.length}
                              </span>
                            </button>

                            <button
                              onClick={() => setFilterTab("ALL")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${filterTab === "ALL"
                                  ? "bg-primary text-white shadow"
                                  : "text-muted dark:text-white/60 hover:text-midnight_text"
                                }`}
                            >
                              <span>All ({allList.length})</span>
                            </button>
                          </div>

                          {/* Bulk Actions Button when Violating tab active */}
                          {filterTab === "VIOLATING" && violatingList.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                              {/* Notify All Violators button */}
                              <button
                                onClick={() =>
                                  openWarningModalForViolators(
                                    violatingList.map((p: any) => String(p.userId)),
                                    `All ${violatingList.length} Violator${violatingList.length > 1 ? "s" : ""}`,
                                    activeScript
                                  )
                                }
                                className="bg-amber-500 hover:bg-amber-400 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition shadow-md shadow-amber-500/20 flex items-center gap-1.5 active:scale-[0.98]"
                              >
                                <Icon icon="solar:bell-bing-bold" width="14" height="14" />
                                <span>Notify All Violators ({violatingList.length})</span>
                              </button>

                              {/* Notify Selected Violators button */}
                              {selectedViolatorIds.length > 0 && (
                                <button
                                  onClick={() =>
                                    openWarningModalForViolators(
                                      selectedViolatorIds,
                                      `${selectedViolatorIds.length} Selected Violator${selectedViolatorIds.length > 1 ? "s" : ""}`,
                                      activeScript
                                    )
                                  }
                                  className="bg-amber-600 hover:bg-amber-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition shadow-md shadow-amber-600/20 flex items-center gap-1.5 active:scale-[0.98]"
                                >
                                  <Icon icon="solar:bell-bold" width="14" height="14" />
                                  <span>Notify Selected ({selectedViolatorIds.length})</span>
                                </button>
                              )}

                              {selectedViolatorIds.length > 0 && (
                                <button
                                  onClick={() => {
                                    setEliminationReason(`Violated ${activeScript.title}.`);
                                    setEliminationModalOpen(true);
                                  }}
                                  className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition shadow-md shadow-red-500/20 flex items-center gap-1.5 active:scale-[0.98]"
                                >
                                  <Icon icon="solar:user-block-bold" width="14" height="14" />
                                  <span>Eliminate Selected ({selectedViolatorIds.length})</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Interactive Table */}
                        {displayedParticipants.length === 0 ? (
                          <div className="py-8 text-center text-xs text-muted dark:text-white/60">
                            {filterTab === "VIOLATING" ? (
                              <div className="flex flex-col items-center">
                                <span className="text-2xl mb-1">🎉</span>
                                <span className="font-bold text-green-500">Zero Rule Violations Found!</span>
                                <span>All evaluated participants are compliant with the trading rules.</span>
                              </div>
                            ) : (
                              "No participants found in this filter."
                            )}
                          </div>
                        ) : (
                          <div className="overflow-x-auto mt-3 rounded-2xl border border-grey/10 dark:border-white/10">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead className="bg-gray-50 dark:bg-slate-900/80 text-muted dark:text-white/70 uppercase font-extrabold border-b border-grey/10 dark:border-white/10">
                                <tr>
                                  {filterTab === "VIOLATING" && (
                                    <th className="py-3 px-3 w-10 text-center">
                                      <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setSelectedViolatorIds(violatingList.map((v: any) => String(v.userId)));
                                          } else {
                                            setSelectedViolatorIds([]);
                                          }
                                        }}
                                        className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                                        title="Select all violating"
                                      />
                                    </th>
                                  )}
                                  <th className="py-3 px-3">Rank</th>
                                  <th className="py-3 px-3">Participant</th>
                                  <th className="py-3 px-3 text-right">Valuation</th>
                                  <th className="py-3 px-3 text-right">Return</th>
                                  <th className="py-3 px-4">Compliance Status & Audit Reason</th>
                                  <th className="py-3 px-3 text-right">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-grey/10 dark:divide-white/10">
                                {displayedParticipants.map((student: any) => {
                                  const isViolating = Boolean(student.disallowedSymbols);
                                  const isSelected = selectedViolatorIds.includes(String(student.userId));
                                  return (
                                    <tr
                                      key={student.userId}
                                      className={`transition ${isSelected
                                          ? "bg-red-500/10 dark:bg-red-500/15"
                                          : "hover:bg-gray-50 dark:hover:bg-white/5"
                                        }`}
                                    >
                                      {filterTab === "VIOLATING" && (
                                        <td className="py-3 px-3 text-center">
                                          <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                setSelectedViolatorIds((prev) => [...prev, String(student.userId)]);
                                              } else {
                                                setSelectedViolatorIds((prev) =>
                                                  prev.filter((id) => id !== String(student.userId))
                                                );
                                              }
                                            }}
                                            className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                                          />
                                        </td>
                                      )}
                                      <td className="py-3 px-3 font-bold">#{student.rank}</td>
                                      <td className="py-3 px-3">
                                        <div className="font-bold text-midnight_text dark:text-white">
                                          {student.displayName}
                                        </div>
                                        {student.customFieldValues && Object.keys(student.customFieldValues).length > 0 && (
                                          <div className="text-[10px] text-muted dark:text-white/60 truncate max-w-xs">
                                            {Object.entries(student.customFieldValues)
                                              .map(([k, v]) => `${k}: ${v}`)
                                              .join(" • ")}
                                          </div>
                                        )}
                                      </td>
                                      <td className="py-3 px-3 text-right font-mono font-bold">
                                        ₹{(student.eventValuation || 0).toLocaleString("en-IN")}
                                      </td>
                                      <td
                                        className={`py-3 px-3 text-right font-mono font-bold ${(student.returnPercent || 0) >= 0 ? "text-green-500" : "text-red-500"
                                          }`}
                                      >
                                        {(student.returnPercent || 0) >= 0 ? "+" : ""}
                                        {(student.returnPercent || 0).toFixed(2)}%
                                      </td>
                                      <td className="py-3 px-4">
                                        {isViolating ? (
                                          <div className="inline-flex flex-col gap-0.5">
                                            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                                              ⚠️ {student.violationReason}
                                            </span>
                                            {student.lastViolationAt && (
                                              <span className="text-[10px] text-muted dark:text-white/50">
                                                Last trade: {new Date(student.lastViolationAt).toLocaleTimeString()}
                                              </span>
                                            )}
                                          </div>
                                        ) : (
                                          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 inline-flex items-center gap-1">
                                            <Icon icon="solar:check-circle-bold" width="12" height="12" />
                                            Compliant
                                          </span>
                                        )}
                                      </td>
                                      <td className="py-3 px-3 text-right space-x-2 whitespace-nowrap">
                                        <button
                                          onClick={() => openTradeAudit(student)}
                                          className="text-primary hover:underline font-bold"
                                        >
                                          Audit
                                        </button>
                                        {isViolating && (
                                          <>
                                            <button
                                              onClick={() =>
                                                openWarningModalForViolators(
                                                  [String(student.userId)],
                                                  student.name || student.enrollmentNumber || "Participant",
                                                  activeScript
                                                )
                                              }
                                              className="text-amber-500 hover:underline font-bold ml-2 inline-flex items-center gap-1"
                                            >
                                              <Icon icon="solar:bell-bold" width="12" height="12" />
                                              Notify
                                            </button>
                                            <button
                                              onClick={() => {
                                                setSelectedViolatorIds([String(student.userId)]);
                                                setEliminationReason(student.violationReason || "Violated trading rules.");
                                                setEliminationModalOpen(true);
                                              }}
                                              className="text-red-500 hover:underline font-bold ml-2"
                                            >
                                              Eliminate
                                            </button>
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </section>

        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="🔍 Search student by name, enrollment number, or division..."
            className="w-full bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-2xl px-4 py-3 text.midnight_text dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition text-sm shadow-md"
          />
        </div>

        {eventData?.customVerificationFields?.length > 0 && (
          <section className="bg-white dark:bg-darkHeroBg border border-primary/20 rounded-2xl p-5 shadow-xl mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Group performance</span>
                <p className="text-xs text-muted dark:text-white/60 mt-1">Compare combined event portfolio performance by a verification field.</p>
              </div>
              <select value={groupByField} onChange={(e) => { setGroupByField(e.target.value); if (e.target.value) fetchGroupAnalytics(eventData.id, e.target.value); }} className="bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight_text dark:text-white">
                <option value="">Select group field</option>
                {eventData.customVerificationFields.map((field: any) => <option key={field.fieldKey} value={field.fieldKey}>{field.fieldLabel || field.fieldKey}</option>)}
              </select>
            </div>
            {groupByField && (groupLoading ? <p className="text-xs mt-4 text-muted">Loading group totals...</p> : (
              <div className="overflow-x-auto mt-4"><table className="w-full text-left text-xs"><thead><tr className="text-muted dark:text-white/60 uppercase"><th className="py-2">#</th><th>Group</th><th className="text-right">Participants</th><th className="text-right">Portfolio Value</th><th className="text-right">Return</th><th className="text-right">P&L</th><th className="text-right">Holdings</th><th className="text-right">Trades</th></tr></thead><tbody className="divide-y divide-grey/10 dark:divide-white/10">{groupAnalytics.map((group, index) => <tr key={group.groupValue}><td className="py-2 font-bold">{index + 1}</td><td className="font-semibold">{group.groupValue}</td><td className="text-right">{group.participantCount}</td><td className="text-right">₹{Number(group.totalPortfolioValue || 0).toLocaleString("en-IN")}</td><td className={`text-right font-bold ${group.aggregateReturnPercent >= 0 ? "text-green-500" : "text-red-500"}`}>{group.aggregateReturnPercent >= 0 ? "+" : ""}{Number(group.aggregateReturnPercent || 0).toFixed(2)}%</td><td className="text-right">₹{Number(group.totalNetPnl || 0).toLocaleString("en-IN")}</td><td className="text-right">{group.totalOpenHoldings}</td><td className="text-right">{group.totalTrades}</td></tr>)}</tbody></table></div>
            ))}
          </section>
        )}

        {/* Leaderboard Data Table */}
        <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Top Bar: Title & Rows Per Page Selector */}
          <div className="p-4 sm:p-5 border-b border-grey/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-sm text-midnight_text dark:text-white">
                Leaderboard Rankings
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                {filteredParticipants.length} {filteredParticipants.length === 1 ? "student" : "students"}
              </span>
            </div>

            {/* Rows Per Page selector (10, 25, 50) */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted dark:text-white/60 font-semibold">Rows per page:</span>
              <div className="inline-flex rounded-xl bg-gray-200/70 dark:bg-slate-800 p-0.5 border border-grey/10 dark:border-white/10">
                {[10, 25, 50].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setRowsPerPage(option);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-extrabold transition ${
                      rowsPerPage === option
                        ? "bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
                        : "text-muted dark:text-white/60 hover:text-midnight_text dark:hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading && !participants.length ? (
            <div className="p-12 text-center text-muted dark:text-white/60">Loading student rankings...</div>
          ) : filteredParticipants.length === 0 ? (
            <div className="p-12 text-center text-muted dark:text-white/60">
              <span className="text-2xl block mb-2">🔍</span>
              No students found matching your search.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-900/80 text-muted dark:text-white/70 text-xs uppercase font-extrabold border-b border-grey/10 dark:border-white/10">
                      <th className="py-4 px-4">Rank</th>
                      {visibleCustomFields.map((field: any) => (
                        <th key={field.fieldKey} className="py-4 px-4">{field.fieldLabel || field.fieldKey}</th>
                      ))}
                      <th className="py-4 px-4">Student Name</th>
                      <th className="py-4 px-4 text-right">Open Holdings</th>
                      <th className="py-4 px-4 text-right">Portfolio Value</th>
                      <th className="py-4 px-4 text-right">Return (%)</th>
                      <th className="py-4 px-4 text-right">Win Rate</th>
                      <th className="py-4 px-4 text-right">Trades</th>
                      <th className="py-4 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grey/10 dark:divide-white/10 text-sm">
                    {paginatedParticipants.map((student) => {
                      const isGain = (student.returnPercent || 0) >= 0;
                      return (
                        <tr key={student.userId || student.rank} className="hover:bg-gray-50 dark:hover:bg-white/5 transition">
                          <td className="py-3.5 px-4 font-black text-midnight_text dark:text-white">
                            {student.rank === 1 ? "🥇 1" : student.rank === 2 ? "🥈 2" : student.rank === 3 ? "🥉 3" : `#${student.rank}`}
                          </td>
                          {visibleCustomFields.map((field: any) => (
                            <td key={field.fieldKey} className="py-3.5 px-4 text-muted dark:text-white/70">
                              {student.customFieldValues?.[field.fieldKey] || ""}
                            </td>
                          ))}
                          <td className="py-3.5 px-4 font-bold text-midnight_text dark:text-white">{student.displayName}</td>
                          <td className="py-3.5 px-4 text-right font-mono text-muted dark:text-white/80">{student.openHoldingsCount || 0}</td>
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
                            <button
                              onClick={() => removeParticipant(student)}
                              className="ml-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3 py-1.5 rounded-xl text-xs font-bold transition border border-red-500/20"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Bottom Bar: Showing range & Page Navigation */}
              <div className="p-4 sm:p-5 border-t border-grey/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50 dark:bg-slate-900/50 text-xs">
                <div className="text-muted dark:text-white/60">
                  Showing <span className="font-bold text-midnight_text dark:text-white">{startIndex + 1}</span> to{" "}
                  <span className="font-bold text-midnight_text dark:text-white">{endIndex}</span> of{" "}
                  <span className="font-bold text-midnight_text dark:text-white">{filteredParticipants.length}</span> students
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  {/* First Page */}
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={safeCurrentPage <= 1}
                    className="px-2.5 py-1.5 rounded-lg border border-grey/20 dark:border-white/10 bg-white dark:bg-slate-800 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                    title="First Page"
                  >
                    «
                  </button>

                  {/* Previous Page */}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={safeCurrentPage <= 1}
                    className="px-3 py-1.5 rounded-lg border border-grey/20 dark:border-white/10 bg-white dark:bg-slate-800 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-700 transition flex items-center gap-1"
                  >
                    <Icon icon="solar:alt-arrow-left-linear" width="14" height="14" />
                    <span>Prev</span>
                  </button>

                  {/* Page indicator */}
                  <span className="px-3 py-1.5 text-muted dark:text-white/70 font-semibold">
                    Page <span className="font-bold text-midnight_text dark:text-white">{safeCurrentPage}</span> of{" "}
                    <span className="font-bold text-midnight_text dark:text-white">{totalPages}</span>
                  </span>

                  {/* Next Page */}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={safeCurrentPage >= totalPages}
                    className="px-3 py-1.5 rounded-lg border border-grey/20 dark:border-white/10 bg-white dark:bg-slate-800 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-700 transition flex items-center gap-1"
                  >
                    <span>Next</span>
                    <Icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={safeCurrentPage >= totalPages}
                    className="px-2.5 py-1.5 rounded-lg border border-grey/20 dark:border-white/10 bg-white dark:bg-slate-800 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                    title="Last Page"
                  >
                    »
                  </button>
                </div>
              </div>
            </>
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

      {/* Organizer announcement composer */}
      {announcementModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-darkHeroBg border border-amber-500/20 rounded-3xl p-6 max-w-xl w-full shadow-2xl">
            <div className="flex justify-between items-start pb-4 border-b border-grey/10 dark:border-white/10">
              <div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                  announcementTargetUserIds && announcementTargetUserIds.length > 0
                    ? "text-amber-600 bg-amber-500/15 border border-amber-500/30"
                    : "text-amber-500 bg-amber-500/10"
                }`}>
                  {announcementTargetUserIds && announcementTargetUserIds.length > 0
                    ? "⚠️ TARGETED COMPLIANCE WARNING"
                    : "PARTICIPANT ANNOUNCEMENT"}
                </span>
                <h3 className="text-xl font-bold text-midnight_text dark:text-white mt-2">
                  {announcementTargetUserIds && announcementTargetUserIds.length > 0
                    ? `Warn Violating Participants (${announcementTargetUserIds.length})`
                    : "Notify event participants"}
                </h3>
                <p className="text-xs text-muted dark:text-white/60 mt-1">
                  {announcementTargetUserIds && announcementTargetUserIds.length > 0 ? (
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">
                      ⚠️ Sending notice exclusively to {announcementTargetLabel || `${announcementTargetUserIds.length} violators`}. Compliant participants will NOT be messaged.
                    </span>
                  ) : (
                    "Only registered participants of this event will receive this message."
                  )}
                </p>
              </div>
              <button
                onClick={() => {
                  setAnnouncementModalOpen(false);
                  setAnnouncementTargetUserIds(null);
                  setAnnouncementTargetLabel("");
                }}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendAnnouncement} className="space-y-4 mt-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase">Title</label>
                  <span className="text-[11px] text-muted dark:text-white/60">{announcementTitle.length}/{ANNOUNCEMENT_TITLE_LIMIT}</span>
                </div>
                <input
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  maxLength={ANNOUNCEMENT_TITLE_LIMIT}
                  placeholder="Event starts in 30 minutes"
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase">Description</label>
                  <span className="text-[11px] text-muted dark:text-white/60">{announcementDescription.length}/{ANNOUNCEMENT_DESCRIPTION_LIMIT}</span>
                </div>
                <textarea
                  value={announcementDescription}
                  onChange={(e) => setAnnouncementDescription(e.target.value)}
                  maxLength={ANNOUNCEMENT_DESCRIPTION_LIMIT}
                  rows={5}
                  placeholder="Please be ready on the Market tab before the opening bell."
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              {announcementMessage && <p className="text-xs font-semibold text-amber-500">{announcementMessage}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAnnouncementModalOpen(false);
                    setAnnouncementTargetUserIds(null);
                    setAnnouncementTargetLabel("");
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={announcementSending || !announcementTitle.trim() || !announcementDescription.trim()}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white disabled:opacity-50 transition shadow-md ${
                    announcementTargetUserIds && announcementTargetUserIds.length > 0
                      ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/20"
                      : "bg-amber-500 hover:bg-amber-400 shadow-amber-500/20"
                  }`}
                >
                  {announcementSending
                    ? "Queuing..."
                    : announcementTargetUserIds && announcementTargetUserIds.length > 0
                    ? `Send Warning Notice (${announcementTargetUserIds.length})`
                    : "Send to participants"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Participant Elimination Modal */}
      {eliminationModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-darkHeroBg border border-red-500/30 rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 pb-4 border-b border-grey/10 dark:border-white/10 text-red-500">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <Icon icon="solar:danger-triangle-bold" width="22" height="22" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-midnight_text dark:text-white">
                  Disqualify & Eliminate Participants
                </h3>
                <p className="text-xs text-muted dark:text-white/60">
                  {selectedViolatorIds.length} participant{selectedViolatorIds.length > 1 ? "s" : ""} selected for removal
                </p>
              </div>
            </div>

            <div className="my-4 space-y-3">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                <p className="font-bold">⚠️ Action Summary:</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5 opacity-90">
                  <li>Selected participants will be disqualified from the leaderboard.</li>
                  <li>Any open event orders will be cancelled immediately.</li>
                  <li>Open event positions will be safely liquidated.</li>
                  <li>Personal portfolios remain 100% safe and unlocked.</li>
                </ul>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-midnight_text dark:text-white">
                  Disqualification Reason (Audit Log)
                </label>
                <input
                  type="text"
                  value={eliminationReason}
                  onChange={(e) => setEliminationReason(e.target.value)}
                  placeholder="e.g. Traded unauthorized non-NIFTY 50 stocks"
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-midnight_text dark:text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-grey/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => setEliminationModalOpen(false)}
                disabled={eliminating}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 dark:bg-white/10 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkEliminate}
                disabled={eliminating}
                className="px-5 py-2 rounded-xl text-xs font-extrabold bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-red-500/25"
              >
                {eliminating ? (
                  <>
                    <Icon icon="line-md:loading-twotone-loop" width="16" height="16" />
                    <span>Eliminating...</span>
                  </>
                ) : (
                  <>
                    <Icon icon="solar:trash-bin-trash-bold" width="16" height="16" />
                    <span>Confirm Disqualification</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Scope & Schedule Tooltip Modal */}
      {infoModalScript && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 my-8">

            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-grey/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                  <Icon icon="solar:document-text-bold" width="24" height="24" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {infoModalScript.scriptKey}
                    </span>
                    <span className="text-[11px] font-bold text-muted dark:text-white/60">
                      • Filter Rules & Auditing Scope
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-midnight_text dark:text-white mt-1">
                    {infoModalScript.title}
                  </h3>
                  <p className="text-xs text-muted dark:text-white/60 mt-0.5">
                    {infoModalScript.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInfoModalScript(null)}
                className="text-muted hover:text-midnight_text dark:hover:text-white transition p-1"
              >
                <Icon icon="solar:close-circle-bold" width="22" height="22" />
              </button>
            </div>

            {/* Scan Timing & Cooldown Schedule Card */}
            <div className="bg-gray-50 dark:bg-slate-900/60 border border-grey/20 dark:border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:clock-circle-bold" width="18" height="18" className="text-primary" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-midnight_text dark:text-white">
                    Scan Timing & Evaluation Window
                  </h4>
                </div>
                <span className="text-[11px] font-extrabold bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full">
                  {infoModalScript.cooldownMinutes || 10} min break interval
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-grey/10 dark:border-white/5 space-y-1">
                  <span className="text-[11px] font-semibold text-muted dark:text-white/50 block">Previous Audit Run</span>
                  <span className="font-bold text-midnight_text dark:text-white text-sm">
                    {infoModalScript.lastEvaluatedAt
                      ? new Date(infoModalScript.lastEvaluatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                      : "Initial scan pending"}
                  </span>
                </div>

                <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-grey/10 dark:border-white/5 space-y-1">
                  <span className="text-[11px] font-semibold text-muted dark:text-white/50 block">Next Scan Availability</span>
                  <span className={`font-bold text-sm ${cooldownRemaining > 0 ? "text-amber-500" : "text-green-500"}`}>
                    {cooldownRemaining > 0
                      ? `Unlocked in ${formatCooldown(cooldownRemaining)}`
                      : "Ready to run on demand"}
                  </span>
                </div>
              </div>

              {/* Incremental Scan Window Explanation */}
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-3.5 text-xs text-midnight_text dark:text-white/90 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-primary text-[11px] uppercase tracking-wider">
                  <Icon icon="solar:calendar-date-bold" width="14" height="14" />
                  <span>Orders Audited in Next Execution</span>
                </div>
                <p className="leading-relaxed">
                  On the next execution, the engine will audit trade orders placed between{" "}
                  <strong className="text-primary font-mono">
                    {infoModalScript.lastEvaluatedAt
                      ? new Date(infoModalScript.lastEvaluatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                      : (eventData?.startTime ? new Date(eventData.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "Event Start")}
                  </strong>{" "}
                  and the{" "}
                  <strong className="text-primary">moment of scan execution</strong>, in addition to verifying all currently open holdings.
                </p>
                <p className="text-[11px] text-muted dark:text-white/60">
                  • Trades placed prior to this start window were already validated in previous executions and will not be re-processed.
                </p>
              </div>
            </div>

            {/* Approved Stocks / Filter Symbols Section */}
            {infoModalScript.allowedSymbols && infoModalScript.allowedSymbols.length > 0 && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted dark:text-white/60">
                      Approved Universe ({infoModalScript.allowedSymbols.length} {infoModalScript.category === "FNO_WHITELIST" ? "F&O Indices" : "Stocks"})
                    </h4>
                    <p className="text-[11px] text-muted dark:text-white/50">
                      Participants trading any symbol outside this list will be flagged as violators.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(infoModalScript.allowedSymbols.join(", "));
                      setCopiedSymbols(true);
                      setTimeout(() => setCopiedSymbols(false), 3000);
                    }}
                    className="self-start sm:self-auto bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-midnight_text dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-grey/10 dark:border-white/10 shadow-2xs"
                  >
                    {copiedSymbols ? (
                      <>
                        <Icon icon="solar:check-circle-bold" width="14" height="14" className="text-green-500" />
                        <span className="text-green-600 dark:text-green-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Icon icon="solar:copy-bold" width="14" height="14" />
                        <span>Copy All Symbols</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Symbol Search Bar */}
                <div className="relative">
                  <Icon icon="solar:magnifer-linear" width="16" height="16" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    placeholder={
                      infoModalScript.category === "FNO_WHITELIST"
                        ? "Search approved indices (e.g. NIFTY, BANKNIFTY)..."
                        : "Search approved stocks (e.g. Paytm, RVNL, TCS)..."
                    }
                    value={symbolSearchQuery}
                    onChange={(e) => setSymbolSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-900/60 border border-grey/20 dark:border-white/10 text-midnight_text dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Stock Symbols Grid */}
                <div className="max-h-60 overflow-y-auto pr-1 space-y-1.5 divide-y divide-grey/5 dark:divide-white/5 bg-gray-50/50 dark:bg-slate-900/30 rounded-2xl p-3 border border-grey/10 dark:border-white/10">
                  {(() => {
                    const query = symbolSearchQuery.toLowerCase().trim();
                    const detailsMap = new Map<string, string>();
                    (infoModalScript.stockDetails || []).forEach((d: any) => {
                      if (d && d.symbol) detailsMap.set(String(d.symbol), String(d.name || d.symbol));
                    });
                    const filteredSymbols: string[] = (infoModalScript.allowedSymbols || [])
                      .map((s: any) => String(s))
                      .filter((sym: string) => {
                        const name = String(detailsMap.get(sym) || "").toLowerCase();
                        return sym.toLowerCase().includes(query) || name.includes(query);
                      });

                    if (filteredSymbols.length === 0) {
                      return (
                        <p className="text-xs text-muted dark:text-white/50 text-center py-4">
                          No approved instruments match &quot;{symbolSearchQuery}&quot;
                        </p>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filteredSymbols.map((sym: string) => {
                          const companyName = String(detailsMap.get(sym) || "");
                          return (
                            <div
                              key={sym}
                              className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 text-xs shadow-2xs"
                            >
                              <div className="truncate mr-2">
                                <span className="font-mono font-extrabold text-primary text-xs mr-1.5">
                                  {sym}
                                </span>
                                {companyName && companyName !== sym && (
                                  <span className="text-[11px] text-muted dark:text-white/60 truncate">
                                    {companyName}
                                  </span>
                                )}
                              </div>
                              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end pt-3 border-t border-grey/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => setInfoModalScript(null)}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-md shadow-primary/20"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
