import { Page } from '@playwright/test';
import { LoginPage } from './login-page';

export interface AllPages {
  loginPage: LoginPage;
}

export class PageManager {
  private _loginPage: LoginPage;

  constructor(page: Page) {
    this._loginPage = new LoginPage(page);
  }

  get loginPage(): LoginPage {
    return this._loginPage;
  }

  public getAllPages(): AllPages {
    return {
      loginPage: this._loginPage
    };
  }
}