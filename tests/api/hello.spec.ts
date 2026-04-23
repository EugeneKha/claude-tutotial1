import { test, expect } from "@playwright/test";

test.describe("GET /api/hello", () => {
  test("returns 200 with correct JSON body", async ({ request }) => {
    const response = await request.get("/api/hello");
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ message: "Hello" });
  });

  test("returns Content-Type application/json", async ({ request }) => {
    const response = await request.get("/api/hello");
    expect(response.headers()["content-type"]).toContain("application/json");
  });
});
