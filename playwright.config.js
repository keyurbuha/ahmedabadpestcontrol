import { defineConfig } from '@playwright/test';
import { randomBytes } from 'node:crypto';

// Tests always use their own database and upload directory.
process.env.E2E_DB ||= `apc_e2e_${process.pid}`;
process.env.JWT_SECRET ||= randomBytes(48).toString('hex');
process.env.MONGODB_DB = process.env.E2E_DB;
process.env.APP_ORIGIN = 'http://localhost:3100';
process.env.DATA_DIR = `./storage/${process.env.E2E_DB}`;

export default defineConfig({
  testDir: './tests/e2e', fullyParallel: false, workers: 1, timeout: 60000,
  globalSetup: './tests/e2e/setup.mjs', globalTeardown: './tests/e2e/teardown.mjs',
  use: { baseURL: 'http://localhost:3100', browserName: 'chromium', channel: 'msedge', trace: 'retain-on-failure' },
  webServer: { command: 'node node_modules/next/dist/bin/next start -p 3100', url: 'http://localhost:3100/admin/login', reuseExistingServer: false, timeout: 120000 },
});
