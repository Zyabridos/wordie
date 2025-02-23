import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  compareLetters,
  updateGameState,
  checkGameStatus,
  updateColoursForRound,
} from "../utils/gameUtils.js";
import useCellColours from "./useCellColours.js";
import useModalState from "./useModalState.js";
import { handleInputValidation } from "../utils/handleInputValidation.js";
import { DEFAULT_AMOUNT_OF_ROUNDS } from "../defaultConstants.js";

const useHandleSubmit = () => {
  const dispatch = useDispatch();
  const targetWordObj = useSelector((state) => state.game.targetWord);
  const roundsCount = useSelector((state) => state.round.roundsCount);
  const inputText = useSelector((state) => state.game.inputText);
  const { cellColours, updateCellColours } = useCellColours();
  const { openVictory, openGameOver } = useModalState();

  return useCallback(
    async (e) => {
      e.preventDefault();

      const trimmedInput = await handleInputValidation(inputText, dispatch);
      if (!trimmedInput) return;

      const targetWord = targetWordObj ? targetWordObj.word : "";
      const newAnswer = compareLetters(targetWord.toLowerCase(), trimmedInput);

      updateColoursForRound(
        cellColours,
        newAnswer,
        roundsCount,
        updateCellColours,
      );

      updateGameState(dispatch, newAnswer, targetWord, trimmedInput);

      checkGameStatus(
        newAnswer,
        roundsCount,
        targetWord,
        openVictory,
        openGameOver,
        DEFAULT_AMOUNT_OF_ROUNDS,
      );
    },
    [
      dispatch,
      targetWordObj,
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
