"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { attemptDeepLink, getAppStoreUrl, isMobileDevice, APP_CONFIG } from "@/lib/deeplink";

const configuredApiBase = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";
const API_BASE = configuredApiBase.replace(/\/+$/, "").endsWith("/api")
  ? configuredApiBase.replace(/\/+$/, "")
  : `${configuredApiBase.replace(/\/+$/, "")}/api`;

type VerificationState = "loading" | "success" | "error" | "no_token";

export default function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const initialStatus = searchParams.get("status");
  const initialMessage = searchParams.get("message");

  const [state, setState] = useState<VerificationState>(() => {
    if (initialStatus === "success") return "success";
    if (initialStatus === "error") return "error";
    if (token) return "loading";
    return "no_token";
  });

  const [errorMessage, setErrorMessage] = useState<string>(
    initialMessage ? decodeURIComponent(initialMessage.replace(/\+/g, " ")) : ""
  );

  const verifyToken = useCallback(async (tokenToVerify: string) => {
    try {
      setState("loading");
      const response = await fetch(`${API_BASE}/user/verify-email/${encodeURIComponent(tokenToVerify)}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.status === "success") {
        setState("success");
      } else {
        setState("error");
        setErrorMessage(data.message || "Invalid or expired verification link.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setState("error");
      setErrorMessage("Unable to connect to server. Please check your internet connection.");
    }
  }, []);

  useEffect(() => {
    if (initialStatus === "success") {
      setState("success");
    } else if (initialStatus === "error") {
      setState("error");
    } else if (token) {
      verifyToken(token);
    } else {
      setState("no_token");
    }
  }, [token, initialStatus, verifyToken]);

  const handleOpenApp = async () => {
    const isMobile = isMobileDevice();
    const appStoreUrl = getAppStoreUrl();

    if (!isMobile) {
      window.open(APP_CONFIG.PLAY_STORE_URL, "_blank");
      return;
    }

    // Attempt to open the app via deep link scheme
    await attemptDeepLink("arthwise://timeline", "post", "verified", (storeUrl) => {
      window.location.href = storeUrl;
    });
  };

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* State: LOADING */}
      {state === "loading" && (
        <div className="bg-white dark:bg-dark_border/30 rounded-3xl p-8 md:p-12 shadow-xl border border-border dark:border-dark_border text-center backdrop-blur-md">
          <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping opacity-30"></div>
            <div className="w-20 h-20 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin flex items-center justify-center"></div>
            <Icon icon="solar:shield-check-bold" className="text-3xl text-primary absolute" />
          </div>
          <h2 className="text-28 md:text-36 font-bold text-midnight_text dark:text-white mb-4">
            Verifying Your Account
          </h2>
          <p className="text-16 md:text-18 text-body dark:text-white/70 max-w-md mx-auto leading-relaxed">
            Please wait while we confirm your email address and activate your trading privileges...
          </p>
        </div>
      )}

      {/* State: SUCCESS */}
      {state === "success" && (
        <div className="space-y-8">
          {/* Main Success Card */}
          <div className="bg-white dark:bg-dark_border/20 rounded-3xl p-8 md:p-12 shadow-2xl border border-emerald-500/20 dark:border-emerald-500/30 text-center relative overflow-hidden backdrop-blur-md">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-primary to-blue-600"></div>

            {/* Glowing Success Badge */}
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"></div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 relative">
                <Icon icon="lucide:check" className="text-4xl text-white stroke-[3]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
              <Icon icon="solar:verified-check-bold" className="text-base" />
              Verified & Activated
            </div>

            <h1 className="text-30 md:text-42 font-extrabold text-midnight_text dark:text-white tracking-tight mb-4">
              Email Verified Successfully!
            </h1>

            <p className="text-16 md:text-18 text-body dark:text-white/75 max-w-xl mx-auto mb-8 leading-relaxed">
              Your Arthwise account is now fully active. You can now access all features including live paper trading, fantasy stock leagues, and expert discussions.
            </p>

            {/* Unlocked Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-midnight_text/70 border border-slate-100 dark:border-white/5 flex flex-col justify-between hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Icon icon="solar:wallet-money-bold-duotone" className="text-24" />
                </div>
                <div>
                  <h3 className="text-16 font-bold text-midnight_text dark:text-white mb-1">
                    ₹10 Lakhs Virtual Money
                  </h3>
                  <p className="text-13 text-body dark:text-white/60">
                    Practice trading stocks and F&O risk-free with live NSE market prices.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-midnight_text/70 border border-slate-100 dark:border-white/5 flex flex-col justify-between hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-3">
                  <Icon icon="solar:chart-2-bold-duotone" className="text-24" />
                </div>
                <div>
                  <h3 className="text-16 font-bold text-midnight_text dark:text-white mb-1">
                    Live Options Simulation
                  </h3>
                  <p className="text-13 text-body dark:text-white/60">
                    Simulate Nifty, Bank Nifty & stock option chains with realistic execution.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-midnight_text/70 border border-slate-100 dark:border-white/5 flex flex-col justify-between hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-3">
                  <Icon icon="solar:cup-star-bold-duotone" className="text-24" />
                </div>
                <div>
                  <h3 className="text-16 font-bold text-midnight_text dark:text-white mb-1">
                    StockHub Contests
                  </h3>
                  <p className="text-13 text-body dark:text-white/60">
                    Join trading leagues, climb the leaderboards, and win real rewards.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleOpenApp}
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-darkprimary text-white rounded-xl font-bold text-16 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-primary/25 cursor-pointer"
              >
                <Icon icon="solar:smartphone-2-bold" className="text-22" />
                Open Arthwise App
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-midnight_text dark:text-white rounded-xl font-bold text-16 flex items-center justify-center gap-2 transition-all duration-300"
              >
                Go to Homepage
                <Icon icon="lucide:arrow-right" className="text-18" />
              </Link>
            </div>

            {/* App Store Download Badges */}
            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/10 text-center">
              <p className="text-14 font-medium text-body dark:text-white/60 mb-4">
                Don&apos;t have the app yet? Download now:
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.arthwise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 duration-200"
                >
                  <Image
                    src="/images/footer/play.png"
                    alt="Get it on Google Play"
                    width={150}
                    height={45}
                    className="w-auto h-11"
                  />
                </Link>
                <Link
                  href="https://apps.apple.com/app/arthwise/id6502371508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 duration-200"
                >
                  <Image
                    src="/images/footer/store.png"
                    alt="Download on the App Store"
                    width={150}
                    height={45}
                    className="w-auto h-11"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* State: ERROR */}
      {state === "error" && (
        <div className="bg-white dark:bg-dark_border/20 rounded-3xl p-8 md:p-12 shadow-2xl border border-red-500/20 dark:border-red-500/30 text-center relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500"></div>

          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 flex items-center justify-center border border-red-200 dark:border-red-800">
              <Icon icon="solar:danger-triangle-bold" className="text-36" />
            </div>
          </div>

          <h1 className="text-28 md:text-36 font-bold text-midnight_text dark:text-white mb-3">
            Verification Link Invalid or Expired
          </h1>

          <p className="text-16 text-body dark:text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
            {errorMessage ||
              "This verification link may have already been used, or it has expired (links are valid for 24 hours). You can request a fresh verification link from within the mobile app."}
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 max-w-lg mx-auto mb-8 text-left">
            <div className="flex items-start gap-3">
              <Icon icon="solar:info-circle-bold" className="text-20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-13 text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong className="block font-semibold mb-0.5">How to get a new link:</strong>
                Open the Arthwise app and navigate to your Timeline. Tap <em>&quot;Verify Now&quot;</em> on the banner at the top of your feed to send a fresh verification email.
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleOpenApp}
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-darkprimary text-white rounded-xl font-bold text-16 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-primary/25 cursor-pointer"
            >
              <Icon icon="solar:smartphone-2-bold" className="text-22" />
              Open Arthwise App
            </button>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-midnight_text dark:text-white rounded-xl font-bold text-16 flex items-center justify-center gap-2 transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      )}

      {/* State: NO TOKEN PROVIDED */}
      {state === "no_token" && (
        <div className="bg-white dark:bg-dark_border/20 rounded-3xl p-8 md:p-12 shadow-2xl border border-border dark:border-dark_border text-center backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            <Icon icon="solar:letter-unread-bold" className="text-32" />
          </div>

          <h1 className="text-28 md:text-36 font-bold text-midnight_text dark:text-white mb-3">
            Email Verification
          </h1>

          <p className="text-16 text-body dark:text-white/70 max-w-md mx-auto mb-8 leading-relaxed">
            Please click on the verification link sent to your registered email address to complete your account setup.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleOpenApp}
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-darkprimary text-white rounded-xl font-bold text-16 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-primary/25 cursor-pointer"
            >
              <Icon icon="solar:smartphone-2-bold" className="text-22" />
              Open Arthwise App
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-midnight_text dark:text-white rounded-xl font-bold text-16 flex items-center justify-center gap-2 transition-all duration-300"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
