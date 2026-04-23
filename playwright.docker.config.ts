import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium-e2e",
      testDir: "tests/e2e",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "api",
      testDir: "tests/api",
      use: {},
    },
  ],
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report/docker" }]],
});
