import { expect, test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("Log in to test account", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Username").fill("test");
  await page.getByLabel("Password").fill("test");
  await page.waitForTimeout(500); // Delay so that it doesn't freak out
  await page.getByRole("button", { name: "Log In" }).click();
  await page.waitForURL("/");
  await expect(page.getByText("Sign Out")).toBeVisible(); // Verifies we are logged in and the navbar updated
  await page.context().storageState({ path: authFile });
});
