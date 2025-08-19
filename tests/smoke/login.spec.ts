import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Scenarios', () => {

  test('✅ Successful login navigates to Dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('graces', '123');
    await loginPage.assertSuccessfulLogin();
  });

  test('❌ Invalid credentials show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('graces', '12345');
    await loginPage.assertInvalidCredentials();
  });

  test('⚠️ Empty fields show unauthorized message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.assertUnauthorized();
  });

});
