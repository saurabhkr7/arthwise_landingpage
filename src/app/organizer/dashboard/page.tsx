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

                <div className="p-4 bg-gray-50 dark:bg-slate-900/60 border-t border-grey/10 dark:border-white/10">
                  <button
                    onClick={() => handleManageEvent(event)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                  >
                    <Icon icon="solar:settings-minimalistic-bold" width="16" height="16" />
                    <span>Open Live Event Monitor</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
