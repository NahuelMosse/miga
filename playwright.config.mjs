import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PORT || 4173);
const baseURL = process.env.APP_URL || `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: 'apps/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL, ...devices['Desktop Chrome'] },
  webServer: process.env.APP_URL
    ? undefined
    : {
        command: 'node apps/e2e/serve.mjs',
        env: { PORT: String(port) },
        url: baseURL,
        reuseExistingServer: false,
      },
});
