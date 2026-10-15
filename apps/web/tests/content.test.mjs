import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { pathToFileURL } from 'node:url';

const webRoot = path.resolve(import.meta.dirname, '..');
const readSource = (relativePath) => readFile(path.join(webRoot, relativePath), 'utf8');
const loadModel = () => import(pathToFileURL(path.join(webRoot, 'src/features/public/landing/model/institutional-content.ts')).href);

test('denominaciones, introducción, misión y visión literales', async () => {
  const model = await loadModel();
  assert.equal(model.INSTITUTION, 'Instituto Mexicano del Seguro Social');
  assert.equal(model.OOAD, 'OOAD Sonora');
  assert.equal(model.AREA, 'Jefatura de Servicios de Desarrollo de Personal');
  assert.equal(model.INSTITUTIONAL_INTRO, 'La Jefatura de Servicios de Desarrollo de Personal forma parte del OOAD Sonora del Instituto Mexicano del Seguro Social.');
  assert.equal(model.MISSION, 'Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios');
  assert.equal(model.VISION, 'Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años');
});

test('siete valores y siete iconos conceptuales distintos', async () => {
  const { INSTITUTIONAL_VALUES } = await loadModel();
  assert.deepEqual(INSTITUTIONAL_VALUES.map(({ label }) => label), ['Solidaridad', 'Compromiso', 'Integridad', 'Lealtad', 'Innovación', 'Empatía', 'Disciplina']);
  assert.equal(new Set(INSTITUTIONAL_VALUES.map(({ id }) => id)).size, 7);
  assert.equal(new Set(INSTITUTIONAL_VALUES.map(({ iconId }) => iconId)).size, 7);
  assert.ok(INSTITUTIONAL_VALUES.every(({ iconId }) => !/imss|gobierno|logo/i.test(iconId)));
});

test('Landing conserva orden interno, un h1 y textos del modelo', async () => {
  const source = await readSource('src/features/public/landing/LandingPage.tsx');
  const order = ['landing-hero', 'landing-introduction', 'landing-access', 'landing-purpose', 'landing-values', 'landing-organization'];
  let previous = -1;
  for (const marker of order) {
    const position = source.indexOf(marker);
    assert.ok(position > previous, `${marker} debe seguir al bloque anterior`);
    previous = position;
  }
  assert.equal((source.match(/<h1\b/g) ?? []).length, 1);
  for (const modelReference of ['INSTITUTIONAL_INTRO', 'MISSION', 'VISION']) {
    assert.ok(source.includes(modelReference));
  }
});

test('destinos públicos exactos y sin rutas privadas', async () => {
  const router = await readSource('src/app/router/index.tsx');
  assert.deepEqual([...router.matchAll(/<Route (?:index|path="([^"]+)")/g)].map((match) => match[1] ?? '/'), ['/', '/', 'documentos', 'inicio-sesion']);
  assert.ok(!router.includes('/app/'));
  assert.ok(!router.includes('createBrowserRouter'));
});
