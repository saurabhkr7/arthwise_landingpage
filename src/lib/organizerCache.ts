/**
 * In-memory and SessionStorage cache for Organizer Dashboard data.
 * Prevents redundant API roundtrips when navigating back and forth
 * between the dashboard and individual event management pages.
 */

const CACHE_KEY = "organizer_dashboard_events_cache";
const CACHE_TIME_KEY = "organizer_dashboard_events_time";
export const DASHBOARD_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CachedData {
  events: any[];
  timestamp: number;
}

// In-memory reference for instantaneous soft navigations in Next.js
let inMemoryCache: CachedData | null = null;

export function getCachedOrganizerEvents(ttlMs: number = DASHBOARD_CACHE_TTL_MS): {
  events: any[];
  isFresh: boolean;
  timestamp: number;
} | null {
  const now = Date.now();

  // 1. Check in-memory cache first
  if (inMemoryCache && Array.isArray(inMemoryCache.events)) {
    const isFresh = now - inMemoryCache.timestamp < ttlMs;
    return {
      events: inMemoryCache.events,
      isFresh,
      timestamp: inMemoryCache.timestamp,
    };
  }

  // 2. Check sessionStorage (persists across reloads & history back/forward)
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    const rawTime = sessionStorage.getItem(CACHE_TIME_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    const timestamp = rawTime ? parseInt(rawTime, 10) : 0;
    const isFresh = now - timestamp < ttlMs;

    // Repopulate in-memory cache
    inMemoryCache = { events: parsed, timestamp };

    return { events: parsed, isFresh, timestamp };
  } catch (err) {
    console.warn("Failed to read organizer dashboard cache:", err);
    return null;
  }
}

export function setCachedOrganizerEvents(events: any[]): void {
  const timestamp = Date.now();
  inMemoryCache = { events, timestamp };

  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(events));
    sessionStorage.setItem(CACHE_TIME_KEY, timestamp.toString());
  } catch (err) {
    console.warn("Failed to write organizer dashboard cache:", err);
  }
}

export function invalidateOrganizerDashboardCache(): void {
  inMemoryCache = null;
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(CACHE_KEY);
    sessionStorage.removeItem(CACHE_TIME_KEY);
  } catch (err) {
    console.warn("Failed to invalidate organizer dashboard cache:", err);
  }
}
