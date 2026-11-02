import { test, expect } from '@playwright/test';

test('dónde queda: foto del mostrador con texto alternativo, la calle y el barrio, sin mapa @MIGA-1-ASM-11', async ({ page }) => {
  await page.goto('/');
  const visit = page.locator('#donde');
  const photo = visit.locator('figure img');
  await expect(photo).toHaveCount(1);
  await expect(photo).toHaveAttribute('alt', /[Mm]ostrador/);
  await photo.scrollIntoViewIfNeeded();
  await expect.poll(() => photo.evaluate((el) => el.naturalWidth)).toBeGreaterThan(0);
  await expect(visit.getByRole('heading', { level: 2 })).toHaveText('Thames 1050');
  await expect(visit).toContainText('Villa Crespo');
  await expect(visit.locator('iframe, canvas, svg:not([aria-hidden="true"])')).toHaveCount(0);
  await expect(visit.locator('img[alt*="mapa" i], img[src*="map" i]')).toHaveCount(0);
});
