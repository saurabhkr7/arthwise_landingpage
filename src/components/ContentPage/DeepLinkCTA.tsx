"use client";

import React from "react";
import { Icon } from "@iconify/react";
import {
  attemptDeepLink,
  generateDeepLink,
  getAppStoreUrl,
  DeepLinkType,
  isMobileDevice,
} from "@/lib/deeplink";
import { recordDeepLinkEvent } from "@/lib/deepLinkAnalytics";

interface DeepLinkCTAProps {
  type: DeepLinkType;
  id: string;
  fullWidth?: boolean;
}

const DeepLinkCTA: React.FC<DeepLinkCTAProps> = ({ type, id, fullWidth = false }) => {
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

  return (
    <button
      onClick={handleOpenApp}
      className={`${
        fullWidth ? "w-full" : ""
      } inline-flex items-center justify-center gap-2 bg-primary text-white py-2.5 px-6 rounded-xl font-semibold transition hover:bg-blue-700 active:scale-[0.98] shadow-sm`}
    >
      <Icon icon="solar:alt-arrow-right-linear" width="18" height="18" />
      <span>{isMobile ? "Open in App" : "Get the App"}</span>
    </button>
  );
};

export default DeepLinkCTA;
