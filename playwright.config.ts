import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  use: { baseURL: "http://localhost:3100", channel: "chrome", headless: true },
  webServer: { command: "node node_modules/next/dist/bin/next start --port 3100", url: "http://localhost:3100", reuseExistingServer: true },
});
