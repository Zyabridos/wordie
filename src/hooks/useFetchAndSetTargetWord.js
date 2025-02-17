import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRandomWord, fetchWords } from "../utils/wordUtils.js";
import { setTargetWord, setTargetArray } from "../store/slices/gameSlice.js";

const useFetchAndSetTargetWord = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchWords().then((words) => {
      dispatch(setTargetArray(words));

      let storedWord = localStorage.getItem("targetWord");

      if (!storedWord) {
        storedWord = getRandomWord(words);
        localStorage.setItem("targetWord", storedWord);
      }

      dispatch(setTargetWord(storedWord));
    });
  }, [dispatch]);
};

export default useFetchAndSetTargetWord;
