import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWord, clearWords } from "../../store/slices/wordsSlice.js";
import "./Gameform.css";
import { getRandomWord, compareCommonLetters } from "../../utils.js";
import { useTranslation } from "react-i18next";
import { Form, Button, InputGroup } from "react-bootstrap";
import GameOverModal from "../Modals/GameOverModal.jsx";
import VictoryModal from "../Modals/VicrotyModal.jsx";
import getInputError from "../../errorHandler.js";
import Grid from "../Grid.jsx";
import useCellColours from "../../hooks/useCellColours.js";

const GameForm = ({ initialWord = null }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const words = useSelector((state) => state.words);

  const [showModal, setShowModal] = useState(false);
  const [showModalVictory, setShowModalVictory] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModalVictory = () => setShowModalVictory(false);
  const handleShowModalVictory = () => setShowModalVictory(true);

  const [inputError, setInputError] = useState("");
  const [targetArray, setTargetArray] = useState([]);
  const [inputText, setInputText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [roundsCount, setRoundsCount] = useState(1);
  const [commonLetters, setCommonLetters] = useState({});
  const [targetWord, setTargetWord] = useState(
    initialWord || getRandomWord(targetArray),
  );

  const { cellColours, setCellColours } = useCellColours(roundsCount);

  useEffect(() => {
    fetch("/words.txt")
      .then((response) => response.text())
      .then((words) =>
        words
          .split("\n")
          .map((word) => word.toLowerCase())
          .filter((word) => word.length === 5),
      )
      .then((words) => {
        setTargetArray(words);
        if (!initialWord) {
          setTargetWord(getRandomWord(words));
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (getInputError(inputText.trim())) {
      setInputError(getInputError(inputText.trim()));
      return;
    }

    setInputError("");

    dispatch(addWord({ body: inputText.trim().toLowerCase() }));

    const wordArray = inputText.toLowerCase().split("");
    const newAnswer = Array(5).fill("wrong");

    console.log(targetWord);

    const letterCount = {};
    targetWord.split("").forEach((char) => {
      letterCount[char] = (letterCount[char] || 0) + 1;
    });

    wordArray.forEach((char, index) => {
      if (char === targetWord[index]) {
        newAnswer[index] = "correct";
        letterCount[char]--;
      }
    });

    wordArray.forEach((char, index) => {
      if (newAnswer[index] === "wrong" && letterCount[char] > 0) {
        newAnswer[index] = "misplaced";
        letterCount[char]--;
      }
    });

    setCellColours((prevColours) => {
      const updatedColours = prevColours.map((row, rowIndex) =>
        rowIndex === roundsCount - 1 ? [...newAnswer] : [...row],
      );
      return updatedColours;
    });

    setAnswers((prev) => [...prev, newAnswer]);
    setCommonLetters(
      compareCommonLetters(inputText.trim().toLowerCase(), targetWord),
    );

    if (newAnswer.every((letter) => letter === "correct")) {
      handleShowModalVictory();
    } else if (roundsCount === 5) {
      handleShowModal();
    }

    setInputText("");
    setRoundsCount((prev) => prev + 1);
  };

  const clearRound = () => {
    dispatch(clearWords());
    const newWord = initialWord || getRandomWord(targetArray);
    setTargetWord(newWord);
    setAnswers([]);
    setRoundsCount(1);
    setCommonLetters({});
    setInputError("");
    setCellColours(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill("")),
    );
    localStorage.removeItem("cellColours");
  };

  return (
    <div id="game-container">
      <Grid words={words} cellColours={cellColours} />

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

export default GameForm;
