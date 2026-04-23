import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium-e2e",
      testDir: "tests/e2e",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report/e2e" }]],
});
