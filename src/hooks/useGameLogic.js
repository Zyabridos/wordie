import useClearRound from "./useClearRound.js";
import useHandleSubmit from "./useHandleSubmit.js";
import { useState } from "react";

const useGameLogic = ({
  dispatch,
  setTargetWord,
  setAnswers,
  setRoundsCount,
  setCommonLetters,
  setInputError,
  setCellColours,
  targetArray,
  initialWord,
  openModal,
  targetWord,
  roundsCount,
}) => {
  const [inputText, setInputText] = useState("");

  const clearRound = useClearRound(
    dispatch,
    setTargetWord,
    setAnswers,
    setRoundsCount,
    setCommonLetters,
    setInputError,
    setCellColours,
    targetArray,
    initialWord,
  );

  const handleSubmit = useHandleSubmit(
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
  );

  return { clearRound, handleSubmit, inputText, setInputText };
};

export default useGameLogic;
