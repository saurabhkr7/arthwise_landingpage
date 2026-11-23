// Run with: node --experimental-strip-types --test tests/organizerLeaderboard.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { fetchOrganizerLeaderboard } = require('../src/features/organizer-dashboard/api/fetchOrganizerLeaderboard.ts');

const makeParticipants = (count) => Array.from({ length: count }, (_, i) => ({
  userId: `user-${i + 1}`, rank: i + 1, displayName: `Participant ${i + 1}`,
  customFieldValues: { team: i >= 100 ? 'Second-page team' : 'First-page team' },
  totalTrades: 1,
}));
const response = (body, status = 200) => ({ ok: status >= 200 && status < 300, json: async () => body });
const options = (fetchImpl) => ({ apiBaseUrl: 'https://api.example.test/api/', eventId: 'event-1', token: 'test-only-token', fetchImpl });

test('loads all 123 users, including the 23 beyond the API cap', async () => {
  const participants = makeParticipants(123);
  const offsets = [];
  const result = await fetchOrganizerLeaderboard(options(async (url, init) => {
    const query = new URL(url).searchParams;
    const offset = Number(query.get('offset'));
    offsets.push(offset);
    assert.equal(query.get('limit'), '100');
    assert.equal(init.headers.Authorization, 'Bearer test-only-token');
    assert.equal(init.cache, 'no-store');
    return response({ success: true, totalParticipants: 123, leaderboard: participants.slice(offset, offset + 100) });
  }));
  assert.deepEqual(offsets, [0, 100]);
  assert.equal(result.totalParticipants, 123);
  assert.deepEqual(result.participants, participants);
  assert.equal(result.participants.filter(p => p.displayName.includes('123')).length, 1);
  assert.equal(result.participants.filter(p => p.customFieldValues.team === 'Second-page team').length, 23);
  assert.equal(result.participants.reduce((sum, p) => sum + p.totalTrades, 0), 123);
});

test('loads the full 500-person event without an extra empty request', async () => {
  const participants = makeParticipants(500);
  const offsets = [];
  const result = await fetchOrganizerLeaderboard(options(async (url) => {
    const offset = Number(new URL(url).searchParams.get('offset'));
    offsets.push(offset);
    return response({ success: true, totalParticipants: 500, leaderboard: participants.slice(offset, offset + 100) });
  }));
  assert.deepEqual(offsets, [0, 100, 200, 300, 400]);
  assert.equal(result.participants.length, 500);
});

test('follows the actual page size if the API applies a smaller cap', async () => {
  const participants = makeParticipants(123);
  const offsets = [];
  await fetchOrganizerLeaderboard(options(async (url) => {
    const offset = Number(new URL(url).searchParams.get('offset'));
    offsets.push(offset);
    return response({ success: true, totalParticipants: 123, leaderboard: participants.slice(offset, offset + 50) });
  }));
  assert.deepEqual(offsets, [0, 50, 100]);
});

test('zero participants is a valid, complete list', async () => {
  const result = await fetchOrganizerLeaderboard(options(async () => response({ success: true, totalParticipants: 0, leaderboard: [] })));
  assert.deepEqual(result, { participants: [], totalParticipants: 0 });
});

test('restarts pagination once if registration totals change between pages', async () => {
  const participants = makeParticipants(124);
  let calls = 0;
  const result = await fetchOrganizerLeaderboard(options(async (url) => {
    calls++;
    const offset = Number(new URL(url).searchParams.get('offset'));
    return response({ success: true, totalParticipants: calls === 1 ? 123 : 124, leaderboard: participants.slice(offset, offset + 100) });
  }));
  assert.equal(calls, 4);
  assert.deepEqual(result.participants, participants);
  assert.equal(result.totalParticipants, 124);
});

test('retries when a ranking change duplicates a user across pages', async () => {
  const participants = makeParticipants(123);
  let calls = 0;
  const result = await fetchOrganizerLeaderboard(options(async (url) => {
    calls++;
    const offset = Number(new URL(url).searchParams.get('offset'));
    const page = participants.slice(offset, offset + 100);
    if (calls === 2) page[0] = participants[99];
    return response({ success: true, totalParticipants: 123, leaderboard: page });
  }));
  assert.equal(calls, 4);
  assert.deepEqual(result.participants, participants);
});

test('never returns a silently truncated list if later pages are empty', async () => {
  const participants = makeParticipants(100);
  let calls = 0;
  await assert.rejects(fetchOrganizerLeaderboard(options(async (url) => {
    calls++;
    const offset = Number(new URL(url).searchParams.get('offset'));
    return response({ success: true, totalParticipants: 123, leaderboard: offset ? [] : participants });
  })), /participant list changed/i);
  assert.equal(calls, 4);
});

test('later-page errors reject the read instead of publishing the first 100 rows', async () => {
  let calls = 0;
  await assert.rejects(fetchOrganizerLeaderboard(options(async () => {
    calls++;
    return calls === 1
      ? response({ success: true, totalParticipants: 123, leaderboard: makeParticipants(100) })
      : response({ success: false, message: 'Temporarily unavailable' }, 503);
  })), /Temporarily unavailable/);
  assert.equal(calls, 2);
});

test('does not retry authentication failures or rate limits', async () => {
  for (const status of [401, 429]) {
    let calls = 0;
    await assert.rejects(fetchOrganizerLeaderboard(options(async () => {
      calls++;
      return response({ success: false, message: 'Access unavailable' }, status);
    })), /Access unavailable/);
    assert.equal(calls, 1);
  }
});

test('rejects malformed responses rather than showing a misleading zero count', async () => {
  for (const body of [
    { success: true, leaderboard: [] },
    { success: true, totalParticipants: -1, leaderboard: [] },
    { success: true, totalParticipants: 1, leaderboard: [{ rank: 1 }] },
    { success: true, totalParticipants: 0, leaderboard: null },
  ]) {
    await assert.rejects(fetchOrganizerLeaderboard(options(async () => response(body))), /invalid participant|without an account ID/);
  }
});

test('hidden responses cannot clear an organiser list silently', async () => {
  await assert.rejects(fetchOrganizerLeaderboard(options(async () => response({
    success: true, leaderboardHidden: true, totalParticipants: 0, leaderboard: [],
  }))), /sign in again/);
});

test('cancellation prevents further page requests', async () => {
  const controller = new AbortController();
  let calls = 0;
  await assert.rejects(fetchOrganizerLeaderboard({
    ...options(async (_url, init) => {
      calls++;
      assert.equal(init.signal, controller.signal);
      controller.abort();
      return response({ success: true, totalParticipants: 123, leaderboard: makeParticipants(100) });
    }), signal: controller.signal,
  }), { name: 'AbortError' });
  assert.equal(calls, 1);
});
