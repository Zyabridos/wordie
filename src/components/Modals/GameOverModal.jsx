import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/slices/modalSlice.js";

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
        <Modal.Header closeButton>
          <Modal.Title>{t("modals.gameOver.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t("modals.gameOver.message", { targetWord })}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            {t("modals.gameOver.buttonClose")}
          </Button>
          <Button variant="primary" onClick={handleRestart}>
            {t("modals.gameOver.buttonRestart")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GameOverModal;
