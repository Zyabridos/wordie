import { useCallback } from "react";
import { addWord } from "../store/slices/wordsSlice.js";
import getInputError from "../errorHandler.js";
import { compareCommonLetters } from "../utils.js";

const useHandleSubmit = (
  dispatch,
  inputText,
  setInputError,
  setCellColours,
  setAnswers,
  setCommonLetters,
  openModal,
  targetWord,
  roundsCount,
  setRoundsCount,
) => {
  return useCallback(
    async (e) => {
      e.preventDefault();

      const error = await getInputError(inputText.trim());
      if (error) {
        setInputError(error);
        return;
      }

      setInputError("");
      dispatch(addWord({ body: inputText.trim().toLowerCase() }));

      const wordArray = inputText.toLowerCase().split("");
      const newAnswer = Array(5).fill("wrong");

      const letterCount = targetWord.split("").reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
      }, {});

      wordArray.forEach((char, index) => {
        if (char === targetWord[index]) {
          newAnswer[index] = "correct";
          letterCount[char]--;
        }
      });

      wordArray.forEach((char, index) => {
        if (newAnswer[index] === "wrong" && letterCount[char] > 0) {
          newAnswer[index] = "misplaced";
          letterCount[char]--;
        }
      });

      setCellColours((prevColours) =>
        prevColours.map((row, rowIndex) =>
          rowIndex === roundsCount - 1 ? [...newAnswer] : [...row],
        ),
      );

      setAnswers((prev) => [...prev, newAnswer]);
      setCommonLetters(
        compareCommonLetters(inputText.trim().toLowerCase(), targetWord),
      );

      if (newAnswer.every((letter) => letter === "correct")) {
        openModal("victory", { targetWord });
      } else if (roundsCount === 5) {
        openModal("gameOver", { targetWord });
      }

      setRoundsCount((prev) => prev + 1);
    },
    [
      dispatch,
      inputText,
      setInputError,
      setCellColours,
      setAnswers,
      setCommonLetters,
      openModal,
      targetWord,
      roundsCount,
      setRoundsCount,
    ],
  );
};

export default useHandleSubmit;
