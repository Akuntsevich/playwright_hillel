// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import * as dotenv from 'dotenv';

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  globalSetup: 'global-setup.ts',
  testMatch: '**/*.spec.ts',
  use: {
   headless: false,
   baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.USER_NAME || 'defaultUsername',
      password: process.env.USER_PASSWORD || 'defaultPassword',
    },
  },

  projects: [
    {
      name: 'login',
      testDir: './tests/setup',
      testMatch: 'login.setup.ts',
      use: {...devices['Desktop Chrome']}
    },
    {
      name: 'qauto',
      testMatch: '**/qauto.spec.js',
      use: {
        //headless: false,
        baseURL: process.env.BASE_URL,
        httpCredentials: {
          username: process.env.USER_NAME || 'defaultUsername',
          password: process.env.USER_PASSWORD || 'defaultPassword',
        },
      },
      dependencies: ['login'],
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
