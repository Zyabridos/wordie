import { describe, it, expect } from "@jest/globals";
// import { compareLetters } from "../src/utils.js";
import { compareLetters } from "../src/utils/gameUtils.js";

describe("compareLetters should mark all letters correctly", () => {
  it("target word: flood, typed: flood", () => {
    const actual = compareLetters("flood", "flood");
    const expected = Array(5).fill("correct");

    expect(actual).toEqual(expected);
  });

  it("target word: flood, typed: force", () => {
    const expected = ["correct", "misplaced", "wrong", "wrong", "wrong"];
    const actual = compareLetters("flood", "force");

    expect(actual).toEqual(expected);
  });

  it("target word: water, typed: otter", () => {
    const expected = ["wrong", "wrong", "correct", "correct", "correct"];
    const actual = compareLetters("water", "otter");

    expect(actual).toEqual(expected);
  });
});
