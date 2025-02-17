import { useSelector, useDispatch } from "react-redux";
import "./Gameform.css";
import { useTranslation } from "react-i18next";
import { Form, Button, InputGroup } from "react-bootstrap";
import Grid from "../Grid.jsx";
import useCellColours from "../../hooks/useCellColours.js";
import ModalManager from "../Modals/ModalManager.jsx";
import { setInputText } from "../../store/slices/gameSlice.js";
import useClearRound from "../../hooks/useClearRound.js";
import useHandleSubmit from "../../hooks/useHandleSubmit.js";
import useFetchAndSetTargetWord from "../../hooks/useFetchAndSetTargetWord.js";

// TODO for tomorrow:
// 1. add target word to game over modal
// 2. remove close button from victory modal and from game over modal (or solve this problem in another way)
// 3. Write tests on modals
// 4. write tests for contacts and rules
const GameForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useFetchAndSetTargetWord();

  const words = useSelector((state) => state.words);
  const inputText = useSelector((state) => state.game.inputText);
  const inputError = useSelector((state) => state.game.inputError);

  // const targetWord = useSelector((state) => state.game.targetWord);
  // console.log(targetWord);

  const { cellColours } = useCellColours();
  const clearRound = useClearRound();
  const handleSubmit = useHandleSubmit();

  return (
    <div id="game-container">
      <Grid words={words.words} cellColours={cellColours} />

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
              onChange={(e) => dispatch(setInputText(e.target.value))}
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
