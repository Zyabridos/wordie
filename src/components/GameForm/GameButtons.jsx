import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import useClearRound from "../../hooks/useClearRound.js";

const GameButtons = () => {
  const { t } = useTranslation();
  const clearRound = useClearRound();

  return (
    <div className="d-flex gap-2 mt-3">
      <Button type="submit" variant="primary">
        {t("forms.main.buttonAdd")}
      </Button>
      <Button type="button" variant="danger" onClick={clearRound}>
        {t("forms.main.buttonClear")}
      </Button>
    </div>
  );
};

export default GameButtons;
