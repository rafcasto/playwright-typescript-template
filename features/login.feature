Feature: User Login
  As a user
  I want to login to SauceDemo
  So that I can access the inventory

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When I login with default credentials
    Then I should be logged in successfully

  @smoke
  Scenario: Successful login with data table
    When I login with the following credentials:
      | username      | password     |
      | standard_user | secret_sauce |
    Then I should be logged in successfully

  @negative
  Scenario: Login with invalid credentials
    When I login with the following credentials:
      | username     | password        |
      | invalid_user | invalid_password |
    Then I should see an error message "Username and password do not match"

  @negative
  Scenario: Login with locked out user
    When I login with the following credentials:
      | username        | password     |
      | locked_out_user | secret_sauce |
    Then I should see an error message "Sorry, this user has been locked out"