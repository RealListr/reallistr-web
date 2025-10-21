import { test, expect } from '@playwright/test';
test('Home shows the feed (not Map)', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'RealListr' })).toBeVisible();
  await expect(page.getByText('Open for Inspection').first()).toBeVisible();
});
