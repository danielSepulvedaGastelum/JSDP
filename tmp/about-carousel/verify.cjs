const assert = require('node:assert/strict');
const { chromium } = require('C:/Desarrollo/PruebaFrontEndCodex/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const [width, height] of [[1366, 900], [820, 1180], [390, 844], [320, 740]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.clock.install();
      await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const active = () => page.locator('.about-slide.is-active h2').textContent();
      assert.equal(await active(), 'Conoce la JSDP');
      await page.clock.runFor(30000);
      assert.equal(await active(), 'Conoce la JSDP', 'Must not start offscreen');
      await page.locator('#conoce').scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      await page.clock.runFor(1000);
      assert.equal(await active(), 'Conoce la JSDP');
      await page.screenshot({ path: `${__dirname}/${width}-intro.png`, animations: 'disabled' });
      await page.clock.runFor(12000);
      assert.equal(await active(), 'Departamento de Personal', 'Autoplay should begin on entry');
      await page.screenshot({ path: `${__dirname}/${width}-personal.png`, animations: 'disabled' });
      if (width > 760) {
        const columns = await page.evaluate(() => {
          const shell = document.querySelector('.about-carousel-shell').getBoundingClientRect();
          const slide = document.querySelector('.about-slide.is-active').getBoundingClientRect();
          const copy = document.querySelector('.about-slide.is-active .about-area-copy').getBoundingClientRect();
          const icon = document.querySelector('.about-slide.is-active .about-area-image').getBoundingClientRect();
          const prev = document.querySelector('.about-prev').getBoundingClientRect();
          const next = document.querySelector('.about-next').getBoundingClientRect();
          return { textRatio: copy.width / slide.width, iconCentered: Math.abs((icon.top + icon.bottom) / 2 - (slide.top + slide.bottom) / 2) < 1,
            arrowsOutside: prev.right < shell.left && next.left > shell.right,
            arrowsVisible: prev.left >= 0 && next.right <= innerWidth };
        });
        assert.ok(Math.abs(columns.textRatio - .6) < .001);
        assert.equal(columns.iconCentered, true);
        assert.equal(columns.arrowsOutside, true);
        assert.equal(columns.arrowsVisible, true);
      }
      for (const [delay, expected] of [[26000, 'Departamento de Presupuesto y Control del Gasto'], [26000, 'Departamento de Relaciones Laborales'], [26000, 'Departamento de Capacitación'], [12000, 'Oficina de Información y Seguimiento de Auditorías'], [12000, 'Conoce la JSDP'], [12000, 'Departamento de Personal']]) {
        await page.clock.runFor(delay);
        assert.equal(await active(), expected, 'Automatic rotation should wrap');
      }
      const slides = [];
      for (let index = 0; index < 6; index++) {
        await page.getByRole('button', { name: 'Área siguiente', exact: true }).click();
        await page.clock.runFor(450);
        await page.locator('.about-slide.is-active .about-area-image').evaluate(image => image.decode());
        const layout = await page.evaluate(() => {
          const section = document.querySelector('#conoce').getBoundingClientRect();
          const current = document.querySelector('.about-slide.is-active');
          const copy = current.querySelector('.about-area-copy').getBoundingClientRect();
          const controls = document.querySelector('.about-carousel-controls').getBoundingClientRect();
          return { title: current.querySelector('h2').textContent, height: section.height,
            overflow: document.documentElement.scrollWidth > innerWidth,
            contained: copy.left >= section.left && copy.right <= section.right && copy.bottom <= controls.top,
            hiddenCount: document.querySelectorAll('.about-slide[aria-hidden="true"][inert]').length };
        });
        assert.equal(layout.overflow, false);
        assert.equal(layout.contained, true, JSON.stringify(layout));
        assert.equal(layout.hiddenCount, 5);
        slides.push(layout);
      }
      assert.equal(await active(), 'Departamento de Personal', 'Manual forward navigation wraps');
      await page.getByRole('button', { name: 'Mostrar Conoce la JSDP', exact: true }).click();
      await page.getByRole('button', { name: 'Área anterior', exact: true }).click();
      assert.equal(await active(), 'Oficina de Información y Seguimiento de Auditorías');
      await page.locator('body').click({ position: { x: 1, y: 1 }, force: true });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.clock.runFor(1000);
      assert.equal(await active(), 'Conoce la JSDP', 'Leaving section resets intro');
      await page.locator('#conoce').scrollIntoViewIfNeeded();
      await page.clock.runFor(1000);
      assert.equal(await active(), 'Conoce la JSDP', 'Reentry begins with intro');
      await page.getByRole('button', { name: 'Pausar avance automático', exact: true }).click();
      await page.keyboard.press('Tab');
      await page.mouse.move(0, 0);
      await page.clock.runFor(30000);
      assert.equal(await active(), 'Conoce la JSDP', 'Pause stops rotation');
      await page.getByRole('button', { name: 'Área siguiente', exact: true }).focus();
      await page.keyboard.press('End');
      assert.equal(await active(), 'Oficina de Información y Seguimiento de Auditorías');
      await page.keyboard.press('Home');
      assert.equal(await active(), 'Conoce la JSDP');
      assert.deepEqual(errors, []);
      results.push({ width, height, slides, errors, interactions: 'passed' });
      await page.close();
    }
    const reduced = await browser.newPage({ reducedMotion: 'reduce' });
    await reduced.clock.install();
    await reduced.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await reduced.locator('#conoce').scrollIntoViewIfNeeded();
    await reduced.clock.runFor(30000);
    assert.equal(await reduced.locator('.about-slide.is-active h2').textContent(), 'Conoce la JSDP');
    await reduced.getByRole('button', { name: 'Área siguiente', exact: true }).click();
    assert.equal(await reduced.locator('.about-slide.is-active h2').textContent(), 'Departamento de Personal');
    console.log(JSON.stringify({ results, reducedMotion: 'passed' }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
