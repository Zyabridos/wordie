import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../store/slices/modalSlice.js";

const useModalState = () => {
  const dispatch = useDispatch();

  return {
    openVictory: () => dispatch(openModal({ type: "victory" })),
    openGameOver: (props) => dispatch(openModal({ type: "gameOver", props })),
    closeModal: () => dispatch(closeModal()),
  };
};

export default useModalState;
