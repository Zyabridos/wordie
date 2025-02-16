import { test, expect } from "@playwright/test";
class GamePage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("http://localhost:3000");
  }

  async clickAddButton() {
    await this.page.getByRole("button", { name: "Add" }).click();
  }

  async fillInput(text) {
    await this.page
      .getByRole("textbox", { name: "forms.main.wordInputLabel" })
      .click();
    await this.page
      .getByRole("textbox", { name: "forms.main.wordInputLabel" })
      .fill(text);
  }
  async getCellColours(rowIndex) {
    await this.page.waitForSelector(
      `#game-container .row:nth-child(${rowIndex + 1}) .letter-cell`,
      { timeout: 3000 },
    );

    return await this.page
      .locator(`#game-container .row:nth-child(${rowIndex + 1}) .letter-cell`)
      .evaluateAll((cells) =>
        cells.map((cell) => cell.getAttribute("class").trim()),
      );
  }
}

let gamePage;

test.beforeEach(async ({ page }) => {
  gamePage = new GamePage(page);
  await gamePage.goto();
});

test("Open the page", async ({ page, context }) => {
  await page.goto("http://localhost:3000");
  await context.setOffline(true);

  const input = await page.getByRole("textbox", {
    name: "forms.main.wordInputLabel",
  });
  await expect(input).toBeVisible();
});

test("Losing after exactly 5 turns", async ({ page }) => {
  const gamePage = new GamePage(page);
  await gamePage.goto();

  await page.evaluate(() => {
    localStorage.setItem("targetWord", "water");
  });

  await page.reload();

  const gameOverModal = page.locator('div[role="dialog"]');

  for (let i = 0; i < 5; i += 1) {
    await gamePage.fillInput("otter");
    await gamePage.clickAddButton();
  }

  await page.waitForTimeout(1000);

  await expect(gameOverModal).toBeVisible();
  await expect(gameOverModal).toContainText(
    /Sorry, you lost! The correct word was:/,
  );

  const tryAgainButton = gameOverModal.getByRole("button", {
    name: "Try again",
  });
  await expect(tryAgainButton).toBeVisible();
  await tryAgainButton.click();
  await expect(gameOverModal).not.toBeVisible();

  const gameContainer = page.locator("#game-container");
  await expect(gameContainer).toBeVisible();
});

test("Expect errors messages to be visible", async ({ page }) => {
  const gamePage = new GamePage(page);
  await gamePage.goto();

  await gamePage.fillInput("jdkryb");
  await gamePage.clickAddButton();

  await expect(
    page.getByText("Invalid input. Please enter a 5-letter word"),
  ).toBeVisible();

  await gamePage.fillInput("jdkrb");
  await gamePage.clickAddButton();

  await expect(
    page.getByText(
      "Sorry, we don't have this word in our dictionary. Try another one",
    ),
  ).toBeVisible();
});

test("Letter colors are correct (target word: water)", async ({ page }) => {
  const gamePage = new GamePage(page);

  await gamePage.goto();
  await page.waitForTimeout(500);

  await page.evaluate(() => {
    localStorage.setItem("targetWord", "water");
  });

  await page.reload();

  await gamePage.fillInput("otter");
  await gamePage.clickAddButton();

  const firstRowColours = await gamePage.getCellColours(0);

  const expectedStatusesFirstRound = [
    "letter-cell wrong", // o
    "letter-cell wrong", // t
    "letter-cell correct", // t
    "letter-cell correct", // e
    "letter-cell correct", // r
  ];

  await expect(firstRowColours).toEqual(expectedStatusesFirstRound);

  const expectedStatusesSecondRound = Array(5).fill("letter-cell correct");
  await gamePage.fillInput("water");
  await gamePage.clickAddButton();

  await page.waitForTimeout(500);

  const secondRowColours = await gamePage.getCellColours(1);

  await expect(secondRowColours).toEqual(expectedStatusesSecondRound);
});

test("Letter colors are correct (target word: flood)", async ({ page }) => {
  const game = new GamePage(page);
  await game.goto();

  await page.evaluate(() => {
    localStorage.setItem("targetWord", "flood");
  });

  await page.reload();

  await game.fillInput("force");
  await game.clickAddButton();

  await page.waitForTimeout(1000);

  const firstRowColours = await game.getCellColours(0);

  const expectedStatusesFirstRound = [
    "letter-cell correct",
    "letter-cell misplaced",
    "letter-cell wrong",
    "letter-cell wrong",
    "letter-cell wrong",
  ];

  await expect(firstRowColours).toEqual(expectedStatusesFirstRound);

  await game.fillInput("flood");
  await game.clickAddButton();

  await page.waitForTimeout(1000);

  const secondRowColours = await game.getCellColours(1);

  const expectedStatusesSecondRound = Array(5).fill("letter-cell correct");

  await expect(secondRowColours).toEqual(expectedStatusesSecondRound);
});
