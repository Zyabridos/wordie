import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const GameOverModal = ({ show, handleClose, handleRestart, targetWord }) => {
  const { t } = useTranslation();

  return (
    <Modal
      name="game-over-modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("modals.gameOver.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t("modals.gameOver.message")} <strong>{targetWord}</strong>.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("modals.gameOver.buttonNo")}
        </Button>
        <Button variant="primary" onClick={handleRestart}>
          {t("modals.gameOver.buttonYes")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameOverModal;
