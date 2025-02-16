import { Button, Modal } from "react-bootstrap";

const ModalFooter = ({
  handleClose,
  handleRestart,
  closeText,
  restartText,
}) => {
  return (
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        {closeText}
      </Button>
      <Button variant="primary" onClick={handleRestart}>
        {restartText}
      </Button>
    </Modal.Footer>
  );
};

export default ModalFooter;
