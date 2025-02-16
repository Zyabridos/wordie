import { Modal } from "react-bootstrap";

const ModalHeader = ({ title, handleClose }) => {
  return (
    <Modal.Header closeButton onHide={handleClose}>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
  );
};

export default ModalHeader;
