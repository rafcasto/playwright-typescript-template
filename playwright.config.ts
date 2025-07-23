import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { config as envConfig } from './src/config/environment';

// Define BDD configuration
const testDir = defineBddConfig({
  paths: ['features/**/*.feature'], // Your existing feature files
  require: ['src/support/**/*.ts', 'features/step-definitions/**/*.ts'], // Your existing step definitions
  import: ['src/support/**/*.ts', 'features/step-definitions/**/*.ts'],
});

export default defineConfig({
  testDir, // Use BDD test directory
  timeout: envConfig.timeout,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    // Add Cucumber JSON reporter for BDD reports
    ['playwright-bdd/reporter/cucumber', { outputFile: 'test-results/cucumber-report.json' }],
    ['list']
  ],

  use: {
    baseURL: envConfig.baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
        headless: envConfig.headless 
      },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        headless: envConfig.headless 
      },
    },
    {
      name: 'webkit',
      use: { 
        browserName: 'webkit',
        headless: envConfig.headless 
      },
    },
  ],
});