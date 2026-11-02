import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

const WA_NUMBER = '5491100000000';
const WA_TEXT = 'Hola Miga! Quiero pedir para retirar: ';
const phone = { width: 390, height: 844 };

async function revealAll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
}

test.describe('landing de Miga', () => {
  test('la portada presenta a Miga, panadería de masa madre en Villa Crespo @MIGA-1-S1', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Miga/);
    await expect(page.getByRole('link', { name: /Miga, volver al inicio/ })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('masa madre');
    await expect(page.locator('.hero')).toContainText('Villa Crespo');
  });

  test('la lista del día muestra panes y facturas, cada uno con su precio @MIGA-1-S2', async ({ page }) => {
    await page.goto('/');
    const ticket = page.getByRole('article', { name: 'Lista del día' });
    await expect(ticket.getByRole('heading', { name: 'Panes' })).toBeVisible();
    await expect(ticket.getByRole('heading', { name: 'Facturas' })).toBeVisible();
    const rows = ticket.locator('.row');
    expect(await rows.count()).toBeGreaterThan(0);
    for (const row of await rows.all()) {
      await expect(row.locator('.row__name')).not.toBeEmpty();
      await expect(row.locator('.row__price')).toHaveText(/^\$\d{1,3}(\.\d{3})*$/);
    }
  });

  test('la lista es fija: 6 panes, 5 facturas en pesos y la fecha de hoy escrita @MIGA-1-ASM-01', async ({ page }) => {
    await page.goto('/');
    const ticket = page.getByRole('article', { name: 'Lista del día' });
    const lists = ticket.locator('.ticket__rows');
    await expect(lists.nth(0).locator('.row')).toHaveCount(6);
    await expect(lists.nth(1).locator('.row')).toHaveCount(5);
    await expect(ticket.locator('time')).toHaveText(/\d{1,2} de [a-z]+/);
    await expect(ticket.locator('time')).toHaveAttribute('datetime', /^\d{4}-\d{2}-\d{2}$/);
  });

  test('la página muestra los horarios del local @MIGA-1-S3', async ({ page }) => {
    await page.goto('/');
    const hours = page.locator('#horarios');
    await expect(hours.getByRole('heading', { name: 'Horarios' })).toBeVisible();
    expect(await hours.locator('dt').count()).toBeGreaterThan(0);
  });

  test('horarios: martes a sábado 8 a 20, domingo 8 a 14, lunes cerrado @MIGA-1-ASM-02', async ({ page }) => {
    await page.goto('/');
    const rows = page.locator('#horarios .hours__row');
    await expect(rows).toHaveCount(3);
    await expect(rows.nth(0)).toHaveText(/Martes a sábado\s*8 a 20/);
    await expect(rows.nth(1)).toHaveText(/Domingo\s*8 a 14/);
    await expect(rows.nth(2)).toHaveText(/Lunes\s*Cerrado/);
  });

  test('cómo pedir para retirar por WhatsApp @MIGA-1-S4', async ({ page }) => {
    await page.goto('/');
    const order = page.locator('#pedir');
    await expect(order.getByRole('heading', { name: 'Cómo pedir' })).toBeVisible();
    await expect(order).toContainText('retira');
    await expect(order.getByRole('link', { name: 'Pedir por WhatsApp' })).toHaveAttribute('href', /^https:\/\/wa\.me\//);
  });

  test('cada botón de pedido abre wa.me al +54 9 11 0000-0000 con el mensaje precargado, y hay tres pasos @MIGA-1-ASM-03', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('a[href*="wa.me"]');
    expect(await links.count()).toBeGreaterThanOrEqual(3);
    for (const link of await links.all()) {
      const url = new URL(await link.getAttribute('href'));
      expect(url.hostname).toBe('wa.me');
      expect(url.pathname).toBe(`/${WA_NUMBER}`);
      expect(url.searchParams.get('text')).toBe(WA_TEXT);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
    const steps = page.getByRole('list', { name: 'Pasos para pedir' }).locator('.slip__step');
    await expect(steps).toHaveCount(3);
    await expect(steps.nth(0)).toContainText('Elegí');
    await expect(steps.nth(1)).toContainText('Mandá el WhatsApp');
    await expect(steps.nth(2)).toContainText('Retirá y pagá');
  });

  test('se retira y se paga en el local, sin envío @MIGA-1-ASM-04', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#pedir')).toContainText('Se paga al retirar');
    await expect(page.locator('#pedir')).toContainText('sin envío');
    await expect(page.locator('#donde')).toContainText('No hacemos envíos');
  });

  test('la página dice dónde queda el local @MIGA-1-S5', async ({ page }) => {
    await page.goto('/');
    const visit = page.locator('#donde');
    await expect(visit.getByRole('heading', { level: 2 })).toBeVisible();
    await expect(visit).toContainText('Villa Crespo');
  });

  test('Thames 1050 con el enlace «Cómo llegar» a Google Maps y sin mapa embebido @MIGA-1-ASM-05', async ({ page }) => {
    await page.goto('/');
    const visit = page.locator('#donde');
    await expect(visit.getByRole('heading', { name: 'Thames 1050' })).toBeVisible();
    const directions = visit.getByRole('link', { name: 'Cómo llegar' });
    const url = new URL(await directions.getAttribute('href'));
    expect(url.hostname).toBe('www.google.com');
    expect(url.pathname).toBe('/maps/search/');
    expect(url.searchParams.get('query')).toBe('Thames 1050 Villa Crespo Buenos Aires');
    await expect(page.locator('iframe')).toHaveCount(0);
  });

  test('a 390 px la página entra sin desborde y los controles miden 44 px o más @MIGA-1-S6', async ({ page }) => {
    await page.setViewportSize(phone);
    await page.goto('/');
    await revealAll(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('a, button')]
        .filter((el) => el.offsetParent !== null && !el.closest('[data-orderbar]:not(.is-shown)'))
        .map((el) => ({ text: el.textContent.trim().slice(0, 40), h: el.getBoundingClientRect().height }))
        .filter(({ h }) => h > 0 && h < 44),
    );
    expect(small).toEqual([]);
  });

  test('a 390 px el pedido queda en una barra fija abajo al bajar, y la página habla con voseo @MIGA-1-ASM-06', async ({ page }) => {
    await page.setViewportSize(phone);
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', /^es/);
    await page.locator('#horarios').scrollIntoViewIfNeeded();
    const bar = page.locator('[data-orderbar]');
    await expect(bar).toHaveClass(/is-shown/);
    expect(await bar.evaluate((el) => getComputedStyle(el).position)).toBe('fixed');
    const cta = bar.getByRole('link', { name: 'Pedir por WhatsApp' });
    await expect(cta).toBeInViewport();
    const box = await cta.boundingBox();
    expect(box.y + box.height).toBeGreaterThan(phone.height - 120);
    await expect(page.locator('body')).toContainText('Pedí por WhatsApp');
  });

  test('todas las fotos cargan y tienen texto alternativo @MIGA-1-ASM-07', async ({ page }) => {
    await page.goto('/');
    await revealAll(page);
    const imgs = page.locator('img');
    expect(await imgs.count()).toBeGreaterThan(0);
    for (const img of await imgs.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveAttribute('alt', /\S/);
      await expect.poll(() => img.evaluate((el) => el.complete && el.naturalWidth)).toBeGreaterThan(0);
    }
    await expect(page.locator('footer')).toContainText('No son del local');
  });

  test('la oferta dice 48 horas de fermentación por hogaza @MIGA-1-ASM-09', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('48 horas');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /48 horas de fermentación/);
  });

  test('la dirección visual toma brightland.co como referencia y oryzo.ai como lateral @MIGA-1-ASM-08', async () => {
    const card = await readFile('specs/MIGA-1-landing/card.md', 'utf8');
    const ref = card.split('\n').find((line) => line.startsWith('- ref: '));
    expect(ref).toContain('https://brightland.co');
    expect(ref).toContain('https://oryzo.ai');
    const rounds = await readFile('specs/MIGA-1-landing/rondas.md', 'utf8');
    expect(rounds).toContain('brightland');
  });

  test('servida bajo /miga/, cada recurso propio es relativo y carga @MIGA-1-ASM-10', async ({ page, baseURL }) => {
    const host = 'http://pages.miga.test';
    const failed = [];
    await page.route(`${host}/**`, async (route) => {
      const url = new URL(route.request().url());
      if (!url.pathname.startsWith('/miga/')) {
        failed.push(url.pathname);
        return route.fulfill({ status: 404, body: '' });
      }
      const local = new URL(url.pathname.slice('/miga/'.length) + url.search, `${baseURL}/`);
      const response = await route.fetch({ url: local.href });
      if (response.status() !== 200) failed.push(`${url.pathname} ${response.status()}`);
      return route.fulfill({ response });
    });
    await page.goto(`${host}/miga/`);
    await revealAll(page);
    const own = await page.evaluate(() =>
      [...document.querySelectorAll('[src], link[href]')]
        .map((el) => el.getAttribute('src') || el.getAttribute('href'))
        .filter((ref) => !/^https?:/.test(ref)),
    );
    expect(own.length).toBeGreaterThan(0);
    expect(own.filter((ref) => ref.startsWith('/'))).toEqual([]);
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
    for (const img of await page.locator('img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el) => el.naturalWidth)).toBeGreaterThan(0);
    }
    expect(failed).toEqual([]);
  });
});
