import { expect } from "@playwright/test";

export const goto = async (page) => {
  await page.goto("http://localhost:3000");
};

export const waitForGameContainer = async (page) => {
  const gameContainer = page.locator("#game-container");
  await expect(gameContainer).toBeVisible();
};

export const setTargetWord = async (page, word) => {
  await page.evaluate((word) => {
    localStorage.setItem("targetWord", word);
  }, word);
  await page.reload();
};

export const fillInput = async (page, text) => {
  const input = page.getByRole("textbox", {
    name: "forms.main.wordInputLabel",
  });
  await input.fill(text);
};

export const clickAddButton = async (page) => {
  const addButton = page.getByRole("button", { name: "Add" });
  await addButton.click();
};

export const getCellColours = async (page, rowIndex) => {
  const cellSelector = `#game-container .row:nth-child(${rowIndex + 1}) .letter-cell`;
  await page.waitForSelector(cellSelector, { timeout: 3000 });
  return await page
    .locator(cellSelector)
    .evaluateAll((cells) =>
      cells.map((cell) => cell.getAttribute("class").trim()),
    );
};

export const getVictoryModal = (page) => page.getByTestId("victory-modal");
export const getGameOverModal = (page) => page.getByTestId("game-over-modal");
export const getGameContainer = (page) => page.locator("#game-container");
