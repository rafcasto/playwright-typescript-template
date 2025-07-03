import { defineConfig } from '@playwright/test';
import { config } from './src/config/environment';

export default defineConfig({
  testDir: './tests',
  timeout: config.timeout,
  use: {
    browserName: 'chromium',
    headless: config.headless,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: config.baseURL,
  },
});
