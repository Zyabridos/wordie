import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/slices/modalSlice.js";

const VictoryModal = ({ handleRestart }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal show onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("modals.victory.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("modals.victory.message")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
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
