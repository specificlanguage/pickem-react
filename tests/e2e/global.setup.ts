import { test as setup, expect } from "@playwright/test";

setup("addAccount", async ({ page }) => {
  page.on("console", (msg) => console.log(msg.text()));

  await page.goto("/signup");
  await page.getByLabel("Username").fill("testuser");
  await page.getByLabel("Email").fill("testuser@test.com");
  await page.getByLabel("Password", { exact: true }).fill("testPassword$5");
  await page.getByLabel("Confirm Password").fill("testPassword$5");
  await page.getByText("Register").click();
  await expect(page.getByRole("main")).toHaveText(/onboarding!/, {
    timeout: 3000,
  });
  await expect(page.getByRole("main")).toHaveText(/testuser/);

  await page.getByText("Sign Out").click();
  await page.getByText("Log In").click();

  await page.getByLabel("Email").fill("testuser@test.com");
  await page.getByLabel("Password", { exact: true }).fill("testPassword$5");
  await page.getByRole("button", { name: "Log In" }).click();
  await page.waitForURL("/");

  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
