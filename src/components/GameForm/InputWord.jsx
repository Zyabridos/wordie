import { useTranslation } from "react-i18next";
import { Form, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setInputText } from "../../store/slices/gameSlice.js";

const WordInput = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputText = useSelector((state) => state.game.inputText);
  const inputError = useSelector((state) => state.game.inputError);

  return (
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
        <Form.Control.Feedback type="invalid">{inputError}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default WordInput;
