import { test, expect } from "@playwright/test";
import {
  goto,
  waitForGameContainer,
  setTargetWord,
  fillInput,
  clickAddButton,
  getCellColours,
} from "./utils/gamePage.js"

let game;

test.beforeEach(async ({ page }) => {
  game = page;
  await goto(game);
  await waitForGameContainer(game);
});

test("Letter colors are correct (target word: water)", async () => {
  await setTargetWord(game, "water");

  await fillInput(game, "otter");
  await clickAddButton(game);

  const expectedFirstRow = [
    "letter-cell wrong",
    "letter-cell wrong",
    "letter-cell correct",
    "letter-cell correct",
    "letter-cell correct",
  ];
  await expect(await getCellColours(game, 0)).toEqual(expectedFirstRow);

  await fillInput(game, "water");
  await clickAddButton(game);
  await expect(await getCellColours(game, 1)).toEqual(
    Array(5).fill("letter-cell correct")
  );
});

test("Letter colors are correct (target word: flood)", async () => {
  await setTargetWord(game, "flood");

  await fillInput(game, "force");
  await clickAddButton(game);
  const expectedFirstRow = [
    "letter-cell correct",
    "letter-cell misplaced",
    "letter-cell wrong",
    "letter-cell wrong",
    "letter-cell wrong",
  ];
  await expect(await getCellColours(game, 0)).toEqual(expectedFirstRow);

  await fillInput(game, "flood");
  await clickAddButton(game);
  await expect(await getCellColours(game, 1)).toEqual(
    Array(5).fill("letter-cell correct")
  );
});
