import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnswer,
  setCommonLetters,
  setInputText,
  resetInputText,
} from "../store/slices/gameSlice.js";
import { incrementRoundsCount } from "../store/slices/roundSlice.js";
import { compareLetters, calculateCommonLetters } from "../utils/gameUtils.js";
import useCellColours from "./useCellColours.js";
import useModalState from "./useModalState.js";
import { handleInputValidation } from "../utils/handleInputValidation.js";

const useHandleSubmit = () => {
  const dispatch = useDispatch();
  const targetWord = useSelector((state) => state.game.targetWord);
  const roundsCount = useSelector((state) => state.round.roundsCount);
  const inputText = useSelector((state) => state.game.inputText);
  const { cellColours, updateCellColours } = useCellColours();
  const { openVictory, openGameOver } = useModalState();

  return useCallback(
    async (e) => {
      e.preventDefault();

      const trimmedInput = await handleInputValidation(inputText, dispatch);
      if (!trimmedInput) return;

      const newAnswer = compareLetters(targetWord.toLowerCase(), trimmedInput);

      const updatedColours = cellColours.map((row, rowIndex) =>
        rowIndex === roundsCount - 1 ? [...newAnswer] : [...row],
      );
      updateCellColours(updatedColours);

      dispatch(addAnswer(newAnswer));
      dispatch(
        setCommonLetters(calculateCommonLetters(targetWord, trimmedInput)),
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
