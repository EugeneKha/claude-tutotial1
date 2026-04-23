import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("has a visible heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("page title is set", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Create Next App");
  });
});
