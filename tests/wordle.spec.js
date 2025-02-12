import { test, expect } from "@playwright/test";

// NOTE: check vite config to set localhost 5173 as default
test("The app shoild work locally", async ({ page, context }) => {
  await page.goto("http://localhost:5173");
  await context.setOffline(true);

  const input = await page.getByPlaceholder("Type a word...");
  await expect(input).toBeVisible();
});

test("Losing after exactly 5 turns", async ({ page, context }) => {
  await page.goto("http://localhost:5173");
  await context.setOffline(true);

  // for now, eventually will fix it cuz it is unaxeptable behavior
  const buttonClear = await page.getByRole("button", { name: "Clear" });
  buttonClear.click();

  const input = await page.getByPlaceholder("Type a word...");
  // xlink - real word that is not going to be in the game,
  // but will exists in the dictionary
  await input.click();
  await input.fill("xlink");

  await input.click();
  await input.fill("xlink");

  await input.click();
  await input.fill("xlink");

  await input.click();
  await input.fill("xlink");

  await input.click();
  await input.fill("xlink");
});

// npx playwright test
// npx playwright test --ui
