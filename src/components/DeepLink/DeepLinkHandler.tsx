"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  attemptDeepLink,
  generateDeepLink,
  getAppStoreUrl,
  DeepLinkType,
  isMobileDevice,
} from "@/lib/deeplink";
import { recordDeepLinkEvent } from "@/lib/deepLinkAnalytics";

interface DeepLinkHandlerProps {
  type: DeepLinkType;
  id: string;
  content?: {
    title: string;
    description: string;
    image?: string;
    category?: string;
  };
  isLoading?: boolean;
}

const DeepLinkHandler: React.FC<DeepLinkHandlerProps> = ({
  type,
  id,
  content,
  isLoading = false,
}) => {
  const router = useRouter();
  const [showContinueBrowser, setShowContinueBrowser] = useState(false);
  const [selectedAppStore, setSelectedAppStore] = useState<"play" | "app-store" | null>(null);

  const deepLink = generateDeepLink(type, id);
  const appStoreUrl = getAppStoreUrl();
  const isMobile = isMobileDevice();

  const handleOpenApp = async () => {
    recordDeepLinkEvent("click", type, id);

    if (!isMobile) {
      recordDeepLinkEvent("fallback", type, id, "failed");
      window.open(appStoreUrl, "_blank");
      return;
    }

    await attemptDeepLink(deepLink, type, id, (storeUrl) => {
      recordDeepLinkEvent("fallback", type, id, "timeout");
      window.location.href = storeUrl;
    });
  };

  const handleDownloadApp = () => {
    recordDeepLinkEvent("install", type, id);
    window.open(appStoreUrl, "_blank");
    setSelectedAppStore(/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) ? "app-store" : "play");
  };

  const handleContinueBrowser = () => {
    recordDeepLinkEvent("browser_continue", type, id);
    setShowContinueBrowser(true);
    // Navigate to web version or stay on this page
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-darkmode dark:to-midnight_text flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Icon icon="solar:smartphone-bold" width="32" height="32" className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-midnight_text dark:text-white mb-2">
            Arthhwise
          </h1>
          <p className="text-muted dark:text-white/60">
            Open in app to see this {type}
          </p>
        </div>

        {/* Content Preview Card */}
        {content && !isLoading && (
          <div className="bg-white dark:bg-midnight_text rounded-2xl shadow-lg overflow-hidden mb-6 border border-grey/10 dark:border-white/5">
            {/* Image Preview */}
            {content.image && (
              <div className="relative w-full h-48 bg-slate-200 dark:bg-slate-800">
                <Image
                  src={content.image}
                  alt={content.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 448px"
                />
              </div>
            )}

            {/* Content Info */}
            <div className="p-6">
              {content.category && (
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                  {content.category}
                </span>
              )}
              <h2 className="text-xl font-bold text-midnight_text dark:text-white mb-2 line-clamp-2">
                {content.title}
              </h2>
              <p className="text-muted dark:text-white/60 text-sm line-clamp-3">
                {content.description}
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white dark:bg-midnight_text rounded-2xl shadow-lg p-8 mb-6 flex flex-col items-center justify-center min-h-64">
            <div className="animate-spin mb-4">
              <Icon icon="solar:refresh-bold" width="32" height="32" className="text-primary" />
            </div>
            <p className="text-muted dark:text-white/60 text-center">Loading content...</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          {/* Open in App Button */}
          <button
            onClick={handleOpenApp}
            disabled={isLoading}
            className="w-full py-4 px-4 bg-primary text-white rounded-xl font-semibold transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Icon icon="solar:alt-arrow-right-linear" width="18" height="18" />
            {isMobile ? "Open in App" : "Download App"}
          </button>

          {/* Install App Button */}
          {!isMobile && (
            <button
              onClick={handleDownloadApp}
              className="w-full py-3 px-4 border-2 border-primary text-primary rounded-xl font-semibold transition hover:bg-primary/5 flex items-center justify-center gap-2"
            >
              <Icon icon="solar:download-bold" width="18" height="18" />
              Download Arthhwise
            </button>
          )}
        </div>

        {/* Continue in Browser Option */}
        {!showContinueBrowser && (
          <button
            onClick={handleContinueBrowser}
            className="w-full py-3 text-muted dark:text-white/60 hover:text-midnight_text dark:hover:text-white transition text-sm font-medium"
          >
            Continue in web browser →
          </button>
        )}

        {/* Browser Redirect Message */}
        {showContinueBrowser && (
          <div className="text-center">
            <p className="text-sm text-muted dark:text-white/60 mb-3">
              Redirecting to Arthhwise website...
            </p>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-8 p-4 rounded-lg bg-slate-100 dark:bg-slate-900 text-center">
          <p className="text-xs text-muted dark:text-white/50">
            Arthhwise is a paper trading simulator with real NSE data.
          </p>
        </div>

        {/* Store Links */}
        <div className="flex gap-3 justify-center mt-6">
          <Link
            href="https://play.google.com/store/apps/details?id=com.arthwise"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-primary hover:text-blue-700 transition"
          >
            <Icon icon="mdi:google-play" width="16" height="16" />
            Play Store
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            href="https://apps.apple.com/app/arthwise/id6502371508"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-primary hover:text-blue-700 transition"
          >
            <Icon icon="mdi:apple" width="16" height="16" />
            App Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeepLinkHandler;
