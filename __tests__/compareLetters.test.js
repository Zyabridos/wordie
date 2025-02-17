import { describe, expect, test } from "@jest/globals";
import { compareLetters } from "../src/utils/gameUtils.js";

const testCases = [
  ["flood", "flood", ["correct", "correct", "correct", "correct", "correct"]],
  ["flood", "force", ["correct", "misplaced", "wrong", "wrong", "wrong"]],
  ["water", "otter", ["wrong", "wrong", "correct", "correct", "correct"]],
];

describe("compareLetters should mark all letters correctly", () => {
  test.each(testCases)("compare letters", (target, answer, expected) => {
    const actual = compareLetters(target, answer);
    expect(actual).toEqual(expected);
  });
});
