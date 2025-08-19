import { test, expect } from '@playwright/test';

test.describe('Forgot Password - Smoke', () => {
  test('User can request a reset password link', async ({ page }) => {
    // 1. Navigate to Forgot Password page directly                                                       
    await page.goto('/'); // goes to BASE_URL root
    await page.getByText('Forgot Password?').click();

    // 2. Enter email
    await page.locator('#login-email-input').fill('gracemac1027@gmail.com');

    // 3. Submit form
    await page.getByRole('button', { name: /submit/i }).click();

    // 4. Verify success toast/message
    const successMessage = /Reset password link (has been sent|sent successfully)/i;
    await expect(page.getByRole('alert')).toHaveText(successMessage, { timeout: 15000 });
  });
});
