import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface EnvironmentConfig {
  baseURL: string;
  timeout: number;
  headless: boolean;
  browser: 'chromium' | 'firefox' | 'webkit';
  username: string;
  password: string;
}

class Environment {
  private _config: EnvironmentConfig;

  constructor() {
    this._config = {
      baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
      timeout: parseInt(process.env.TIMEOUT || '30000'),
      headless: process.env.HEADLESS?.toLowerCase() !== 'false', // Fixed: default to true, only false when explicitly set
      browser: (process.env.BROWSER as 'chromium' | 'firefox' | 'webkit') || 'chromium',
      username: process.env.TEST_USERNAME || 'standard_user',
      password: process.env.TEST_PASSWORD || 'secret_sauce'
    };
  }

  get config(): EnvironmentConfig {
    return this._config;
  }

  getFullUrl(path: string): string {
    return `${this._config.baseURL}${path}`;
  }
}

export const config = new Environment().config;
export const env = new Environment();
