import { describe, it, expect } from "@jest/globals";
import { calculateCommonLetters } from "../src/utils/gameUtils.js";

describe("calculateCommonLetters", () => {
  it("correct amount of common letters (water vs otter)", () => {
    const actual = calculateCommonLetters("water", "otter");
    const expected = { t: 2, e: 1, r: 1 };
    expect(actual).toEqual(expected);
  });

  it("no common letters (world vs apple)", () => {
    const actual = calculateCommonLetters("apple", "hound");
    const expected = {};
    expect(actual).toEqual(expected);
  });

  it("count duplicate letters (food vs flood)", () => {
    const actual = calculateCommonLetters("food", "flood");
    const expected = { f: 1, o: 2, d: 1 };

    expect(actual).toEqual(expected);
  });
});
