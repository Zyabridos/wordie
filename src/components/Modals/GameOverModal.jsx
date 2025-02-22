import { useTranslation } from "react-i18next";
import ModalBase from "./Mixins/ModalBase.jsx";
import PropTypes from "prop-types";

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

GameOverModal.propTypes = {
  targetWord: PropTypes.string,
};

export default GameOverModal;
