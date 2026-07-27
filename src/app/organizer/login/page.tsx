"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";

export default function OrganizerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If already logged in, redirect directly to dashboard
    const token = sessionStorage.getItem("organizer_token");
    if (token) {
      router.push("/organizer/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/market-event/organizer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Invalid email or password.");
      }

      // Store organizer auth details
      sessionStorage.setItem("organizer_token", json.accessToken);
      sessionStorage.setItem("organizer_name", json.data.name);
      sessionStorage.setItem("organizer_email", json.data.email);

      // Redirect to the organizer central dashboard
      router.push("/organizer/dashboard");
    } catch (err: any) {
      console.error("❌ Organizer login error:", err);
      setError(err.message || "Failed to log in. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center p-4 pt-24 font-sans">
      <div className="bg-[#1E293B] border border-slate-700/60 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Subtle glowing effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <span className="text-[10px] font-black tracking-widest text-sky-400 uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            EVENT ORGANIZER PORTAL
          </span>
          <h1 className="text-3xl font-extrabold mt-4 text-white tracking-tight">Arthwise Control</h1>
          <p className="text-slate-400 text-sm mt-2">Sign in to manage and configure your university paper trading events.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="organizer@university.edu"
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 transition placeholder-slate-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 transition placeholder-slate-500 text-sm"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs font-semibold">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3 rounded-xl transition shadow-lg shadow-sky-500/10 hover:shadow-sky-500/25 active:scale-[0.98] disabled:opacity-50 text-sm flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
