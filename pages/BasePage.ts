import { Page } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async navigateTo(path: string) {
    await this.page.goto(path);
  }
}
