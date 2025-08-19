import { Page, expect } from '@playwright/test';

export class ResetPasswordPage {
  constructor(private page: Page) {}

  // Open the UI page that uses the token (adjust if yours differs)
  async openUI(token: string) {
    // Common pattern: a front-end route that then calls the API
    await this.page.goto(`/reset-password?token=${token}`);
  }

  async setNewPassword(newPw: string) {
    // Adjust selectors to your inputs (labels/placeholders/ids)
    await this.page.getByLabel(/new password/i).fill(newPw);
    await this.page.getByLabel(/confirm password/i).fill(newPw);
    await this.page.getByRole('button', { name: /save|submit|proceed/i }).click();
  }

  async expectSuccessBanner() {
    await expect(this.page.getByText(/Password has been reset successfully./i)).toBeVisible();
  }

  async expectRedirectToLogin() {
    await expect(this.page).toHaveURL(/\/login|\/$/); // tweak if your login path differs
  }
}
