import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../src/support/fixtures';
import { DTOMapper } from '../../src/utils/dto-mapper';
import { LoginDTO } from '../../src/types/dto';
import { config } from '../../src/config/environment';

// Create BDD functions with custom fixtures
const { Given, When, Then } = createBdd(test);

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.navigateToLogin();
});

When('I login with the following credentials:', async ({ loginPage }, dataTable) => {
  const loginData: LoginDTO[] = DTOMapper.mapToLoginDTO(dataTable);
  await loginPage.login(loginData[0]);
});

When('I login with default credentials', async ({ loginPage }) => {
  const defaultLogin: LoginDTO = {
    username: config.username,
    password: config.password
  };
  await loginPage.login(defaultLogin);
});

Then('I should be logged in successfully', async ({ loginPage }) => {
  const isLoggedIn = await loginPage.isLoginSuccessful();
  expect(isLoggedIn).toBe(true);
  
  const currentUrl = await loginPage.getCurrentUrl();
  expect(currentUrl).toContain('/inventory.html');
});

Then('I should see an error message {string}', async ({ loginPage }, expectedMessage: string) => {
  const actualMessage = await loginPage.getErrorMessage();
  expect(actualMessage).toContain(expectedMessage);
});