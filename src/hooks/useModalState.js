import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../store/slices/modalSlice.js";

const useModalState = () => {
  const dispatch = useDispatch();

  const openVictory = () => {
    dispatch(
      openModal({
        type: "victory",
        props: {},
      }),
    );
  };

  const openGameOver = (targetWord) => {
    dispatch(
      openModal({
        type: "gameOver",
        props: { targetWord },
      }),
    );
  };

  const close = () => dispatch(closeModal());

  return { openVictory, openGameOver, close };
};

export default useModalState;
