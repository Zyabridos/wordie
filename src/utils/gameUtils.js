import {
  addAnswer,
  setCommonLetters,
  resetInputText,
  setInputText,
} from "../store/slices/gameSlice.js";
import { incrementRoundsCount } from "../store/slices/roundSlice.js";

export const countLetters = (word) => {
  return [...word].reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
};

export const calculateCommonLetters = (target, answer) => {
  const commonLetters = {};
  for (const char of answer) {
    if (target.includes(char)) {
      commonLetters[char] = (commonLetters[char] || 0) + 1;
    }
  }
  return commonLetters;
};

export const markCorrectLetters = (target, answer, letterCount) => {
  return answer.split("").map((char, index) => {
    if (char === target[index]) {
      letterCount[char]--;
      return "correct";
    }
    return "wrong";
  });
};

export const markMisplacedLetters = (answer, result, letterCount) => {
  return result.map((status, index) => {
    const char = answer[index];
    if (status === "wrong" && letterCount[char] > 0) {
      letterCount[char]--;
      return "misplaced";
    }
    return status;
  });
};

export const compareLetters = (target, answer) => {
  if (answer.length !== target.length) {
    throw new Error("Words length mismatch");
  }

  const letterCount = countLetters(target);
  const result = markCorrectLetters(target, answer, letterCount);
  return markMisplacedLetters(answer, result, letterCount);
};

export const updateColoursForRound = (
  cellColours,
  newAnswer,
  roundsCount,
  updateCellColours,
) => {
  const updatedColours = cellColours.map((row, rowIndex) =>
    rowIndex === roundsCount - 1 ? [...newAnswer] : [...row],
  );
  updateCellColours(updatedColours);
};

export const checkGameStatus = (
  newAnswer,
  roundsCount,
  targetWord,
  openVictory,
  openGameOver,
  maxRounds,
) => {
  if (newAnswer.every((letter) => letter === "correct")) {
    openVictory();
  } else if (roundsCount === maxRounds) {
    openGameOver(targetWord);
  }
};

export const updateGameState = (
  dispatch,
  newAnswer,
  targetWord,
  trimmedInput,
) => {
  dispatch(addAnswer(newAnswer));
  dispatch(setCommonLetters(calculateCommonLetters(targetWord, trimmedInput)));
  dispatch(resetInputText());
  dispatch(incrementRoundsCount());
  dispatch(setInputText(""));
};
