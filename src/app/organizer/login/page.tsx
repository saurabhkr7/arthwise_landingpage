"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";

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
    <div className="min-h-screen bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white flex items-center justify-center p-4 pt-28 font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        
        <div className="text-center mb-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <Icon icon="solar:shield-user-bold" width="14" height="14" />
            EVENT ORGANIZER PORTAL
          </span>
          <h1 className="text-3xl font-extrabold mt-4 text-midnight_text dark:text-white tracking-tight">Arthhwise Control</h1>
          <p className="text-muted dark:text-white/70 text-sm mt-2">Sign in to manage and configure your university paper trading events.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="organizer@university.edu"
              className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-midnight_text dark:text-white focus:outline-none focus:border-primary transition placeholder-gray-400 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-midnight_text dark:text-white focus:outline-none focus:border-primary transition placeholder-gray-400 text-sm"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-500 text-xs font-semibold flex items-center gap-2">
              <Icon icon="solar:danger-triangle-bold" width="16" height="16" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-primary/25 active:scale-[0.98] disabled:opacity-50 text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Icon icon="line-md:loading-twotone-loop" width="18" height="18" />
                Signing in...
              </span>
            ) : (
              "Sign In to Control Portal"
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-grey/10 dark:border-white/10 text-center">
          <Link
            href="/host-event"
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            ← Back to Host Event Page
          </Link>
        </div>
      </div>
    </div>
  );
}
