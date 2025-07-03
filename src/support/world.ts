import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { config } from '../config/environment';
import { PageManager, AllPages } from '../pages/page-manager';

export interface CustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  pageManager: PageManager;
  init(): Promise<void>;
  cleanup(): Promise<void>;  
  pages: AllPages;
}

class CustomWorldConstructor extends World implements CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  pageManager!: PageManager;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    const browserOptions = {
      headless: config.headless,
    };

    switch (config.browser) {
      case 'firefox':
        this.browser = await firefox.launch(browserOptions);
        break;
      case 'webkit':
        this.browser = await webkit.launch(browserOptions);
        break;
      default:
        this.browser = await chromium.launch(browserOptions);
    }

    this.context = await this.browser.newContext({
      baseURL: config.baseURL,
    });
    this.page = await this.context.newPage();
    
    this.pageManager = new PageManager(this.page);
  }

  async cleanup(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }

  get pages(): AllPages {
    return this.pageManager.getAllPages();
  }
}

setWorldConstructor(CustomWorldConstructor);
