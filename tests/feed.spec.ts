import { test, expect } from '@playwright/test';

test('feed renders and paginates', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Feed V2')).toBeVisible();
  await page.waitForSelector('article'); // first batch
  const firstCount = await page.locator('article').count();
  await page.mouse.wheel(0, 4000); // trigger infinite load
  await page.waitForTimeout(800);
  const laterCount = await page.locator('article').count();
  expect(laterCount).toBeGreaterThan(firstCount);
});
