import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/slices/modalSlice.js";
import ModalFooter from "./ModalFooter.jsx";
import ModalHeader from "./ModalHeader.jsx";
import PropTypes from "prop-types";
import useClearRound from "../../../hooks/useClearRound.js";
import { useTranslation } from "react-i18next";

const ModalBase = ({ title, message, testId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const clearRound = useClearRound();

  const handleRestart = () => {
    clearRound();
    dispatch(closeModal());
  };

  return (
    <Modal
      show
      onHide={() => dispatch(closeModal())}
      centered
      data-testid={testId}
    >
      <ModalHeader title={title} />
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <ModalFooter
        handleClose={() => dispatch(closeModal())}
        handleRestart={handleRestart}
        closeText={t("modals.buttonClose")}
        restartText={t("modals.buttonRestart")}
      />
    </Modal>
  );
};

ModalBase.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ModalBase;
