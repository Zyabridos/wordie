import { useSelector } from "react-redux";
import GameOverModal from "./GameOverModal.jsx";
import VictoryModal from "./VicrotyModal.jsx";

const ModalManager = () => {
  const { isOpen, type, props } = useSelector((state) => state.modal);

  if (!isOpen) return null;

  switch (type) {
    case "gameOver":
      return <GameOverModal {...props} />;
    case "victory":
      return <VictoryModal {...props} />;
    default:
      return null;
  }
};

export default ModalManager;
