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
  const buttonAdd = await page.getByRole("button", { name: "Add" });
  // const gameOverModal = await page.getByRole('div', { name: 'game-over-modal' });
  const gameOverModal = page.locator('div[name="game-over-modal"]');
  // xlink - real word that is not going to be in the game,
  // but will exists in the dictionary
  await input.click();
  await input.fill("xlink");
  await buttonAdd.click();
  // TODO: make it more dynamic and not hardcode,
  // or can use first four rounds to check the correct classes of the letters
  await input.click();
  await input.fill("xlink");
  await buttonAdd.click();

  await input.click();
  await input.fill("xlink");
  await buttonAdd.click();

  await input.click();
  await input.fill("xlink");
  await buttonAdd.click();

  await input.click();
  await input.fill("xlink");
  await buttonAdd.click();

  await expect(gameOverModal).toBeVisible();
  // TODO: move to i18n
  await expect(gameOverModal).toContainText("Game over");
  await expect(gameOverModal).toContainText("Sorry, you lost! The corrrect word was:");

  const tryAgainButton = page.getByRole("button", { name: "Try again" });
  await expect(tryAgainButton).toBeVisible();
  await tryAgainButton.click();
  await expect(gameOverModal).not.toBeVisible();

  const gamePage = page.locator("#game-container");
  await expect(gamePage).toBeVisible();
});

// npx playwright test
// npx playwright test --ui
