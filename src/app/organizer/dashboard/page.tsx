"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";

export default function OrganizerDashboard() {
  const router = useRouter();
  const [organizerName, setOrganizerName] = useState("");
  const [token, setToken] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  // Deletion modal state
  const [eventToDelete, setEventToDelete] = useState<any | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Compliance Filter Management Modal State (Admin Only)
  const [complianceModalOpen, setComplianceModalOpen] = useState(false);
  const [selectedEventForCompliance, setSelectedEventForCompliance] = useState<any | null>(null);
  const [complianceScripts, setComplianceScripts] = useState<any[]>([]);
  const [complianceCatalog, setComplianceCatalog] = useState<any[]>([]);
  const [complianceLoading, setComplianceLoading] = useState(false);
  const [complianceActionLoading, setComplianceActionLoading] = useState<string>("");
  const [complianceModalError, setComplianceModalError] = useState("");
  const [cooldownMinutesMap, setCooldownMinutesMap] = useState<Record<string, number>>({});

  // Authentication check
  useEffect(() => {
    const storedToken = sessionStorage.getItem("organizer_token");
    const name = sessionStorage.getItem("organizer_name");
    if (!storedToken) {
      router.push("/organizer/login");
      return;
    }
    setToken(storedToken);
    setOrganizerName(name || "Organizer");
  }, [router]);

  // Load events
  const fetchEvents = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/organizer/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      
      if (res.status === 401 || (json && json.message && (json.message.includes("expired") || json.message.includes("login again") || json.message.includes("Invalid token")))) {
        sessionStorage.clear();
        router.push("/organizer/login");
        return;
      }

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load events.");
      }
      setEvents(json.events || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  // Logout handler
  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/organizer/login");
  };

  // Navigates to individual control panel and sets the session passcode
  const handleManageEvent = (event: any) => {
    sessionStorage.setItem(`organizer_passcode_${event.slug}`, event.passcode);
    router.push(`/organizer/${event.slug}`);
  };

  // Delete event handler
  const handleDeleteEvent = async () => {
    if (!eventToDelete || !token) return;
    setDeleteLoading(true);
    setDeleteError("");
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/organizer/${eventToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (res.status === 401 || (json && json.message && (json.message.includes("expired") || json.message.includes("login again")))) {
        sessionStorage.clear();
        router.push("/organizer/login");
        return;
      }

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to delete event.");
      }

      const deletedTitle = eventToDelete.title;
      setEventToDelete(null);
      setActionSuccessMsg(`Event "${deletedTitle}" and all related participant records were successfully deleted.`);
      fetchEvents();
      setTimeout(() => setActionSuccessMsg(""), 6000);
    } catch (err: any) {
      console.error("❌ Delete event error:", err);
      setDeleteError(err.message || "Failed to delete event.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ── Compliance Filter Management Handlers (Admin Only) ──
  const handleOpenComplianceModal = async (event: any) => {
    setSelectedEventForCompliance(event);
    setComplianceModalOpen(true);
    setComplianceLoading(true);
    setComplianceModalError("");
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${event._id}/compliance/scripts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setComplianceScripts(json.scripts || []);
        setComplianceCatalog(json.catalog || []);
      } else {
        setComplianceModalError(json.message || "Failed to load compliance filters.");
      }
    } catch (err: any) {
      console.error("Error loading compliance scripts:", err);
      setComplianceModalError("Network error loading compliance filters.");
    } finally {
      setComplianceLoading(false);
    }
  };

  const handleAttachScript = async (scriptKey: string, cooldownMinutes = 10) => {
    if (!selectedEventForCompliance || !token) return;
    setComplianceActionLoading(`attach_${scriptKey}`);
    setComplianceModalError("");
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${selectedEventForCompliance._id}/compliance/scripts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          scriptKey,
          config: { cooldownMinutes },
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        const updatedRes = await fetch(`${API_BASE_URL}/market-event/${selectedEventForCompliance._id}/compliance/scripts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const updatedJson = await updatedRes.json();
        const newScripts = updatedJson.scripts || [];
        setComplianceScripts(newScripts);

        setEvents((prev) =>
          prev.map((ev) =>
            ev._id === selectedEventForCompliance._id
              ? { ...ev, complianceScripts: newScripts }
              : ev
          )
        );
        setSelectedEventForCompliance((prev: any) => ({ ...prev, complianceScripts: newScripts }));
        setActionSuccessMsg(`Compliance filter attached to "${selectedEventForCompliance.title}".`);
        setTimeout(() => setActionSuccessMsg(""), 5000);
      } else {
        setComplianceModalError(json.message || "Could not attach compliance filter.");
      }
    } catch (err: any) {
      console.error("Error attaching script:", err);
      setComplianceModalError("Network error attaching compliance filter.");
    } finally {
      setComplianceActionLoading("");
    }
  };

  const handleDetachScript = async (scriptId: string) => {
    if (!selectedEventForCompliance || !token) return;
    setComplianceActionLoading(`detach_${scriptId}`);
    setComplianceModalError("");
    try {
      const res = await fetch(`${API_BASE_URL}/market-event/${selectedEventForCompliance._id}/compliance/scripts/${scriptId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        const newScripts = complianceScripts.filter((s) => s.scriptId !== scriptId);
        setComplianceScripts(newScripts);

        setEvents((prev) =>
          prev.map((ev) =>
            ev._id === selectedEventForCompliance._id
              ? { ...ev, complianceScripts: newScripts }
              : ev
          )
        );
        setSelectedEventForCompliance((prev: any) => ({ ...prev, complianceScripts: newScripts }));
        setActionSuccessMsg(`Compliance filter removed from "${selectedEventForCompliance.title}".`);
        setTimeout(() => setActionSuccessMsg(""), 5000);
      } else {
        setComplianceModalError(json.message || "Could not remove compliance filter.");
      }
    } catch (err: any) {
      console.error("Error removing script:", err);
      setComplianceModalError("Network error removing compliance filter.");
    } finally {
      setComplianceActionLoading("");
    }
  };

  return (
    <div className="min-h-screen bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white p-6 pt-28 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-grey/10 dark:border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                <Icon icon="solar:shield-user-bold" width="14" height="14" />
                ORGANIZER DASHBOARD
              </span>
              <span className="text-muted dark:text-white/60 text-xs font-semibold">• Active Admin Session</span>
            </div>
            <h1 className="text-3xl font-extrabold text-midnight_text dark:text-white mt-1">Welcome back, {organizerName}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/organizer/create-event")}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-extrabold transition shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <Icon icon="solar:add-circle-bold" width="18" height="18" />
              <span>Create New Event</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-midnight_text dark:text-white px-4 py-2.5 rounded-xl text-sm font-semibold border border-grey/10 dark:border-white/10 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Action Success Toast Banner */}
        {actionSuccessMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-4 text-emerald-600 dark:text-emerald-400 font-semibold text-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Icon icon="solar:check-circle-bold" width="20" height="20" />
              <span>{actionSuccessMsg}</span>
            </div>
            <button
              onClick={() => setActionSuccessMsg("")}
              className="text-emerald-600 dark:text-emerald-400 hover:opacity-75 p-1"
            >
              <Icon icon="solar:close-circle-bold" width="18" height="18" />
            </button>
          </div>
        )}

        {/* Dynamic content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Icon icon="line-md:loading-twotone-loop" width="40" height="40" className="text-primary" />
            <p className="text-muted dark:text-white/70 font-medium text-sm">Fetching event configurations...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-500 font-medium text-sm flex items-center gap-2">
            <Icon icon="solar:danger-triangle-bold" width="20" height="20" />
            <span>{error}</span>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl p-8 max-w-lg mx-auto shadow-xl">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <Icon icon="solar:cup-star-bold" width="32" height="32" />
            </div>
            <h2 className="text-xl font-bold text-midnight_text dark:text-white">No active events found</h2>
            <p className="text-muted dark:text-white/70 text-sm mt-2">You haven&apos;t provisioned any paper trading events yet. Click &quot;Create New Event&quot; to launch your first pilot championship.</p>
            <button
              onClick={() => router.push("/organizer/create-event")}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl text-sm font-extrabold transition shadow-lg shadow-primary/25 mt-6 inline-flex items-center gap-2"
            >
              <Icon icon="solar:add-circle-bold" width="18" height="18" />
              <span>Create First Event</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl hover:border-primary/40 transition duration-300"
              >
                {/* Banner Header image representation */}
                <div className="h-36 bg-slate-900 relative overflow-hidden">
                  {event.bannerImageUrl ? (
                    <img src={event.bannerImageUrl} alt="event banner" className="w-full h-full object-cover opacity-60" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-slate-900 to-slate-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                      event.status === "LIVE"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : event.status === "UPCOMING"
                        ? "bg-sky-500/20 text-sky-400 border-sky-500/30"
                        : "bg-slate-700 text-slate-300 border-slate-600"
                    }`}>
                      {event.status}
                    </span>
                    <h2 className="text-lg font-bold text-white mt-1 drop-shadow-sm truncate">{event.title}</h2>
                  </div>
                </div>

                <div className="p-5 space-y-4 flex-grow">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted dark:text-white/50 block font-semibold">Join Code</span>
                      <span className="font-mono font-extrabold text-primary text-sm">{event.joinCode}</span>
                    </div>
                    <div>
                      <span className="text-muted dark:text-white/50 block font-semibold">Virtual Capital</span>
                      <span className="font-semibold text-midnight_text dark:text-white">₹{(event.initialCapital || 1000000).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-3 border-t border-grey/10 dark:border-white/10">
                    <div>
                      <span className="text-muted dark:text-white/50 block font-semibold">Sponsor Name</span>
                      <span className="text-midnight_text dark:text-white font-medium truncate block">{event.sponsorName}</span>
                    </div>
                    <div>
                      <span className="text-muted dark:text-white/50 block font-semibold">Registered Traders</span>
                      <span className="text-midnight_text dark:text-white font-bold">{event.participantCount || 0} / {event.maxParticipants || 150}</span>
                    </div>
                  </div>

                  <div className="text-xs pt-3 border-t border-grey/10 dark:border-white/10 flex justify-between items-center text-muted dark:text-white/60">
                    <span>Passcode: <code className="font-mono text-primary font-bold">{event.passcode}</code></span>
                    <span className="text-[11px]">{new Date(event.startTime).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 bg-gray-50 dark:bg-slate-900/60 border-t border-grey/10 dark:border-white/10 space-y-2">
                  <button
                    onClick={() => handleManageEvent(event)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                  >
                    <Icon icon="solar:settings-minimalistic-bold" width="16" height="16" />
                    <span>Open Live Event Monitor</span>
                  </button>
                  <button
                    onClick={() => handleOpenComplianceModal(event)}
                    className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Icon icon="solar:shield-check-bold" width="15" height="15" />
                    <span>Compliance Filters ({event.complianceScripts?.length || 0})</span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/organizer/create-event?edit=${event._id}`)}
                      className="flex-1 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-midnight_text dark:text-white border border-grey/20 dark:border-white/10 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Icon icon="solar:pen-bold" width="14" height="14" className="text-primary" />
                      <span>Edit Event</span>
                    </button>
                    <button
                      onClick={() => {
                        setDeleteError("");
                        setEventToDelete(event);
                      }}
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Icon icon="solar:trash-bin-trash-bold" width="14" height="14" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {eventToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:danger-triangle-bold" width="26" height="26" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-midnight_text dark:text-white">Delete Trading Event</h3>
                    <p className="text-xs text-muted dark:text-white/60">This action permanently deletes this event.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { if (!deleteLoading) setEventToDelete(null); }}
                  className="text-muted hover:text-midnight_text dark:hover:text-white transition p-1"
                >
                  <Icon icon="solar:close-circle-bold" width="22" height="22" />
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-slate-900/60 border border-grey/20 dark:border-white/10 rounded-2xl p-4 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-muted dark:text-white/60">Event Title:</span>
                  <span className="font-bold text-midnight_text dark:text-white truncate max-w-[220px]">{eventToDelete.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-muted dark:text-white/60">Current Status:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    eventToDelete.status === "LIVE"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : eventToDelete.status === "UPCOMING"
                      ? "bg-sky-500/20 text-sky-400 border-sky-500/30"
                      : "bg-slate-700 text-slate-300 border-slate-600"
                  }`}>{eventToDelete.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-muted dark:text-white/60">Student Join Code:</span>
                  <span className="font-mono font-extrabold text-primary">{eventToDelete.joinCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-muted dark:text-white/60">Enrolled Traders:</span>
                  <span className="font-bold text-midnight_text dark:text-white">{eventToDelete.participantCount || 0} participants</span>
                </div>
              </div>

              {eventToDelete.status === "LIVE" && (
                <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 text-amber-600 dark:text-amber-400 text-xs font-medium flex items-start gap-2.5">
                  <Icon icon="solar:shield-warning-bold" width="20" height="20" className="flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Notice:</strong> This event is currently <strong>LIVE</strong>. Deleting it will immediately terminate the event for participants, clear their active event session, and purge all event-specific orders and rankings.
                  </span>
                </div>
              )}

              <div className="text-xs text-muted dark:text-white/70 space-y-1 leading-relaxed border-t border-grey/10 dark:border-white/10 pt-4">
                <p>• All event participant rosters, isolated event accounts, orders, positions, and leaderboard results will be permanently removed.</p>
                <p>• <strong>Personal user accounts, personal trading history, and user wallet balances are strictly preserved.</strong></p>
              </div>

              {deleteError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3 text-red-500 font-medium text-xs flex items-center gap-2">
                  <Icon icon="solar:danger-triangle-bold" width="16" height="16" />
                  <span>{deleteError}</span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={deleteLoading}
                  onClick={() => setEventToDelete(null)}
                  className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-midnight_text dark:text-white px-5 py-2.5 rounded-xl text-xs font-semibold border border-grey/10 dark:border-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleteLoading}
                  onClick={handleDeleteEvent}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-red-600/20 active:scale-[0.98]"
                >
                  {deleteLoading ? (
                    <>
                      <Icon icon="line-md:loading-twotone-loop" width="16" height="16" />
                      <span>Deleting Event...</span>
                    </>
                  ) : (
                    <>
                      <Icon icon="solar:trash-bin-trash-bold" width="16" height="16" />
                      <span>Permanently Delete Event</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Filter Management Modal (Admin Only) */}
        {complianceModalOpen && selectedEventForCompliance && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 my-8">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-grey/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:shield-check-bold" width="26" height="26" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      ADMIN CONTROL
                    </span>
                    <h3 className="text-xl font-extrabold text-midnight_text dark:text-white mt-1">
                      Event Compliance & Trading Rules
                    </h3>
                    <p className="text-xs text-muted dark:text-white/60">
                      For: <span className="font-semibold text-midnight_text dark:text-white">{selectedEventForCompliance.title}</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setComplianceModalOpen(false)}
                  className="text-muted hover:text-midnight_text dark:hover:text-white transition p-1"
                >
                  <Icon icon="solar:close-circle-bold" width="22" height="22" />
                </button>
              </div>

              {/* Informational Callout */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-xs text-blue-600 dark:text-blue-400 flex items-start gap-2.5">
                <Icon icon="solar:info-circle-bold" width="18" height="18" className="flex-shrink-0 mt-0.5" />
                <p>
                  Filters attached here will automatically appear on the <strong>Live Event Monitor</strong> for organizers. Organizers can execute rule scans and eliminate violators, but only Administrators can attach or remove rules.
                </p>
              </div>

              {/* Error banner if any */}
              {complianceModalError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3 text-red-500 font-medium text-xs flex items-center gap-2">
                  <Icon icon="solar:danger-triangle-bold" width="16" height="16" />
                  <span>{complianceModalError}</span>
                </div>
              )}

              {complianceLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2">
                  <Icon icon="line-md:loading-twotone-loop" width="32" height="32" className="text-primary" />
                  <span className="text-xs text-muted dark:text-white/60">Loading compliance rules...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 1. Active Filters on this Event */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted dark:text-white/60">
                        Active Rules on this Event ({complianceScripts.length})
                      </h4>
                      {complianceScripts.length > 0 && (
                        <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          {complianceScripts.length} Active
                        </span>
                      )}
                    </div>

                    {complianceScripts.length === 0 ? (
                      <div className="p-6 text-center bg-gray-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-grey/20 dark:border-white/10">
                        <Icon icon="solar:shield-warning-bold" width="28" height="28" className="text-amber-500 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-midnight_text dark:text-white">
                          No compliance filters currently attached.
                        </p>
                        <p className="text-[11px] text-muted dark:text-white/60 mt-0.5">
                          Attach a rule from the catalog below to activate automated trade auditing for this competition.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {complianceScripts.map((script) => (
                          <div
                            key={script.scriptId}
                            className="bg-gray-50 dark:bg-slate-900/60 border border-grey/20 dark:border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-midnight_text dark:text-white">
                                  {script.title}
                                </span>
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                  {script.scriptKey}
                                </span>
                              </div>
                              <p className="text-xs text-muted dark:text-white/60">
                                {script.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-muted dark:text-white/50">
                                <span className="bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded border border-grey/10 dark:border-white/5 font-semibold">
                                  Break Interval: {script.cooldownMinutes || 10} min
                                </span>
                                {script.allowedSymbols && script.allowedSymbols.length > 0 && (
                                  <span className="bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded border border-grey/10 dark:border-white/5 font-semibold">
                                    {script.allowedSymbols.length} Approved Stocks
                                  </span>
                                )}
                                {script.lastEvaluatedAt && (
                                  <span>
                                    Last audited: {new Date(script.lastEvaluatedAt).toLocaleTimeString()}
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              disabled={complianceActionLoading === `detach_${script.scriptId}`}
                              onClick={() => handleDetachScript(script.scriptId)}
                              className="self-start sm:self-center bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                            >
                              {complianceActionLoading === `detach_${script.scriptId}` ? (
                                <>
                                  <Icon icon="line-md:loading-twotone-loop" width="14" height="14" />
                                  <span>Removing...</span>
                                </>
                              ) : (
                                <>
                                  <Icon icon="solar:trash-bin-trash-bold" width="14" height="14" />
                                  <span>Remove Rule</span>
                                </>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. Available Rules in Catalog */}
                  <div className="pt-4 border-t border-grey/10 dark:border-white/10">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted dark:text-white/60 mb-3">
                      Available Rules in Catalog
                    </h4>

                    {(() => {
                      const attachedKeys = new Set(complianceScripts.map((s) => s.scriptKey));
                      const unattachedCatalog = complianceCatalog.filter((item) => !attachedKeys.has(item.scriptKey));

                      if (unattachedCatalog.length === 0) {
                        return (
                          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-2">
                            <Icon icon="solar:check-circle-bold" width="18" height="18" />
                            <span>All catalog compliance filters are currently active on this event.</span>
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-3">
                          {unattachedCatalog.map((catalogItem) => (
                            <div
                              key={catalogItem.scriptKey}
                              className="bg-white dark:bg-darkHeroBg border border-primary/20 hover:border-primary/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm transition"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-midnight_text dark:text-white">
                                    {catalogItem.title}
                                  </span>
                                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                    {catalogItem.scriptKey}
                                  </span>
                                </div>
                                <p className="text-xs text-muted dark:text-white/60">
                                  {catalogItem.description}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 self-start sm:self-center">
                                <select
                                  value={cooldownMinutesMap[catalogItem.scriptKey] || 10}
                                  onChange={(e) =>
                                    setCooldownMinutesMap((prev) => ({
                                      ...prev,
                                      [catalogItem.scriptKey]: Number(e.target.value),
                                    }))
                                  }
                                  className="bg-gray-50 dark:bg-slate-900 text-midnight_text dark:text-white border border-grey/20 dark:border-white/10 text-xs px-2.5 py-2 rounded-xl font-semibold focus:outline-none"
                                  title="Select scan break interval"
                                >
                                  <option value={5}>5 min break</option>
                                  <option value={10}>10 min break (Default)</option>
                                  <option value={15}>15 min break</option>
                                  <option value={30}>30 min break</option>
                                </select>

                                <button
                                  type="button"
                                  disabled={complianceActionLoading === `attach_${catalogItem.scriptKey}`}
                                  onClick={() =>
                                    handleAttachScript(
                                      catalogItem.scriptKey,
                                      cooldownMinutesMap[catalogItem.scriptKey] || 10
                                    )
                                  }
                                  className="self-start sm:self-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-xs font-extrabold transition shadow-md shadow-primary/20 flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap active:scale-[0.98]"
                                >
                                  {complianceActionLoading === `attach_${catalogItem.scriptKey}` ? (
                                    <>
                                      <Icon icon="line-md:loading-twotone-loop" width="14" height="14" />
                                      <span>Attaching...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Icon icon="solar:add-circle-bold" width="16" height="16" />
                                      <span>Attach to Event</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex justify-end pt-4 border-t border-grey/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setComplianceModalOpen(false)}
                  className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-midnight_text dark:text-white px-5 py-2.5 rounded-xl text-xs font-bold transition border border-grey/10 dark:border-white/10"
                >
                  Done
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
