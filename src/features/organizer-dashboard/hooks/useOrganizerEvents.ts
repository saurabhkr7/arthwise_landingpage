"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getCachedOrganizerEvents, setCachedOrganizerEvents, invalidateOrganizerDashboardCache } from "@/lib/organizerCache";
import { fetchOrganizerEvents, OrganizerSessionExpiredError } from "../api/fetchOrganizerEvents";

export function useOrganizerEvents({ apiBaseUrl, router }: {
  apiBaseUrl: string;
  router: { push: (path: string) => void };
}) {
  // These values must be identical in SSR and the first browser render.
  // Browser storage is read only after hydration in the effect below.
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const eventsRef = useRef<any[]>([]);
  const tokenRef = useRef("");
  const mounted = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  useEffect(() => { eventsRef.current = events; }, [events]);

  const fetchEvents = useCallback(async (forceRefresh = false, overrideToken?: string) => {
    const activeToken = overrideToken || tokenRef.current;
    if (!activeToken || requestRef.current) return;
    if (!forceRefresh) {
      const cached = getCachedOrganizerEvents();
      if (cached?.isFresh) {
        eventsRef.current = cached.events;
        setEvents(cached.events);
        setLoading(false);
        return;
      }
    }
    const controller = new AbortController();
    requestRef.current = controller;
    if (!eventsRef.current.length) setLoading(true);
    else setIsRefreshing(true);
    try {
      const fresh = await fetchOrganizerEvents({ apiBaseUrl, token: activeToken, signal: controller.signal });
      if (!mounted.current || requestRef.current !== controller) return;
      eventsRef.current = fresh;
      setEvents(fresh);
      setCachedOrganizerEvents(fresh);
      setError("");
    } catch (reason) {
      if (!mounted.current || controller.signal.aborted || requestRef.current !== controller) return;
      if (reason instanceof OrganizerSessionExpiredError) {
        invalidateOrganizerDashboardCache();
        sessionStorage.clear();
        router.push("/organizer/login");
      } else if (!eventsRef.current.length) {
        setError(reason instanceof Error ? reason.message : "Failed to load dashboard data.");
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        if (mounted.current) { setLoading(false); setIsRefreshing(false); }
      }
    }
  }, [apiBaseUrl, router]);

  useEffect(() => {
    mounted.current = true;
    const storedToken = sessionStorage.getItem("organizer_token");
    if (!storedToken) {
      router.push("/organizer/login");
      return () => { mounted.current = false; };
    }
    tokenRef.current = storedToken;
    setToken(storedToken);
    setOrganizerName(sessionStorage.getItem("organizer_name") || "Organizer");
    const cached = getCachedOrganizerEvents();
    if (cached) {
      eventsRef.current = cached.events;
      setEvents(cached.events);
      setLoading(false);
    }
    // Stale-while-revalidate: paint cache after hydration, but always ask for
    // current ownership/events when entering the dashboard, even inside TTL.
    void fetchEvents(true, storedToken);
    const onFocus = () => { void fetchEvents(true, storedToken); };
    const onVisible = () => { if (document.visibilityState === "visible") onFocus(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      mounted.current = false;
      requestRef.current?.abort();
      requestRef.current = null;
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [fetchEvents, router]);

  return { events, setEvents, loading, isRefreshing, error, setError, token, organizerName, fetchEvents };
}
