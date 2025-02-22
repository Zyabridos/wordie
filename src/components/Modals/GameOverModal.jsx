import { useTranslation } from "react-i18next";
import ModalBase from "./Mixins/ModalBase.jsx";

const GameOverModal = ({ targetWord }) => {
  const { t } = useTranslation();
  return (
    <ModalBase
      title={t("modals.gameOver.title")}
      message={t("modals.gameOver.message", { targetWord })}
      testId="game-over-modal"
    />
  );
};

export default GameOverModal;
