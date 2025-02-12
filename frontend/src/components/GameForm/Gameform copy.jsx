import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWord, clearWords } from "../../store/slices/wordsSlice.js";
import "./Gameform.css";
import WORDSLIST from "../../wordsList.js";
import { getRandomWord, compareCommonLetters } from "../../utils.js";
import { useTranslation } from "react-i18next";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";

// const WordComponent = ({ word }) => {
//   // return <div className="cell">{word}</div>;
//   const wordArray = word.split("");
//   return <div className="cell">{wordArray.forEach((char) => {char})}</div>;
// };

const Temp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const words = useSelector((state) => state.words);

  const [validated, setValidated] = useState(false);
  const [inputError, setInputError] = useState("");

  const [targetWord, setTargetWord] = useState(getRandomWord(WORDSLIST));
  const [targetArray, setTargetArray] = useState(targetWord.split(""));
  const [inputText, setInputText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [roundsCount, setRoundsCount] = useState(1);
  const [commonLetters, setCommonLetters] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setValidated(true);

    if (inputText.trim().length !== 5) {
      setInputError("Invalid input. Please enter a 5-letter word.");
      return;
    }

    setInputError("");

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
    if (roundsCount === 5) {
      setInputError("Sorry, you have lost!");
    }

    if (answer.every((letter) => letter === "correct") && roundsCount <= 5) {
      alert("Congrats! You have won!");
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
        {/* {words.map((word, index) => (
          <WordComponent key={index} word={word.body} />
        ))} */}
        {answers.map((word, index) =>
          word.body[0].split("").map((char, charIndex) => (
            <div className="cell" key={`${index}-${charIndex}`}>
              {char}
            </div>
          )),
        )}
      </div>
      <Form noValidate onSubmit={handleSubmit} className="p-3 border rounded">
        <Form.Group controlId="wordInput">
          <Form.Label>{t("forms.main.wordInputLabel")}</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              name="body"
              placeholder={t("forms.main.wordInputPlaceholder")}
              aria-label={t("forms.main.wordInputLabel")}
              required
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              isInvalid={!!inputError}
            />
            <Form.Control.Feedback type="invalid">
              {inputError}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <div className="d-flex gap-2 mt-3">
          <Button type="submit" variant="primary">
            {t("forms.main.buttonAdd")}
          </Button>
          <Button type="button" variant="danger" onClick={clearRound}>
            {t("forms.main.buttonClear")}
          </Button>
        </div>

        <div className="answer-progress mt-3 p-2 border rounded bg-light">
          {t("forms.main.answerProgress")}{" "}
          {answers.length > 0 ? answers[answers.length - 1].join(" ") : ""}
        </div>
      </Form>
    </div>
  );
};

export default Temp;
