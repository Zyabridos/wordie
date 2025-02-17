import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "../store/slices/wordsSlice.js";
import {
  addAnswer,
  incrementRoundsCount,
  setCommonLetters,
  setInputText,
  resetInputText,
  setInputError,
  resetInputError,
} from "../store/slices/gameSlice.js";
import getInputError from "../errorHandler.js";
import { compareCommonLetters } from "../utils.js";
import useCellColours from "./useCellColours.js";
import useModalState from "./useModalState.js";

const useHandleSubmit = () => {
  const dispatch = useDispatch();
  const targetWord = useSelector((state) => state.game.targetWord);
  const roundsCount = useSelector((state) => state.game.roundsCount);
  const inputText = useSelector((state) => state.game.inputText);
  const { cellColours, updateCellColours } = useCellColours();
  const { openVictory, openGameOver } = useModalState();

  return useCallback(
    async (e) => {
      e.preventDefault();

      const error = await getInputError(inputText.trim());
      if (error) {
        dispatch(setInputError(error));
        return;
      }

      dispatch(resetInputError());
      dispatch(addWord({ body: inputText.trim().toLowerCase() }));

      const wordArray = inputText.toLowerCase().split("");
      const newAnswer = Array(5).fill("wrong");

      const letterCount = {};
      targetWord.split("").forEach((char) => {
        letterCount[char] = (letterCount[char] || 0) + 1;
      });

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

      const updatedColours = cellColours.map((row, rowIndex) =>
        rowIndex === roundsCount - 1 ? [...newAnswer] : [...row],
      );

      updateCellColours(updatedColours);
      dispatch(addAnswer(newAnswer));
      dispatch(
        setCommonLetters(
          compareCommonLetters(inputText.trim().toLowerCase(), targetWord),
        ),
      );

      if (newAnswer.every((letter) => letter === "correct")) {
        openVictory();
      } else if (roundsCount === 5) {
        openGameOver();
      }

      dispatch(resetInputText());
      dispatch(incrementRoundsCount());
      dispatch(setInputText(""));
    },
    [
      dispatch,
      targetWord,
      roundsCount,
      inputText,
      cellColours,
      updateCellColours,
      openVictory,
      openGameOver,
    ],
  );
};

export default useHandleSubmit;
