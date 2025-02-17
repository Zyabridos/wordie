import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/slices/modalSlice.js";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import useClearRound from "../../hooks/useClearRound.js";

const GameOverModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const clearRound = useClearRound();

  const targetWord = useSelector((state) => state.game.targetWord);

  const handleRestart = () => {
    clearRound();
    dispatch(closeModal());
  };

  return (
    <Modal
      show
      onHide={() => dispatch(closeModal())}
      centered
      data-testid="game-over-modal"
    >
      <ModalHeader title={t("modals.gameOver.title")} />
      <Modal.Body>
        <p>{t("modals.gameOver.message", { targetWord })}</p>
      </Modal.Body>
      <ModalFooter
        handleClose={() => dispatch(closeModal())}
        handleRestart={handleRestart}
        closeText={t("modals.gameOver.buttonClose")}
        restartText={t("modals.gameOver.buttonRestart")}
      />
    </Modal>
  );
};

export default GameOverModal;
