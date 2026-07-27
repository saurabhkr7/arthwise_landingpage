"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-6 pt-24 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-sky-400 uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                ORGANIZER DASHBOARD
              </span>
              <span className="text-slate-500 text-sm">• Active Admin Session</span>
            </div>
            <h1 className="text-3xl font-black text-white mt-1">Welcome back, {organizerName}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/organizer/create-event")}
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-5 py-2.5 rounded-xl text-sm font-extrabold transition shadow-lg shadow-sky-500/10 active:scale-[0.98]"
            >
              ➕ Create New Event
            </button>
            <button
              onClick={handleLogout}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dynamic content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-medium">Fetching event configs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 font-medium">
            ⚠️ {error}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 max-w-lg mx-auto shadow-xl">
            <h2 className="text-xl font-bold text-slate-300">No events found</h2>
            <p className="text-slate-400 text-sm mt-2">You haven't provisioned any paper trading events yet. Click "Create New Event" to launch your first pilot championship.</p>
            <button
              onClick={() => router.push("/organizer/create-event")}
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-5 py-2.5 rounded-xl text-sm font-extrabold transition mt-5"
            >
              Create First Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg hover:border-sky-500/40 transition duration-300"
              >
                {/* Banner Header image representation */}
                <div className="h-32 bg-slate-950 relative overflow-hidden">
                  {event.bannerImageUrl ? (
                    <img src={event.bannerImageUrl} alt="event banner" className="w-full h-full object-cover opacity-60" />
                  ) : (
                    <div className="w-full h-full animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                      event.status === "LIVE"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : event.status === "UPCOMING"
                        ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                        : "bg-slate-700 text-slate-300 border-slate-600"
                    }`}>
                      {event.status}
                    </span>
                    <h2 className="text-lg font-bold text-white mt-1 drop-shadow-sm">{event.title}</h2>
                  </div>
                </div>

                <div className="p-5 space-y-4 flex-grow">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Join Code</p>
                      <p className="text-slate-200 font-mono font-semibold mt-0.5">{event.joinCode}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Passcode</p>
                      <p className="text-slate-200 font-mono font-semibold mt-0.5">{event.passcode}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Participants</p>
                      <p className="text-slate-200 mt-0.5 font-bold">{event.participantCount || 0} enrolled</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Start Date</p>
                      <p className="text-slate-200 mt-0.5">{new Date(event.startTime).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-800/40">
                  <button
                    onClick={() => handleManageEvent(event)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold py-2.5 rounded-xl transition text-xs mt-4 flex items-center justify-center gap-2"
                  >
                    🛠️ Open Management Panel
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
