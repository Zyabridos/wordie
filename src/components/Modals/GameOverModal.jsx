import { useTranslation } from "react-i18next";
import ModalBase from "./Mixins/ModalBase.jsx";

const GameOverModal = () => {
  const { t } = useTranslation();
  return (
    <ModalBase
      title={t("modals.gameOver.title")}
      message={t("modals.gameOver.message")}
      testId="game-over-modal"
    />
  );
};

export default GameOverModal;
