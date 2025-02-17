import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const ModalHeader = ({ title, handleClose }) => {
  return (
    <Modal.Header closeButton onHide={handleClose}>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
  );
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalHeader;
