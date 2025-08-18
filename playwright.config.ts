import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  testDir: './tests',              // Folder for your test files
  timeout: 50000,        // Max 30s per test
  expect: {
    timeout: 5000,                 // Max 5s per assertion
  },
  fullyParallel: true,             // Run tests in parallel
  forbidOnly: false,               // Allow test.only (since no CI yet)
  retries: 0,                      // No retries for now
  workers: undefined,              // Auto-detect workers based on CPU

  use: {
    baseURL: process.env.BASE_URL || 'https://dev-aerovault.aero-strategies.com',
    ignoreHTTPSErrors: true,
    headless: true,           // 👀 Run in headed mode (see browser)
    trace: 'on-first-retry',      // Collect trace only if retry happens
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], ignoreHTTPSErrors: true },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  reporter: [
    ['list'],                      // Simple console reporter
    ['html', { open: 'always' }],  // Auto-open HTML report after test run
  ],
});
