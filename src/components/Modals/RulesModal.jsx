import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';
const RulesModal = ({ show, handleClose }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("modals.rules.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array.from({ length: 5 }, (_, i) => (
          <p key={uuidv4()}>{t(`modals.rules.rule${i + 1}`)}</p>
        ))}
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
