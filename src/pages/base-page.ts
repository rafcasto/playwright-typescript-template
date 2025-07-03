import { Page } from '@playwright/test';
import { config } from '../config/environment';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = ''): Promise<void> {
    const url = path.startsWith('http') ? path : `${config.baseURL}${path}`;
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fill(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async waitForSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
  }
}