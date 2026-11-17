import { defineConfig } from "@playwright/test";
// An isolated production server prevents tests from silently using a stale dev build.
const port = process.env.PLAYWRIGHT_PORT || "3102";
const externalServer = process.env.PLAYWRIGHT_BASE_URL;
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  use: { baseURL: externalServer || `http://localhost:${port}`, channel: "chrome", headless: true },
  webServer: externalServer ? undefined : { command: `node node_modules/next/dist/bin/next start --port ${port}`, url: `http://localhost:${port}`, reuseExistingServer: false },
});
