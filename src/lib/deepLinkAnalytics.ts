/**
 * Deep Link Analytics Service
 * Tracks all deep link interactions for conversion optimization
 */

export interface DeepLinkAnalytics {
  action: "click" | "opened" | "fallback" | "install" | "browser_continue";
  type: "post" | "contest" | "user" | "course";
  id: string;
  timestamp: string;
  device: "mobile" | "desktop" | "tablet";
  os: "android" | "ios" | "windows" | "macos" | "linux" | "unknown";
  result?: "success" | "failed" | "timeout";
}

/**
 * Get device type
 */
function getDeviceType(): "mobile" | "desktop" | "tablet" {
  if (typeof navigator === "undefined") return "desktop";

  const userAgent = navigator.userAgent.toLowerCase();

  if (/ipad|android(?!.*mobile)/.test(userAgent)) {
    return "tablet";
  }

  if (/android|webos|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent)) {
    return "mobile";
  }

  return "desktop";
}

/**
 * Get operating system
 */
function getOS(): DeepLinkAnalytics["os"] {
  if (typeof navigator === "undefined") return "unknown";

  const userAgent = navigator.userAgent.toLowerCase();

  if (/android/.test(userAgent)) return "android";
  if (/iphone|ipad|ipod/.test(userAgent)) return "ios";
  if (/win/.test(userAgent)) return "windows";
  if (/mac/.test(userAgent)) return "macos";
  if (/linux/.test(userAgent)) return "linux";

  return "unknown";
}

/**
 * Record deep link event
 */
export function recordDeepLinkEvent(
  action: DeepLinkAnalytics["action"],
  type: DeepLinkAnalytics["type"],
  id: string,
  result?: DeepLinkAnalytics["result"]
): void {
  const event: DeepLinkAnalytics = {
    action,
    type,
    id,
    timestamp: new Date().toISOString(),
    device: getDeviceType(),
    os: getOS(),
    result,
  };

  // Log to console
  console.log("[DeepLinkAnalytics]", event);

  // Send to analytics service (Google Analytics, Mixpanel, etc.)
  sendToAnalyticsService(event);

  // Store in localStorage for debugging
  try {
    const key = `deeplink_${Date.now()}`;
    const recentEvents = JSON.parse(localStorage.getItem("deeplink_events") || "[]");
    recentEvents.push(event);
    // Keep only last 50 events
    if (recentEvents.length > 50) recentEvents.shift();
    localStorage.setItem("deeplink_events", JSON.stringify(recentEvents));
  } catch (error) {
    // Silently fail if localStorage unavailable
  }
}

/**
 * Send event to external analytics service
 */
function sendToAnalyticsService(event: DeepLinkAnalytics): void {
  try {
    // Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", `deeplink_${event.action}`, {
        event_category: "deep_link",
        event_label: `${event.type}/${event.id}`,
        device_type: event.device,
        os: event.os,
        result: event.result,
      });
    }

    // Custom tracking endpoint (optional)
    const trackingUrl = process.env.NEXT_PUBLIC_TRACKING_URL;
    if (trackingUrl) {
      fetch(trackingUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      }).catch(() => {
        // Silently fail
      });
    }
  } catch (error) {
    console.error("Analytics error:", error);
  }
}

/**
 * Get deep link conversion metrics (from localStorage)
 */
export function getDeepLinkMetrics(): {
  totalClicks: number;
  appOpened: number;
  fallbacks: number;
  installs: number;
  conversionRate: number;
} {
  try {
    const events: DeepLinkAnalytics[] = JSON.parse(
      localStorage.getItem("deeplink_events") || "[]"
    );

    const metrics = {
      totalClicks: events.filter((e) => e.action === "click").length,
      appOpened: events.filter((e) => e.action === "opened").length,
      fallbacks: events.filter((e) => e.action === "fallback").length,
      installs: events.filter((e) => e.action === "install").length,
      conversionRate: 0,
    };

    if (metrics.totalClicks > 0) {
      metrics.conversionRate =
        (metrics.appOpened + metrics.installs) / metrics.totalClicks;
    }

    return metrics;
  } catch (error) {
    return {
      totalClicks: 0,
      appOpened: 0,
      fallbacks: 0,
      installs: 0,
      conversionRate: 0,
    };
  }
}

/**
 * Clear all deep link events (debugging)
 */
export function clearDeepLinkEvents(): void {
  try {
    localStorage.removeItem("deeplink_events");
    console.log("Deep link events cleared");
  } catch (error) {
    console.error("Error clearing events:", error);
  }
}
