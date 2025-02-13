import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const VictoryModal = ({ show, handleClose, handleRestart, targetWord }) => {
  const { t } = useTranslation();

  return (
    <Modal
      name="victory-modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("modals.victory.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("modals.victory.message")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("modals.victory.buttonClose")}
        </Button>
        <Button variant="primary" onClick={handleRestart}>
          {t("modals.victory.buttonRestart")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VictoryModal;
