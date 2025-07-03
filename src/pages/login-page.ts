import { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { LoginDTO } from '../types/dto';

export class LoginPage extends BasePage {
  // SauceDemo specific selectors
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';
  private readonly inventoryContainer = '[data-test="inventory-container"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin(): Promise<void> {
    await this.navigateTo('/');
  }

  async login(loginData: LoginDTO): Promise<void> {
    await this.fill(this.usernameInput, loginData.username);
    await this.fill(this.passwordInput, loginData.password);
    await this.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getErrorMessage(): Promise<string> {
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
      return await this.getText(this.errorMessage);
    } catch {
      return '';
    }
  }

  async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.inventoryContainer, { timeout: 10000 });
      return await this.isVisible(this.inventoryContainer);
    } catch {
      return false;
    }
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}