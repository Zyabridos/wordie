import { test, expect } from "@playwright/test";
// import Gameform from "../frontend/src/components/GameForm/Gameform";
// import { mount } from "playwright/experimental-ct-react";
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
}

let gamePage;

test.beforeEach(async ({ page }) => {
  gamePage = new GamePage(page);
  await gamePage.goto();
});

// // NOTE: check vite config to set localhost 5173 as default
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
