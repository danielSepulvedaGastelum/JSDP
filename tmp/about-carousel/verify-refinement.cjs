const assert = require('node:assert/strict');
const { chromium } = require('C:/Desarrollo/PruebaFrontEndCodex/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [width, height] of [[1920, 1080], [1366, 900], [1200, 900], [1024, 900], [820, 1180], [390, 844], [320, 740]]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.locator('#conoce').scrollIntoViewIfNeeded();
      await page.locator('#conoce').screenshot({ path: `${__dirname}/refinement-${width}-about.png` });
      const colors = await page.locator('.about-area-icon').evaluateAll(icons => icons.map(icon => getComputedStyle(icon).color));
      assert.ok(new Set(colors).size >= 5);
      await page.locator('#estructura').scrollIntoViewIfNeeded();
      if (width > 760) await page.locator('.d3-org-card').first().waitFor();
      await page.locator('#estructura').screenshot({ path: `${__dirname}/refinement-${width}-org.png` });
      const layout = await page.evaluate(() => {
        const desktop = innerWidth > 760;
        const cards = [...document.querySelectorAll(desktop ? '.d3-org-card' : '.org-card')];
        const chart = document.querySelector('.org-d3-chart').getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth > innerWidth, cards: cards.map(card => {
          const title = card.querySelector('strong');
          const name = card.querySelector(desktop ? '.d3-org-card-person span' : '.org-card-person');
          const text = name.getBoundingClientRect();
          const bounds = card.getBoundingClientRect();
          const scale = bounds.width / card.offsetWidth;
          return { id: card.dataset.orgNodeId || title.textContent, titleSize: parseFloat(getComputedStyle(title).fontSize) * scale,
            nameSize: parseFloat(getComputedStyle(name).fontSize) * scale,
            clipped: text.bottom > bounds.bottom + 2 || text.right > bounds.right + 2,
            outside: desktop && (bounds.left < chart.left - 2 || bounds.right > chart.right + 2 || bounds.bottom > chart.bottom + 2) };
        }) };
      });
      console.log(JSON.stringify({ width, colors, ...layout, errors }));
      assert.equal(layout.overflow, false);
      assert.deepEqual(errors, []);
      assert.ok(layout.cards.every(card => !card.clipped && !card.outside && card.titleSize >= 16 && card.nameSize >= 15), JSON.stringify(layout));
      if (width > 760) {
        const connections = await page.evaluate(() => {
          const cards = [...document.querySelectorAll('.d3-org-card')].map(card => ({ id: card.dataset.orgNodeId, bounds: card.getBoundingClientRect() }));
          const sidebar = document.querySelector('.org-layout > .org-info').getBoundingClientRect();
          const tree = document.querySelector('.org-tree').getBoundingClientRect();
          const collisions = [];
          for (const path of document.querySelectorAll('.org-d3-chart path.link')) {
            const target = path.__data__.data.id;
            const length = path.getTotalLength();
            const matrix = path.getScreenCTM();
            for (let step = 0; step <= length; step += 2) {
              const local = path.getPointAtLength(step);
              const point = new DOMPoint(local.x, local.y).matrixTransform(matrix);
              for (const { id, bounds } of cards) {
                if (id === target || id === 'jefatura') continue;
                if (point.x > bounds.left - 2 && point.x < bounds.right + 2 && point.y > bounds.top - 2 && point.y < bounds.bottom + 2) collisions.push({ target, card: id });
              }
            }
          }
          const departments = ['personal', 'presupuesto', 'relaciones', 'capacitacion'].map(id => cards.find(card => card.id === id).bounds);
          return { sidebarRight: sidebar.left >= tree.right - 1, sameRow: departments.every(card => Math.abs(card.top - departments[0].top) < 1), ordered: departments.every((card, i) => i === 0 || card.left > departments[i - 1].right), collisions };
        });
        console.log(JSON.stringify({ width, connections }));
        assert.equal(connections.sidebarRight, true);
        assert.equal(connections.sameRow, true);
        assert.equal(connections.ordered, true);
        assert.deepEqual(connections.collisions, [], 'Connectors must not touch unrelated cards');
        await page.getByRole('button', { name: 'Mostrar información de Departamento de Personal Delegacional', exact: true }).click();
        await page.getByRole('button', { name: 'Contraer estructura', exact: true }).click();
        await page.getByRole('button', { name: 'Expandir estructura', exact: true }).click();
        assert.equal(await page.locator('.d3-org-card').count(), 6);
      }
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
