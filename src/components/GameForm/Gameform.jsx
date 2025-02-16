import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./GameForm.css";
import { useTranslation } from "react-i18next";
import { Form, Button, InputGroup } from "react-bootstrap";
import Grid from "../Grid.jsx";
import useCellColours from "../../hooks/useCellColours.js";
import useModalState from "../../hooks/useModalState.js";
import ModalManager from "../Modals/ModalManager.jsx";
import useGameLogic from "../../hooks/useGameLogic.js";
import useTargetWord from "../../hooks/useTargetWord.js";

const GameForm = ({ initialWord }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const words = useSelector((state) => state.words);
  const { openModal } = useModalState();

  // const [targetArray, setTargetArray] = useState([]);
  // const [targetWord, setTargetWord] = useState(initialWord || "");
  const { targetWord, setTargetWord, targetArray } = useTargetWord(initialWord);
  const [answers, setAnswers] = useState([]);
  const [roundsCount, setRoundsCount] = useState(1);
  const [commonLetters, setCommonLetters] = useState({});
  const [inputError, setInputError] = useState("");

  console.log("targetWord", targetWord);

  const { cellColours, setCellColours } = useCellColours(roundsCount);

  const { clearRound, handleSubmit, inputText, setInputText } = useGameLogic({
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
  });

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

      <ModalManager />
    </div>
  );
};

export default GameForm;
