export type OrganizerParticipant = {
  userId: string;
  [field: string]: any;
};

export type OrganizerLeaderboard = {
  participants: OrganizerParticipant[];
  totalParticipants: number;
};

type Options = {
  apiBaseUrl: string;
  eventId: string;
  token: string;
  signal?: AbortSignal;
  fetchImpl?: typeof fetch;
};

class ParticipantListChangedError extends Error {
  constructor() {
    super("The participant list changed during refresh. Please refresh again.");
  }
}

const PAGE_SIZE = 100;

async function fetchCompleteList({
  apiBaseUrl, eventId, token, signal, fetchImpl = fetch,
}: Options): Promise<OrganizerLeaderboard> {
  const participants: OrganizerParticipant[] = [];
  const seenUserIds = new Set<string>();
  let totalParticipants: number | undefined;

  do {
    signal?.throwIfAborted();
    const query = new URLSearchParams({ limit: String(PAGE_SIZE), offset: String(participants.length) });
    const response = await fetchImpl(
      `${apiBaseUrl.replace(/\/$/, "")}/market-event/${encodeURIComponent(eventId)}/leaderboard?${query}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store", signal },
    );
    const body = await response.json();
    if (!response.ok || !body.success) {
      throw new Error(body.message || "Could not refresh the participant list.");
    }
    if (body.leaderboardHidden) {
      throw new Error("The organiser leaderboard is unavailable for this session. Please sign in again.");
    }
    if (!Array.isArray(body.leaderboard) || !Number.isSafeInteger(body.totalParticipants) || body.totalParticipants < 0) {
      throw new Error("The server returned an invalid participant list.");
    }
    if (totalParticipants !== undefined && body.totalParticipants !== totalParticipants) {
      throw new ParticipantListChangedError();
    }
    totalParticipants = body.totalParticipants;
    if (!body.leaderboard.length && participants.length < totalParticipants!) {
      throw new ParticipantListChangedError();
    }
    for (const participant of body.leaderboard) {
      if (typeof participant?.userId !== "string" || !participant.userId) {
        throw new Error("The server returned a participant without an account ID.");
      }
      // Ranking can move between HTTP pages. Never publish a list that silently
      // duplicates one participant and omits another; retry the whole read once.
      if (seenUserIds.has(participant.userId)) throw new ParticipantListChangedError();
      seenUserIds.add(participant.userId);
      participants.push(participant);
    }
    if (participants.length > totalParticipants!) throw new ParticipantListChangedError();
  } while (participants.length < totalParticipants!);

  return { participants, totalParticipants: totalParticipants! };
}

export async function fetchOrganizerLeaderboard(options: Options): Promise<OrganizerLeaderboard> {
  try {
    return await fetchCompleteList(options);
  } catch (error) {
    if (!(error instanceof ParticipantListChangedError)) throw error;
    options.signal?.throwIfAborted();
    return fetchCompleteList(options);
  }
}
