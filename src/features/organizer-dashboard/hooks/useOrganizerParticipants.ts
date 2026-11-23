"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchOrganizerLeaderboard, type OrganizerLeaderboard } from "../api/fetchOrganizerLeaderboard";

type Options = { apiBaseUrl: string; eventSlug: string; token: string };
type Request = { key: string; controller: AbortController; promise: Promise<void> };

export function useOrganizerParticipants({ apiBaseUrl, eventSlug, token }: Options) {
  const normalizedToken = token.trim();
  const scope = JSON.stringify([apiBaseUrl, eventSlug, normalizedToken]);
  const requestRef = useRef<Request | null>(null);
  const [snapshot, setSnapshot] = useState<{ scope: string; data: OrganizerLeaderboard } | null>(null);
  const [error, setError] = useState<{ scope: string; message: string } | null>(null);

  useEffect(() => () => {
    requestRef.current?.controller.abort();
    requestRef.current = null;
  }, [scope]);

  const refreshParticipants = useCallback((eventId: string): Promise<void> => {
    const key = JSON.stringify([scope, eventId]);
    const existing = requestRef.current;
    if (existing?.key === key) return existing.promise;
    existing?.controller.abort();

    const controller = new AbortController();
    const request: Request = { key, controller, promise: Promise.resolve() };
    requestRef.current = request;
    request.promise = fetchOrganizerLeaderboard({
      apiBaseUrl, eventId, token: normalizedToken, signal: controller.signal,
    }).then((data) => {
      if (requestRef.current !== request) return;
      // Publish all pages together so polling never briefly reduces the table
      // back to its first 100 rows or resets its local search/page selection.
      setSnapshot({ scope, data });
      setError(null);
    }).catch((reason: unknown) => {
      if (requestRef.current !== request || controller.signal.aborted) return;
      setError({ scope, message: reason instanceof Error ? reason.message : "Could not refresh participants." });
    }).finally(() => {
      if (requestRef.current === request) requestRef.current = null;
    });
    return request.promise;
  }, [apiBaseUrl, normalizedToken, scope]);

  const current = snapshot?.scope === scope ? snapshot.data : null;
  return {
    participants: current?.participants || [],
    totalParticipants: current?.totalParticipants ?? null,
    participantError: error?.scope === scope ? error.message : "",
    refreshParticipants,
  };
}
