import { test as base } from 'playwright-bdd';
import { PageManager } from '../pages/page-manager';
import { LoginPage } from '../pages/login-page';

// Define custom fixtures
type CustomFixtures = {
  pageManager: PageManager;
  loginPage: LoginPage;
};

// Extend BDD test with custom fixtures
export const test = base.extend<CustomFixtures>({
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});