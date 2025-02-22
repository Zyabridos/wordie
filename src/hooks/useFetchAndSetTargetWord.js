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
      let storedWordId = localStorage.getItem("targetWordId");

      if (!storedWord || !storedWordId) {
        const randomWordObj = getRandomWord(words);
        if (randomWordObj) {
          storedWord = randomWordObj.word;
          storedWordId = randomWordObj.id;
          localStorage.setItem("targetWord", storedWord);
          localStorage.setItem("targetWordId", storedWordId);
        }
      }
      dispatch(setTargetWord({ id: storedWordId, word: storedWord }));
    });
  }, [dispatch]);
};

export default useFetchAndSetTargetWord;
