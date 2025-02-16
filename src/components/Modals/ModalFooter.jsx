import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const ModalFooter = ({ handleClose, handleRestart, closeText, restartText }) => {
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

ModalFooter.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleRestart: PropTypes.func.isRequired,
  closeText: PropTypes.string.isRequired,
  restartText: PropTypes.string.isRequired,
};

export default ModalFooter;
