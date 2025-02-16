import { useCallback } from "react";
import { getRandomWord } from "../utils.js";
import { clearWords } from "../store/slices/wordsSlice.js";

const useClearRound = (
  dispatch,
  setTargetWord,
  setAnswers,
  setRoundsCount,
  setCommonLetters,
  setInputError,
  setCellColours,
  targetArray,
  initialWord,
) => {
  return useCallback(() => {
    dispatch(clearWords());
    const newWord = initialWord || getRandomWord(targetArray);
    setTargetWord(newWord);
    setAnswers([]);
    setRoundsCount(1);
    setCommonLetters({});
    setInputError("");
    setCellColours(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill("")),
    );
    localStorage.removeItem("cellColours");
  }, [
    dispatch,
    setTargetWord,
    setAnswers,
    setRoundsCount,
    setCommonLetters,
    setInputError,
    setCellColours,
    targetArray,
    initialWord,
  ]);
};

export default useClearRound;
