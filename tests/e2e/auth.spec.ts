import { expect, test } from "@playwright/test";

// This should not be logged in for the purposes of this test.
test.use({ storageState: { cookies: [], origins: [] } });

test("Can navigate creating account", async ({ page }, workerInfo) => {
  const testAccount = {
    username: `test${workerInfo.project.name}`,
    email: `test${workerInfo.project.name}+clerk_test@test.com`,
    password: "testPassword$5",
    verificationCode: "424242",
  };

  await page.goto("/signup");
  await page.getByLabel("Username").fill(testAccount.username);
  await page.getByLabel("Email").fill(testAccount.email);
  await page.getByLabel("Password", { exact: true }).fill(testAccount.password);
  await page.getByLabel("Confirm Password").fill(testAccount.password);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForTimeout(500); // Wait for response
  await expect(page.getByTestId("verification-form")).toBeVisible();
  await expect(page.getByTestId("verification-form")).toHaveText(
    new RegExp(`test${workerInfo.project.name}[+]clerk_test@test.com`),
  );
  await page.getByLabel("Code").fill(testAccount.verificationCode);
  await page.getByRole("button", { name: "Verify" }).click();
  await expect(page).toHaveURL("/user/onboarding");

  // Cleanup: delete test account.
  await page.getByTestId("userbutton").click();
  await page.getByText("Manage Account").click();
  await page.waitForTimeout(500); // Wait for response
  await page.locator('button:text("Delete Account")').click();
  await page.getByLabel("Confirmation").fill("Delete account");
  await page.locator('button:text("Delete Account")').click();
});
