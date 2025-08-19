import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/forgot-password.page';
import { ResetPasswordPage } from '../../pages/reset-password.page';

test('Forgot + Reset password (mocked APIs, safe on prod UI)', async ({ page }) => {
  // 🔧 Mock: POST /api/user-reset-password-configs  (request reset)
  await page.route('**/api/user-reset-password-configs', async route => {
    if (route.request().method() !== 'POST') return route.fallback();
    // Optional: assert payload email is what you sent
    // const body = route.request().postDataJSON();
    // expect(body.email).toBe('gracemac1027@gmail.com');
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Reset password link sent successfully.'
      }),
    });
  });

  // 🔧 Mock: GET token validate → /api/users/reset-password/temporary-link/:token
  await page.route('**/api/users/reset-password/temporary-link/*', async route => {
    if (route.request().method() !== 'GET') return route.fallback();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        valid: true,
        email: 'gracemac1027@gmail.com'
      }),
    });
  });

  // 🔧 Mock: POST submit new password → often same path or a /confirm endpoint
  await page.route('**/api/users/reset-password/temporary-link/*', async route => {
    if (route.request().method() !== 'POST') return route.fallback();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Password Reset Successfully' }),
    });
  });

  const forgot = new ForgotPasswordPage(page);
  const reset  = new ResetPasswordPage(page);

  // 1) User requests the reset link
  await forgot.openViaLogin();
  await forgot.requestLink('gracemac1027@gmail.com');
  await forgot.expectLinkSent();

  // 2) User opens the reset page from the (mocked) link
  const mockToken = 'mockedToken123';
  await reset.openUI(mockToken);

  // 3) User sets a new password
  const newPw = 'NewPass123!';
  await reset.setNewPassword(newPw);

  // 4) UI shows success & redirects to login
  await reset.expectSuccessBanner();
  await reset.expectRedirectToLogin();

  // 5) (Optional) Try logging in with the new password (only if you also mock login API)
  // await page.fill('#login-email-input', 'gracemac1027@gmail.com');
  // await page.fill('#login-password-input', newPw);
  // await page.getByRole('button', { name: /login/i }).click();
  // await expect(page.getByText('Successfully Logged In!')).toBeVisible();
});
