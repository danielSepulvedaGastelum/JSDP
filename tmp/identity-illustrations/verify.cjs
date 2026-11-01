const assert = require('node:assert/strict');
const { chromium } = require('C:/Desarrollo/PruebaFrontEndCodex/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [width, height] of [[1366, 900], [820, 1180], [390, 844], [320, 740]]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const illustrations = page.locator('.identity-image, .values-grid:not(.values-grid-duplicate) .value-image');
      assert.equal(await illustrations.count(), 9);
      for (const illustration of await illustrations.all()) {
        await illustration.scrollIntoViewIfNeeded();
        await illustration.evaluate(image => image.decode());
        assert.ok(await illustration.evaluate(image => image.naturalWidth > 0 && getComputedStyle(image).objectFit === 'contain'));
      }
      for (const [selector, label] of [['#identidad', 'mission-vision'], ['#valores', 'values']]) {
        await page.locator(selector).screenshot({ path: `${__dirname}/${width}-${label}.png`, animations: 'disabled' });
      }
      const data = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        assets: [...document.querySelectorAll('.identity-image, .values-grid:not(.values-grid-duplicate) .value-image')].map(image => ({ src: image.getAttribute('src'), width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height })),
        titleCollisions: [...document.querySelectorAll('.identity-panel-heading')].some(heading => heading.querySelector('img').getBoundingClientRect().right > heading.querySelector('h2').getBoundingClientRect().left),
        values: [...document.querySelectorAll('.values-grid:not(.values-grid-duplicate) h3')].map(title => title.textContent),
      }));
      assert.equal(data.overflow, false);
      assert.equal(data.titleCollisions, false);
      assert.equal(data.values.length, 7);
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, height, ...data, errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
