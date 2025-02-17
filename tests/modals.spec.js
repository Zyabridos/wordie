import { test, expect } from "@playwright/test";
import {
  goto,
  waitForGameContainer,
  setTargetWord,
  fillInput,
  clickAddButton,
  getVictoryModal,
  getGameOverModal,
  getGameContainer,
} from "./utils/gamePage.js";

let game;

test.beforeEach(async ({ page }) => {
  game = page;
  await goto(game);
  await waitForGameContainer(game);
});

test("Get a game over modal after exactly 5 turns", async () => {
  await setTargetWord(game, "water");
  await game.reload();

  for (let i = 0; i < 5; i += 1) {
    await fillInput(game, "otter");
    await clickAddButton(game);
  }

  await game.waitForTimeout(1000);

  await game.waitForSelector('[data-testid="game-over-modal"]', {
    timeout: 10000,
  });

  const gameOverModal = getGameOverModal(game);
  await expect(gameOverModal).toBeVisible();
  await expect(gameOverModal).toContainText(
    /Sorry, you lost! The correct word was:/,
  );

  const playAgain = gameOverModal.getByRole("button", {
    name: "Play again",
  });
  await expect(playAgain).toBeVisible();
  await playAgain.click();
  await expect(gameOverModal).not.toBeVisible();

  await expect(getGameContainer(game)).toBeVisible();
});

test("Victory modal shows up", async () => {
  await setTargetWord(game, "water");

  await fillInput(game, "water");
  await clickAddButton(game);

  await game.waitForSelector("[data-testid='victory-modal']", {
    timeout: 5000,
  });

  const victoryModal = getVictoryModal(game);
  await expect(victoryModal).toBeVisible();
  const playAgain = victoryModal.getByRole("button", {
    name: "Play again",
  });
  await expect(playAgain).toBeVisible();
  await playAgain.click();
  await expect(victoryModal).not.toBeVisible();
  await waitForGameContainer(game);
});
