const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { renderToString } = require('react-dom/server');

function loadTs(relativePath, dependencies = {}) {
  const filename = path.join(__dirname, '..', relativePath);
  const source = fs.readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true,
  } });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', outputText)(
    (id) => Object.prototype.hasOwnProperty.call(dependencies, id) ? dependencies[id] : require(id), module, module.exports
  );
  return module.exports;
}
const api = loadTs('src/features/organizer-dashboard/api/fetchOrganizerEvents.ts');

test('server and browser initial markup match even when the browser has cached events', () => {
  let cacheReads = 0;
  const { useOrganizerEvents } = loadTs('src/features/organizer-dashboard/hooks/useOrganizerEvents.ts', {
    '@/lib/organizerCache': {
      getCachedOrganizerEvents: () => { cacheReads++; return { events: [{ _id: 'cached-event' }], isFresh: true }; },
      setCachedOrganizerEvents: () => {}, invalidateOrganizerDashboardCache: () => {},
    },
    '../api/fetchOrganizerEvents': api,
  });
  const router = { push() {} };
  function Dashboard() {
    const { loading, events } = useOrganizerEvents({ apiBaseUrl: 'http://localhost:8088/api', router });
    return React.createElement('div', { className: loading ? 'loading' : 'events' }, loading ? 'Loading events' : String(events.length));
  }
  const original = global.window;
  try {
    delete global.window;
    const serverMarkup = renderToString(React.createElement(Dashboard));
    global.window = { sessionStorage: { getItem: () => 'browser-cache' } };
    const firstBrowserMarkup = renderToString(React.createElement(Dashboard));
    assert.equal(serverMarkup, firstBrowserMarkup);
    assert.match(serverMarkup, /Loading events/);
    assert.equal(cacheReads, 0, 'browser cache must not be read during render');
  } finally {
    if (original === undefined) delete global.window;
    else global.window = original;
  }
});

test('event-list requests bypass HTTP caching and return newly created events', async () => {
  const events = [{ _id: 'new-event', title: 'Local Test - Two Lakh Simulation Grants' }];
  const result = await api.fetchOrganizerEvents({ apiBaseUrl: 'http://localhost:8088/api/', token: 'test-token',
    fetchImpl: async (url, init) => {
      assert.equal(url, 'http://localhost:8088/api/market-event/organizer/list');
      assert.equal(init.cache, 'no-store');
      assert.equal(init.headers.Authorization, 'Bearer test-token');
      return { ok: true, status: 200, json: async () => ({ success: true, events }) };
    },
  });
  assert.deepEqual(result, events);
});

test('expired sessions are distinguished from server failures', async () => {
  await assert.rejects(api.fetchOrganizerEvents({ apiBaseUrl: '/api', token: 'expired',
    fetchImpl: async () => ({ ok: false, status: 401, json: async () => ({ message: 'Token expired' }) }),
  }), api.OrganizerSessionExpiredError);
  await assert.rejects(api.fetchOrganizerEvents({ apiBaseUrl: '/api', token: 'test-token',
    fetchImpl: async () => ({ ok: false, status: 500, json: async () => ({ message: 'Could not load events' }) }),
  }), /Could not load events/);
});
