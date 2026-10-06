// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 *  shift + option + f  to format the code
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 45*1000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: 'on',
    trace: 'on',
    retries: 2,
  },


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

module.exports = config;
