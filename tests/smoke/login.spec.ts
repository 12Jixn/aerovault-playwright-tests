import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
  await page.goto('/login');

  await page.fill('#login-email-input', process.env.AEROVAULT_USER || 'avap');
  await page.fill('#login-password-input', process.env.AEROVAULT_PASS || '123');
  await page.getByRole('button', { name: 'Login' }).click();

  // ✅ Explicit wait for dashboard
  await page.waitForURL('**/dashboard', { timeout: 15000 });

  // ✅ Check for success indicator
  await expect(page.getByText('Successfully Logged In!')).toBeVisible({ timeout: 15000 });
});

