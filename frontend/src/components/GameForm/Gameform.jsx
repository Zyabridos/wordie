import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWord, clearWords } from "../../store/slices/wordsSlice.js";
import "./App.css";
import WORDSLIST from "../../wordsList.js";
import { getRandomWord, compareCommonLetters } from "../../utils.js";
import { useTranslation } from "react-i18next";

const WordComponent = ({ word }) => {
  return <div className="cell">{word}</div>;
};

const Temp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const words = useSelector((state) => state.words);

  const [targetWord, setTargetWord] = useState(getRandomWord(WORDSLIST));
  const [targetArray, setTargetArray] = useState(targetWord.split(""));
  const [inputText, setInputText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [roundsCount, setRoundsCount] = useState(1);
  const [commonLetters, setCommonLetters] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim().length !== 5) {
      alert("Invalid input. Please enter a 5-letter word.");
      return;
    }

    dispatch(addWord({ body: inputText.trim() }));

    const wordArray = inputText.split("");
    const answer = Array(5).fill("wrong");

    const letterCount = {};
    targetArray.forEach((char) => {
      letterCount[char] = (letterCount[char] || 0) + 1;
    });

    wordArray.forEach((char, index) => {
      if (char === targetArray[index]) {
        answer[index] = "correct";
        letterCount[char]--;
      }
    });

    wordArray.forEach((char, index) => {
      if (answer[index] === "wrong" && letterCount[char] > 0) {
        answer[index] = "misplaced";
        letterCount[char]--;
      }
    });

    setAnswers([...answers, answer]);
    setCommonLetters(compareCommonLetters(inputText.trim(), targetWord));

    console.log("answer: ", answer);
    console.log("targetWord: ", targetWord);
    setRoundsCount(roundsCount + 1);
    console.log(roundsCount);

    if (answer.every((letter) => letter === "correct") && roundsCount <= 5) {
      alert("Congrats! You have won!");
    } else if (roundsCount === 5) {
      alert("Sorry, you have lost!");
    }

    setInputText("");
  };

  const clearRound = (e) => {
    e.preventDefault();
    dispatch(clearWords());
    const newWord = getRandomWord(WORDSLIST);
    setTargetWord(newWord);
    setTargetArray(newWord.split(""));
    setAnswers([]);
    setRoundsCount(1);
    setCommonLetters({});
  };

  return (
    <div id="game-container">
      <div className="grid">
        {words.map((word, index) => (
          <WordComponent key={index} word={word.body} />
        ))}
      </div>
      <form className="py-1 border rounded-2" onSubmit={handleSubmit}>
        <input
          name="body"
          aria-label={t("forms.main.wordInputLabel")}
          placeholder={t("forms.main.wordInputPlaceholder")}
          className="border-0 p-0 ps-2 form-control"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">{t("forms.main.buttonAdd")}</button>
        <button type="button" onClick={clearRound}>
          {t("forms.main.buttonClear")}
        </button>
        <div className="answer-progress">
          {t("forms.main.answerProgress")}
          {answers.length > 0 ? answers[answers.length - 1].join(" ") : ""}
        </div>
      </form>
    </div>
  );
};

export default Temp;
