import { test, expect } from "@playwright/test";
class GamePage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("http://localhost:5173");
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
      .evaluateAll((cells) => cells.map((cell) => cell.className));
  }
}

let gamePage;

test.beforeEach(async ({ page }) => {
  gamePage = new GamePage(page);
  await gamePage.goto();
});

// NOTE: check vite config to set localhost 5173 as default
test("Open the page", async ({ page, context }) => {
  await page.goto("http://localhost:5173");
  await context.setOffline(true);

  const input = await page.getByRole("textbox", {
    name: "forms.main.wordInputLabel",
  });
  await expect(input).toBeVisible();
});

test("Losing after exactly 5 turns", async ({ page, context }) => {
  const gamePage = new GamePage(page);
  // for now, eventually will fix it cuz it is unaxeptable behavior
  const buttonClear = await page.getByRole("button", { name: "Add" });
  await buttonClear.click();

  const gameOverModal = page.locator('div[name="game-over-modal"]');
  // xlink - real word that is not going to be in the game,
  // but will exists in the test dictionary

  for (let i = 0; i < 5; i += 1) {
    await gamePage.fillInput("xlink");
    await gamePage.clickAddButton();
  }

  await expect(gameOverModal).toBeVisible();
  await expect(gameOverModal).toContainText("modals.gameOver.title");
  await expect(gameOverModal).toContainText("modals.gameOver.message");

  const tryAgainButton = page.getByRole("button", {
    name: "forms.main.buttonClear",
  });
  await expect(tryAgainButton).toBeVisible();
  await tryAgainButton.click();
  await expect(gameOverModal).not.toBeVisible();

  const gameContainer = page.locator("#game-container");
  await expect(gameContainer).toBeVisible();
});

test("Expect errors messages to be visible", async ({ page }) => {
  const gamePage = new GamePage(page);

  await gamePage.fillInput("kf;4!");
  await gamePage.clickAddButton();
  await expect(page.getByText("Invalid input. Please enter")).toBeVisible();

  await page
    .getByRole("textbox", { name: "forms.main.wordInputLabel" })
    .fill("");

  await gamePage.fillInput("ghфfh");
  await gamePage.clickAddButton();
  await expect(page.getByText("Invalid input. Please enter")).toBeVisible();

  await page
    .getByRole("textbox", { name: "forms.main.wordInputLabel" })
    .fill("");

  await gamePage.fillInput("jdkryb");
  await gamePage.clickAddButton();

  await expect(
    page.getByText("Invalid input. Please enter a 5-letter word"),
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

  const expectedStatusesSecondRound = [
    "letter-cell correct", // w
    "letter-cell correct", // a
    "letter-cell correct", // t
    "letter-cell correct", // e
    "letter-cell correct", // r
  ];
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

  const firstRowColours = await game.getCellColours(0);

  const expectedStatusesFirstRound = [
    "letter-cell correct", // f
    "letter-cell misplaced", // o
    "letter-cell wrong", // r
    "letter-cell wrong", // c
    "letter-cell wrong", // e
  ];

  await expect(firstRowColours).toEqual(expectedStatusesFirstRound);

  const expectedStatusesSecondRound = [
    "letter-cell correct", // f
    "letter-cell correct", // o
    "letter-cell correct", // r
    "letter-cell correct", // c
    "letter-cell correct", // e
  ];

  await game.fillInput("flood");
  await game.clickAddButton();

  await page.waitForTimeout(500);

  const secondRowColours = await game.getCellColours(1);

  await expect(secondRowColours).toEqual(expectedStatusesSecondRound);
});
