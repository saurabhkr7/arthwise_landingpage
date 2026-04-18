/**
 * Deep Link Configuration and Utilities
 * Handles app deep linking with fallback to app stores
 */

export const APP_CONFIG = {
  PACKAGE_NAME: "com.arthwise",
  PLAY_STORE_URL: "https://play.google.com/store/apps/details?id=com.arthwise",
  APP_STORE_URL: "https://apps.apple.com/app/arthwise/id6502371508",
  DEEP_LINK_SCHEME: "arthwise://",
  FALLBACK_TIMEOUT: 1500, // ms
};

export type DeepLinkType = "post" | "contest" | "user" | "course";

export interface DeepLinkConfig {
  type: DeepLinkType;
  id: string;
  deepLink: string;
}

/**
 * Generate deep link URI
 */
export function generateDeepLink(type: DeepLinkType, id: string): string {
  return `${APP_CONFIG.DEEP_LINK_SCHEME}${type}/${id}`;
}

/**
 * Get app store URL based on device
 */
export function getAppStoreUrl(): string {
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return APP_CONFIG.APP_STORE_URL;
  }
  
  return APP_CONFIG.PLAY_STORE_URL;
}

/**
 * Detect if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
}

/**
 * Detect if app is installed (iOS only - best effort)
 * This is a limitation; Android doesn't provide reliable detection
 */
export function isAppInstalled(): Promise<boolean> {
  return new Promise((resolve) => {
    // For iOS, check URL scheme
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      
      const timer = setTimeout(() => {
        document.body.removeChild(iframe);
        resolve(false); // App not installed
      }, 100);
      
      iframe.onload = () => {
        clearTimeout(timer);
        document.body.removeChild(iframe);
        resolve(true); // App installed
      };
      
      iframe.src = APP_CONFIG.DEEP_LINK_SCHEME;
      document.body.appendChild(iframe);
    } else {
      // Android doesn't have reliable detection
      resolve(false);
    }
  });
}

/**
 * Log deep link events for tracking
 */
export function logDeepLinkEvent(
  action: "click" | "opened" | "fallback" | "install",
  type: DeepLinkType,
  id: string,
  metadata?: Record<string, any>
): void {
  if (typeof window === "undefined") return;

  const eventData = {
    timestamp: new Date().toISOString(),
    action,
    type,
    id,
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...metadata,
  };

  // Log to console (production: send to analytics service)
  console.log("[DeepLink]", eventData);

  // Send to your analytics service
  try {
    if ((window as any).gtag) {
      (window as any).gtag("event", `deeplink_${action}`, {
        event_category: "deep_link",
        event_label: `${type}/${id}`,
        ...metadata,
      });
    }
  } catch (error) {
    console.error("Analytics error:", error);
  }
}

/**
 * Attempt to open app with deep link and fallback to store
 */
export async function attemptDeepLink(
  deepLink: string,
  type: DeepLinkType,
  id: string,
  onFallback?: (storeUrl: string) => void
): Promise<void> {
  logDeepLinkEvent("click", type, id);

  // For non-mobile browsers, redirect to store directly
  if (!isMobileDevice()) {
    const storeUrl = getAppStoreUrl();
    onFallback?.(storeUrl);
    return;
  }

  // Set up fallback timer
  const fallbackTimer = setTimeout(() => {
    const storeUrl = getAppStoreUrl();
    logDeepLinkEvent("fallback", type, id, { reason: "timeout" });
    onFallback?.(storeUrl);
  }, APP_CONFIG.FALLBACK_TIMEOUT);

  // Attempt to open app
  try {
    window.location.href = deepLink;

    // Success tracking (if user switches to app)
    window.addEventListener("blur", () => {
      clearTimeout(fallbackTimer);
      logDeepLinkEvent("opened", type, id);
    });
  } catch (error) {
    clearTimeout(fallbackTimer);
    logDeepLinkEvent("fallback", type, id, { reason: "error", error: String(error) });
    const storeUrl = getAppStoreUrl();
    onFallback?.(storeUrl);
  }
}
