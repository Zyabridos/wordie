import { test, expect } from "@playwright/test";

class GamePage {
  constructor(page) {
    this.page = page;
    this.input = page.getByRole("textbox", {
      name: "forms.main.wordInputLabel",
    });
    this.addButton = page.getByRole("button", { name: "Add" });
    this.gameContainer = page.locator("#game-container");
    this.victoryModal = page.getByTestId("victory-modal");
    this.gameOverModal = page.getByTestId("game-over-modal");
  }

  async goto() {
    await this.page.goto("http://localhost:3000");
  }

  async waitForGameContainer() {
    await expect(this.gameContainer).toBeVisible();
  }

  async setTargetWord(word) {
    await this.page.evaluate((word) => {
      localStorage.setItem("targetWord", word);
    }, word);
    await this.page.reload();
  }

  async fillInput(text) {
    await this.input.fill(text);
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async getCellColours(rowIndex) {
    const cellSelector = `#game-container .row:nth-child(${rowIndex + 1}) .letter-cell`;
    await this.page.waitForSelector(cellSelector, { timeout: 3000 });
    return await this.page
      .locator(cellSelector)
      .evaluateAll((cells) =>
        cells.map((cell) => cell.getAttribute("class").trim()),
      );
  }
}

let game;

test.beforeEach(async ({ page }) => {
  game = new GamePage(page);
  await game.goto();
  await game.waitForGameContainer();
});

test("Losing after exactly 5 turns", async ({ page }) => {
  await game.setTargetWord("water");

  await page.reload();

  for (let i = 0; i < 5; i += 1) {
    await game.fillInput("otter");
    await game.clickAddButton();
  }

  await page.waitForTimeout(1000);

  await expect(game.gameOverModal).toBeVisible();
  await expect(game.gameOverModal).toContainText(
    /Sorry, you lost! The correct word was:/,
  );

  const tryAgainButton = game.gameOverModal.getByRole("button", {
    name: "Try again",
  });
  await expect(tryAgainButton).toBeVisible();
  await tryAgainButton.click();
  await expect(game.gameOverModal).not.toBeVisible();

  await expect(game.gameContainer).toBeVisible();
});

test("Expect error messages to be visible", async () => {
  await game.fillInput("jdkryb");
  await game.clickAddButton();
  await expect(
    game.page.getByText("Invalid input. Please enter a 5-letter word"),
  ).toBeVisible();

  await game.fillInput("jdkrb");
  await game.clickAddButton();
  await expect(
    game.page.getByText(
      "Sorry, we don't have this word in our dictionary. Try another one",
    ),
  ).toBeVisible();
});

test("Letter colors are correct (target word: water)", async () => {
  await game.setTargetWord("water");

  await game.fillInput("otter");
  await game.clickAddButton();

  const expectedFirstRow = [
    "letter-cell wrong",
    "letter-cell wrong",
    "letter-cell correct",
    "letter-cell correct",
    "letter-cell correct",
  ];
  await expect(await game.getCellColours(0)).toEqual(expectedFirstRow);

  await game.fillInput("water");
  await game.clickAddButton();
  await expect(await game.getCellColours(1)).toEqual(
    Array(5).fill("letter-cell correct"),
  );
});

test("Letter colors are correct (target word: flood)", async () => {
  await game.setTargetWord("flood");

  await game.fillInput("force");
  await game.clickAddButton();
  const expectedFirstRow = [
    "letter-cell correct",
    "letter-cell misplaced",
    "letter-cell wrong",
    "letter-cell wrong",
    "letter-cell wrong",
  ];
  await expect(await game.getCellColours(0)).toEqual(expectedFirstRow);

  await game.fillInput("flood");
  await game.clickAddButton();
  await expect(await game.getCellColours(1)).toEqual(
    Array(5).fill("letter-cell correct"),
  );
});

test("Victory modal shows up", async () => {
  await game.setTargetWord("water");

  await game.fillInput("water");
  await game.clickAddButton();

  await game.page.waitForSelector("[data-testid='victory-modal']", {
    timeout: 5000,
  });

  await expect(game.victoryModal).toBeVisible();
  const tryAgainButton = game.victoryModal.getByRole("button", {
    name: "Try again",
  });
  await expect(tryAgainButton).toBeVisible();
  await tryAgainButton.click();
  await expect(game.victoryModal).not.toBeVisible();
  await game.waitForGameContainer();
});
