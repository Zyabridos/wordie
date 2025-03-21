import { test, expect } from "@playwright/test";
import {
  goto,
  waitForGameContainer,
  setTargetWord,
  fillInput,
  clickAddButton,
} from "./utils/gamePage.js";

let game;

test.beforeEach(async ({ page }) => {
  game = page;
  await goto(game);
  await waitForGameContainer(game);
});

test("Expect error messages to be visible", async () => {
  await setTargetWord(game, "jdkryb");
  await clickAddButton(game);
  await expect(
    game.getByText("Invalid input. Please enter a 5-letter word"),
  ).toBeVisible();

  await fillInput(game, "jdkrb");
  await clickAddButton(game);
  await expect(
    game.getByText(
      "Sorry, we don't have this word in our dictionary. Try another one",
    ),
  ).toBeVisible();
});
