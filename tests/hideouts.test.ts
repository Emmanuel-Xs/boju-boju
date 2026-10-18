import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Hideouts } from '../src/hideouts.ts';

test('one win is not a regular; the third win at the same place is', () => {
  const h = new Hideouts();
  h.won(5, 5);
  assert.equal(h.regulars().length, 0);
  h.won(5.4, 4.8);
  assert.equal(h.regulars().length, 0);
  h.won(4.9, 5.2);
  assert.equal(h.regulars().length, 1);
});

test('wins in different places do not add up', () => {
  const h = new Hideouts();
  h.won(0, 0);
  h.won(8, 8);
  h.won(-8, 3);
  assert.equal(h.regulars().length, 0);
  assert.equal(h.list.length, 3);
});

test('a win somewhere else makes a place a little forgotten, so an abandoned spot fades', () => {
  const h = new Hideouts();
  h.won(0, 0);
  h.won(0, 0);
  for (let i = 0; i < 6; i++) h.won(10 + i * 3, 0); // six other places
  assert.equal(h.list.some((p) => Math.hypot(p.x, p.z) < 1), false);
});

test('a detour costs a third of a win: it takes one more win at the old place to be a regular', () => {
  const h = new Hideouts();
  h.won(0, 0);
  h.won(0, 0);
  h.won(9, 9);
  h.won(0, 0);
  assert.equal(h.regulars().length, 0);
  h.won(0, 0);
  assert.equal(h.regulars().length, 1);
});

test('storage round trip, and junk in storage is ignored', () => {
  const h = new Hideouts();
  h.won(1, 2);
  h.won(1, 2);
  h.won(1, 2);
  const g = new Hideouts();
  g.load(JSON.parse(JSON.stringify(h.toJSON())));
  assert.equal(g.regulars().length, 1);
  const bad = new Hideouts();
  bad.load([[1, 2], ['a', 2, 3], [NaN, 1, 1], [1, 1, -4], null, [3, 4, 2]]);
  assert.deepEqual(bad.toJSON(), [[3, 4, 2]]);
  bad.load('nope');
  assert.equal(bad.list.length, 0);
});

test('the list is capped, dropping the weakest first', () => {
  const h = new Hideouts();
  for (let i = 0; i < 40; i++) h.won(i * 5, 0);
  assert.ok(h.list.length <= 24);
});
