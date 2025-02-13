import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
const RulesModal = ({ show, handleClose }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("modals.rules.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("modals.rules.rule1")}</p>
        <p>{t("modals.rules.rule2")}</p>
        <p>{t("modals.rules.rule3")}</p>
        <p>{t("modals.rules.rule4")}</p>
        <p>{t("modals.rules.rule5")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("modals.rules.buttonClose")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RulesModal;
