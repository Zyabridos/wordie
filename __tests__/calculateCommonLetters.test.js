import { describe, expect, test } from "@jest/globals";
import { calculateCommonLetters } from "../src/utils/gameUtils.js";

const testCases = [
  ["water", "otter", { t: 2, e: 1, r: 1 }],
  ["apple", "hound", {}],
  ["food", "flood", { f: 1, o: 2, d: 1 }],
];

describe("calculateCommonLetters", () => {
  test.each(testCases)(
    "calculates common letters",
    (target, answer, expected) => {
      const actual = calculateCommonLetters(target, answer);
      expect(actual).toEqual(expected);
    },
  );
});
