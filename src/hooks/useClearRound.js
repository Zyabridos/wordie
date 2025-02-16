import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearWords } from "../store/slices/wordsSlice.js";
import {
  setTargetWord,
  resetRoundsCount,
  resetAnswers,
  resetCommonLetters,
  resetInputError,
  resetInputText,
} from "../store/slices/gameSlice.js";
import useCellColours from "./useCellColours.js";
import { getRandomWord } from "../utils.js";

const useClearRound = () => {
  const dispatch = useDispatch();
  const targetArray = useSelector((state) => state.game.targetArray);
  const { clearColours } = useCellColours();

  return useCallback(() => {
    dispatch(clearWords());

    const newWord = getRandomWord(targetArray);
    localStorage.setItem("targetWord", newWord);
    dispatch(setTargetWord(newWord));

    dispatch(resetAnswers());
    dispatch(resetCommonLetters());
    dispatch(resetRoundsCount());
    dispatch(resetInputError());
    dispatch(resetInputText());

    clearColours();
    localStorage.removeItem("cellColours");
  }, [dispatch, targetArray, clearColours]);
};

export default useClearRound;
