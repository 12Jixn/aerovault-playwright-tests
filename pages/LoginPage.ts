import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://dev-aerovault.aero-strategies.com/');
  }

  async login(username: string, password: string) {
    await this.page.locator('#login-email-input').fill(username);
    await this.page.locator('#login-password-input').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async assertSuccessfulLogin() {
    await expect(this.page.getByText('Successfully Logged In!')).toBeVisible();
    await expect(this.page.getByText('Dashboard')).toBeVisible();
  }

  async assertInvalidCredentials() {
    await expect(this.page.getByText('Invalid credentials.')).toBeVisible();
  }

  async assertUnauthorized() {
    await expect(this.page.getByText('Unauthorized')).toBeVisible();
  }
}
