import { expect, test } from "@playwright/test";

test("checks authenticated home page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("main")).toHaveText("Welcome Home, test!");
});
