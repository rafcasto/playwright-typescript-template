import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../src/support/world';
import { DTOMapper } from '../../src/utils/dto-mapper';
import { LoginDTO } from '../../src/types/dto';
import { config } from '../../src/config/environment';

Given('I am on the login page', async function (this: CustomWorld) {
  await this.pages.loginPage.navigateToLogin();
});

When('I login with the following credentials:', async function (this: CustomWorld, dataTable) {
  const loginData: LoginDTO[] = DTOMapper.mapToLoginDTO(dataTable);
  await this.pages.loginPage.login(loginData[0]);
});

When('I login with default credentials', async function (this: CustomWorld) {
  const defaultLogin: LoginDTO = {
    username: config.username,
    password: config.password
  };
  await this.pages.loginPage.login(defaultLogin);
});

Then('I should be logged in successfully', async function (this: CustomWorld) {
  const isLoggedIn = await this.pages.loginPage.isLoginSuccessful();
  expect(isLoggedIn).toBe(true);
  
  const currentUrl = await this.pages.loginPage.getCurrentUrl();
  expect(currentUrl).toContain('/inventory.html');
});

Then('I should see an error message {string}', async function (this: CustomWorld, expectedMessage: string) {
  const actualMessage = await this.pages.loginPage.getErrorMessage();
  expect(actualMessage).toContain(expectedMessage);
});
