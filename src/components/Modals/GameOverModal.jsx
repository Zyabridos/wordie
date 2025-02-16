import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/slices/modalSlice.js";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

const GameOverModal = ({ targetWord }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleRestart = () => {
    dispatch(closeModal());
    window.location.reload();
  };

  return (
    <div name="game-over-modal">
      <Modal show onHide={() => dispatch(closeModal())} centered>
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
    </div>
  );
};

export default GameOverModal;
