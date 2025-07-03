# Playwright + Cucumber + POM Login Starter

A minimal starter template for web automation testing using Playwright, Cucumber, and Page Object Model with TypeScript.

## Features

- **Playwright** for browser automation
- **Cucumber** for BDD-style testing
- **Page Object Model** for maintainable page interactions
- **Data Transfer Objects** for type-safe data handling
- **TypeScript** for type safety
- **Environment configuration** via .env file

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Run tests:**
```bash
# Run in headed mode (see browser)
npm run test:headed

# Run in headless mode
npm test
```

3. **View results:**
Check the `reports/` directory for test results and screenshots.

## Project Structure

```
├── src/
│   ├── config/          # Environment configuration
│   ├── pages/           # Page Object Model classes
│   ├── types/           # DTO interfaces
│   ├── utils/           # Utility classes
│   └── support/         # Test support files
├── features/            # Cucumber feature files
│   └── step-definitions/ # Step definition files
├── reports/             # Test reports and screenshots
└── .env                 # Environment variables
```

## Configuration

Edit `.env` file to configure:
- `BASE_URL` - Application URL (default: https://www.saucedemo.com)
- `HEADLESS` - Browser display mode (default: false)
- `TEST_USERNAME` - Login username (default: standard_user)
- `TEST_PASSWORD` - Login password (default: secret_sauce)

## Test Scenarios

The login feature includes:
- ✅ Successful login with valid credentials
- ✅ Login with data table
- ❌ Invalid credentials error handling
- ❌ Locked out user error handling

## Scripts

```bash
npm test                # Run tests in headless mode
npm run test:headed     # Run tests with visible browser
npm run clean          # Clean reports directory
npm run build          # Compile TypeScript
```

## Adding New Tests

1. Create feature files in `features/`
2. Add step definitions in `features/step-definitions/`
3. Create new page objects in `src/pages/`
4. Update PageManager to include new pages

## Example Usage

```typescript
// Access pages with full type safety
await this.pages.loginPage.login(loginData);

// Environment-based configuration
const username = config.username;
```

## Technology Stack

- **Playwright** - Browser automation
- **Cucumber** - BDD testing framework
- **TypeScript** - Type safety
- **Node.js** - Runtime environment

This starter template provides a solid foundation for building larger test automation frameworks.