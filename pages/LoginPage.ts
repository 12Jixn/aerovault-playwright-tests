import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // selectors
  private emailInput = '#login-email-input';
  private passwordInput = '#login-password-input';
  private loginButton = 'button:has-text("Login")';
  private toastAlert = '[role="alert"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/login'); // ✅ relies on baseURL from config
  }

  async login(username: string, password: string) {
    await this.page.fill(this.emailInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async assertSuccessfulLogin() {
    await expect(this.page.locator(this.toastAlert)).toContainText('Successfully Logged In!');
    await expect(this.page).toHaveURL(/.*dashboard/);
  }

  async assertInvalidLogin() {
    await expect(this.page.locator(this.toastAlert)).toContainText('Invalid username or password');
  }
}
