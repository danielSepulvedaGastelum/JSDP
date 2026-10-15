import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { pathToFileURL } from 'node:url';

const model = () => import(pathToFileURL(path.resolve(import.meta.dirname, '../src/features/public/landing/model/values-motion.ts')).href);

test('movimiento normal, pausa persistente y reanudación explícita', async () => {
  const { getInitialValuesMotionIntent, transitionValuesMotion, getEffectiveRunning } = await model();
  const running = getInitialValuesMotionIntent(false);
  assert.equal(running, 'running');
  const paused = transitionValuesMotion(running, { type: 'pause' });
  assert.equal(paused, 'static');
  assert.equal(getEffectiveRunning(paused, false), false);
  assert.equal(transitionValuesMotion(paused, { type: 'reduced-motion-changed', reducedMotion: false }), 'static');
  assert.equal(transitionValuesMotion(paused, { type: 'resume', reducedMotion: false }), 'running');
});

test('movimiento reducido inicial y en vivo tiene prioridad', async () => {
  const { getInitialValuesMotionIntent, transitionValuesMotion, getEffectiveRunning } = await model();
  assert.equal(getInitialValuesMotionIntent(true), 'static');
  assert.equal(getEffectiveRunning('running', true), false);
  const reduced = transitionValuesMotion('running', { type: 'reduced-motion-changed', reducedMotion: true });
  assert.equal(reduced, 'static');
  assert.equal(transitionValuesMotion(reduced, { type: 'resume', reducedMotion: true }), 'static');
  assert.equal(transitionValuesMotion(reduced, { type: 'reduced-motion-changed', reducedMotion: false }), 'static');
});
