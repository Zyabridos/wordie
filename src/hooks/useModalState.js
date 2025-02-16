import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../store/slices/modalSlice.js";

const useModalState = () => {
  const dispatch = useDispatch();
  const { isOpen, type, props } = useSelector((state) => state.modal);

  return {
    isOpen,
    type,
    props,
    openModal: (type, props = {}) => dispatch(openModal({ type, props })),
    closeModal: () => dispatch(closeModal()),
  };
};

export default useModalState;
