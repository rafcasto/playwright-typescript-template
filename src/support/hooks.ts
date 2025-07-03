import { Before, After, BeforeAll, ITestCaseHookParameter } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import * as fs from 'fs';
import * as path from 'path';

BeforeAll(async function () {
  // Ensure reports directory exists
  const reportsDir = path.join(process.cwd(), 'reports');
  const screenshotsDir = path.join(reportsDir, 'screenshots');
  
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
});

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld, testCase: ITestCaseHookParameter) {
  // Take screenshot on failure
  if (testCase.result?.status === 'FAILED') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `reports/screenshots/failed-${timestamp}.png`;
    
    try {
      const screenshot = await this.page.screenshot({ 
        path: screenshotPath,
        fullPage: true 
      });
      this.attach(screenshot, 'image/png');
    } catch (error) {
      console.log('Failed to take screenshot:', error);
    }
  }
  
  await this.cleanup();
});