import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { pathToFileURL } from 'node:url';

const model = () => import(pathToFileURL(path.resolve(import.meta.dirname, '../src/features/public/landing/model/organization.ts')).href);

test('seis unidades reales, una raíz y cinco dependencias directas', async () => {
  const { ORGANIZATION_UNITS } = await model();
  assert.deepEqual(ORGANIZATION_UNITS.map(({ id }) => id), ['J', 'O', 'D1', 'D2', 'D3', 'D4']);
  assert.equal(ORGANIZATION_UNITS.filter(({ parentId }) => parentId === null).length, 1);
  assert.equal(ORGANIZATION_UNITS.filter(({ parentId }) => parentId === 'J').length, 5);
  assert.equal(ORGANIZATION_UNITS.find(({ id }) => id === 'D3').label, 'Jefe del Departamento de Relaciones Laborales');
  assert.ok(!ORGANIZATION_UNITS.some(({ id }) => id === 'C'));
  assert.ok(!ORGANIZATION_UNITS.some(({ parentId }) => parentId === 'O'));
  assert.equal(new Set(ORGANIZATION_UNITS.map(({ id }) => id)).size, 6);
  assert.ok(ORGANIZATION_UNITS.every((unit) => !('responsible' in unit)));
});

test('selección inicial, disclosure y conexión activa son independientes', async () => {
  const { INITIAL_ORGANIZATION_STATE, transitionOrganization, getActiveConnectionId } = await model();
  assert.deepEqual(INITIAL_ORGANIZATION_STATE, { selectedUnitId: 'J', expanded: true });
  const selected = transitionOrganization(INITIAL_ORGANIZATION_STATE, { type: 'select', id: 'D3' });
  assert.equal(getActiveConnectionId(selected), 'D3');
  const collapsed = transitionOrganization(selected, { type: 'toggle-expanded' });
  assert.equal(collapsed.expanded, false);
  assert.equal(collapsed.selectedUnitId, 'D3');
  const expanded = transitionOrganization(collapsed, { type: 'toggle-expanded' });
  assert.equal(expanded.expanded, true);
  assert.equal(getActiveConnectionId(expanded), 'D3');
});
