import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWord, clearWords } from "../../store/slices/wordsSlice.js";
import "./Gameform.css";
import WORDSLIST from "../../wordsList.js";
import { getRandomWord, compareCommonLetters } from "../../utils.js";
import { useTranslation } from "react-i18next";
import { Form, Button, InputGroup } from "react-bootstrap";
import GameOverModal from "../Modals/GameOverModal.jsx";
import VictoryModal from "../Modals/VicrotyModal.jsx";

const WordComponent = ({ word, letterClasses }) => {
  return (
    <div className="word-container">
      {word.split("").map((char, index) => (
        <div
          key={index}
          className={`letter-cell ${letterClasses[index] || ""}`}
        >
          {char}
        </div>
      ))}
    </div>
  );
};

const Gameform = ({ initialWord = null }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const words = useSelector((state) => state.words);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showModalVictory, setShowModalVictory] = useState(false);
  const handleCloseModalVictory = () => setShowModalVictory(false);
  const handleShowModalVictory = () => setShowModalVictory(true);

  const [validated, setValidated] = useState(false);
  const [inputError, setInputError] = useState("");

  const [targetWord, setTargetWord] = useState(initialWord || getRandomWord(WORDSLIST));
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

    console.log("targetWord: ", targetWord);

    if (answer.every((letter) => letter === "correct")) {
      handleShowModalVictory();
    } else if (roundsCount === 5) {
      handleShowModal();
    }

    setInputText("");
  };

  const clearRound = () => {
    dispatch(clearWords());
    const newWord = initialWord || getRandomWord(WORDSLIST);
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
          <WordComponent
            key={index}
            word={word.body}
            letterClasses={answers[index] || []}
          />
        ))}
      </div>
      <Form noValidate onSubmit={handleSubmit} className="p-3 border rounded">
        <Form.Group controlId="wordInput">
          <Form.Label hidden>{t("forms.main.wordInputLabel")}</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              name="body"
              placeholder={t("forms.main.wordInputPlaceholder")}
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
      </Form>

      <GameOverModal
        show={showModal}
        handleClose={handleCloseModal}
        handleRestart={() => {
          clearRound();
          handleCloseModal();
        }}
        targetWord={targetWord}
      />

      <VictoryModal
        show={showModalVictory}
        handleClose={handleCloseModalVictory}
        handleRestart={() => {
          clearRound();
          handleCloseModalVictory();
        }}
      />
    </div>
  );
};

export default Gameform;
