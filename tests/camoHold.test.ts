// Run with: npm test   (node's built-in runner; Node 22.18+ loads .ts directly)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CamoHold } from '../src/camoHold.ts';
import { exposureFor } from '../src/suspicion.ts';

/** Feeds `seconds` of a constant score at 30 fps. */
const hold = (h: CamoHold, camo: number, seconds: number) => {
  for (let i = 0; i < Math.round(seconds * 30); i++) h.add(camo, 1 / 30);
};

test('a score held for 3 seconds counts', () => {
  const h = new CamoHold(3);
  hold(h, 72.9, 3.2);
  assert.equal(h.best, 72);
});

test('a score held for under 3 seconds does not count', () => {
  const h = new CamoHold(3);
  hold(h, 90, 2.5);
  assert.equal(h.best, 0);
});

test('a one-second spike on top of a lower hold does not count', () => {
  const h = new CamoHold(3);
  hold(h, 40, 5);
  hold(h, 95, 1);
  hold(h, 40, 5);
  assert.equal(h.best, 40);
});

test('the best hold across several holds wins, and a later worse hold never lowers it', () => {
  const h = new CamoHold(3);
  hold(h, 30, 4);
  hold(h, 64, 4);
  hold(h, 10, 20);
  assert.equal(h.best, 64);
});

test('a dip inside the window breaks the hold: the held score is the lowest in the window', () => {
  const h = new CamoHold(3);
  hold(h, 80, 2);
  hold(h, 50, 0.1);
  hold(h, 80, 2);
  assert.equal(h.best, 50); // 3 s at 50 or better, but not yet 3 s at 80: the window still holds the dip
  hold(h, 80, 1.2);
  assert.equal(h.best, 80); // the dip has left the window and 3 s at 80 have now passed
});

test('a new hunt starts a new window but keeps the best so far', () => {
  const h = new CamoHold(3);
  hold(h, 55, 4);
  h.beginHunt();
  hold(h, 99, 2); // only 2 s into the new hunt: no hold yet
  assert.equal(h.best, 55);
  hold(h, 99, 1.5);
  assert.equal(h.best, 99);
});

test('reset starts the run over', () => {
  const h = new CamoHold(3);
  hold(h, 70, 4);
  h.reset();
  assert.equal(h.best, 0);
});

test('values are clamped to a whole number from 0 to 100, and junk counts as 0', () => {
  const h = new CamoHold(3);
  hold(h, 250, 4);
  assert.equal(h.best, 100);
  const g = new CamoHold(3);
  hold(g, NaN, 4);
  hold(g, -20, 4);
  assert.equal(g.best, 0);
  assert.ok(Number.isInteger(h.best) && Number.isInteger(g.best));
});

test('best is kept after the hunt ends (nothing resets it until the next run)', () => {
  const h = new CamoHold(3);
  hold(h, 61, 3.5);
  h.beginHunt(); // e.g. the next round
  assert.equal(h.best, 61);
});

const CURVE: [number, number][] = [[0, 1], [50, 0.2], [100, 0]];

test('exposureFor joins the points with straight lines and clamps outside 0..100', () => {
  assert.equal(exposureFor(0, CURVE), 1);
  assert.ok(Math.abs(exposureFor(25, CURVE) - 0.6) < 1e-9);
  assert.ok(Math.abs(exposureFor(50, CURVE) - 0.2) < 1e-9);
  assert.ok(Math.abs(exposureFor(75, CURVE) - 0.1) < 1e-9);
  assert.equal(exposureFor(100, CURVE), 0);
  assert.equal(exposureFor(-5, CURVE), 1);
  assert.equal(exposureFor(140, CURVE), 0);
  assert.equal(exposureFor(NaN, CURVE), 1);
});
