import { useState, useEffect } from "react";
import { fetchWords, getRandomWord } from "../utils.js";

const useTargetWord = (initialWord) => {
  const [targetArray, setTargetArray] = useState([]);
  const [targetWord, setTargetWord] = useState(initialWord || "");

  useEffect(() => {
    fetchWords().then((words) => {
      setTargetArray(words);
      const storedWord = localStorage.getItem("targetWord");
      if (storedWord) {
        setTargetWord(storedWord);
      } else if (!initialWord) {
        setTargetWord(getRandomWord(words));
      }
    });
  }, [initialWord]);

  return { targetWord, setTargetWord, targetArray };
};

export default useTargetWord;
