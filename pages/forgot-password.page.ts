// pages/forgot-password.page.ts
import { expect, Page } from '@playwright/test';

export class ForgotPasswordPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto(`${process.env.BASE_URL}/forgot-password`);
    await expect(this.page).toHaveURL(/forgot-password/);
  }

  async requestLink(email: string) {
    const emailInput = this.page
      .getByLabel(/email/i)
      .or(this.page.getByPlaceholder(/email/i))
      .or(this.page.locator('input[type="email"]'));

    await emailInput.fill(email);
    await this.page.getByRole('button', { name: /submit/i }).click();
  }

  async expectLinkSent() {
    const successPattern =
      /Reset password link (has been sent\.|sent successfully)/i;

    // Prefer a resilient locator: match anywhere visible on the page
    await expect(this.page.getByText(successPattern)).toBeVisible({ timeout: 15000 });

    // If you *know* there is a toast container, you can scope it:
    // await expect(
    //   this.page.locator('[role="alert"], [aria-live], .toast, .notification')
    //            .filter({ hasText: successPattern })
    // ).toBeVisible({ timeout: 15000 });
  }
}
