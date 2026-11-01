const assert = require('node:assert/strict');
const { chromium } = require('C:/Desarrollo/PruebaFrontEndCodex/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [width, height] of [[2560, 1440], [1920, 1080], [1366, 768], [1280, 720], [1024, 600], [820, 600], [761, 600], [820, 1180], [390, 844], [320, 740]]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const data = await page.evaluate(() => {
        const stage = document.querySelector('.editorial-hero-stage').getBoundingClientRect();
        const panel = document.querySelector('.editorial-hero-panel').getBoundingClientRect();
        const cards = [...document.querySelectorAll('.editorial-hero-category')];
        const firstRow = cards.slice(0, innerWidth > 760 ? 4 : 2);
        const rowTop = Math.min(...firstRow.map(card => card.getBoundingClientRect().top));
        return { topSpace: panel.top - stage.top, bottomSpace: rowTop - panel.bottom,
          panelHeight: panel.height, stageHeight: stage.height,
          labelsVisible: cards.every(card => card.querySelector('span').getBoundingClientRect().bottom <= innerHeight),
          partial: cards.every(card => { const bounds = card.getBoundingClientRect(); return bounds.top < innerHeight && bounds.bottom > innerHeight; }),
          overflow: document.documentElement.scrollWidth > innerWidth };
      });
      console.log(JSON.stringify({ width, height, ...data, errors }));
      assert.ok(Math.abs(data.topSpace - data.bottomSpace) < 2, 'Panel should have equal top and bottom breathing room');
      assert.ok(data.topSpace >= 20 && data.bottomSpace >= 20);
      assert.equal(data.overflow, false);
      if (width > 760) { assert.equal(data.labelsVisible, true); assert.equal(data.partial, true); }
      assert.deepEqual(errors, []);
      if ([1366, 390].includes(width)) await page.screenshot({ path: `${__dirname}/${width}.png` });
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
