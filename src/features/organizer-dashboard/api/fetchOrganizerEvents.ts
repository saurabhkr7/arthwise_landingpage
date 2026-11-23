export class OrganizerSessionExpiredError extends Error {}

export async function fetchOrganizerEvents({ apiBaseUrl, token, signal, fetchImpl = fetch }: {
  apiBaseUrl: string;
  token: string;
  signal?: AbortSignal;
  fetchImpl?: typeof fetch;
}): Promise<any[]> {
  const response = await fetchImpl(`${apiBaseUrl.replace(/\/$/, "")}/market-event/organizer/list`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal,
  });
  const body = await response.json();
  if (response.status === 401 || /expired|login again|invalid token/i.test(body?.message || "")) {
    throw new OrganizerSessionExpiredError("Please sign in again.");
  }
  if (!response.ok || !body.success || !Array.isArray(body.events)) {
    throw new Error(body.message || "Failed to load events.");
  }
  return body.events;
}
