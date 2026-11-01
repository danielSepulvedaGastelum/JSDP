import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = 'C:/Desarrollo/JSDP';
const vite = await createServer({ root: root + '/apps/web', configFile: root + '/apps/web/vite.config.ts', server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const { HeroEditorial } = await vite.ssrLoadModule('/src/features/public/landing/HeroEditorial.tsx');
  const markup = renderToStaticMarkup(React.createElement(HeroEditorial));
  assert.equal((markup.match(/role="tab"/g) || []).length, 4);
  assert.equal((markup.match(/role="tabpanel"/g) || []).length, 1);
  assert.equal((markup.match(/aria-selected="true"/g) || []).length, 1);
  assert.ok(markup.includes('Jefatura de Servicios'));
  assert.ok(markup.includes('href="#conoce"'));
  assert.ok(markup.includes('Pausar cambios'));
  for (const name of ['Unidad_Medica.jpg', 'Unidad_No_Medica.jpg', 'Personas.jpg', 'Coordinacion.jpg']) assert.ok(markup.includes('/identity/' + name));
  assert.ok(markup.includes('/identity/JSDP-Sonora-11.svg'));
  assert.ok(!markup.includes('Texto provisional'));
  assert.ok(!markup.includes('Direction contract'));
  await writeFile(root + '/tmp/hero-d4-implementation/hero-render.html', markup);
  console.log('SSR: cuatro categorías, selección inicial única, panel descriptivo, imágenes oficiales, enlace #conoce y pausa correctos.');
} finally {
  await vite.close();
}
