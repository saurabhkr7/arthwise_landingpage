const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

function loadComponent(name, dependencies = {}) {
  const filename = path.join(__dirname, '../src/features/organizer-dashboard/components', `${name}.tsx`);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, esModuleInterop: true,
  } });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', outputText)(
    (id) => dependencies[id] || require(id), module, module.exports);
  return module.exports;
}
const badge = loadComponent('MarketSourceBadge');
const { default: Status } = loadComponent('EventSessionStatus', { './MarketSourceBadge': badge });
const render = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));

test('trade badges label historical records and keep old API records unlabelled', () => {
  assert.equal(render(badge.default, { record: {} }), '');
  const sim = render(badge.default, { record: { marketDataMode: 'SCENARIO_SIMULATION', marketContextLabel: 'Simulation 1', programSessionTitle: 'Holiday round', autoSettled: true } });
  assert.match(sim, /Simulation 1/);
  assert.match(sim, /Holiday round/);
  assert.match(sim, /Auto-settled/);
  assert.match(sim, /dark:bg-violet/);
  assert.match(render(badge.default, { record: { marketDataMode: 'LIVE_MARKET', marketContextLabel: 'Live Market' } }), /Live Market/);
});

test('session heading displays simulation even when the parent event is live market', () => {
  const markup = render(Status, { event: { eventProgramEnabled: true, programSessionPhase: 'ACTIVE',
    activeProgramSession: { title: 'Simulation 2 · Finale', mode: 'SCENARIO_SIMULATION', marketContextLabel: 'Simulation 2' } } });
  assert.match(markup, /Trading now/);
  assert.match(markup, /Simulation 2/);
  assert.doesNotMatch(markup, /Live Market/);
});

test('session gaps and completion are displayed without inventing an active session', () => {
  const event = { eventProgramEnabled: true, programSessionPhase: 'BETWEEN_SESSIONS',
    nextProgramSession: { title: 'Live Market · Resumed', startsAt: '2026-11-25T03:45:00Z' } };
  const gap = render(Status, { event });
  assert.match(gap, /Trading paused/);
  assert.match(gap, /9:15/);
  assert.match(gap, /IST/);
  const completed = render(Status, { event: { ...event, programSessionPhase: 'COMPLETED' } });
  assert.match(completed, /Sessions finished/);
  assert.doesNotMatch(completed, /Next:/);
  assert.equal(render(Status, { event: { eventProgramEnabled: false } }), '');
});
