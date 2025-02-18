import { useSelector } from "react-redux";
import "./Gameform.css";
import { Form } from "react-bootstrap";
import Grid from "../Grid.jsx";
import useCellColours from "../../hooks/useCellColours.js";
import ModalManager from "../Modals/ModalManager.jsx";
import useHandleSubmit from "../../hooks/useHandleSubmit.js";
import useFetchAndSetTargetWord from "../../hooks/useFetchAndSetTargetWord.js";
import InputWord from "./InputWord.jsx";
import GameButtons from "./GameButtons.jsx";
const GameForm = () => {
  useFetchAndSetTargetWord();

  const words = useSelector((state) => state.words);

  const { cellColours } = useCellColours();
  const handleSubmit = useHandleSubmit();

  return (
    <div id="game-container">
      <Grid words={words.words} cellColours={cellColours} />

      <Form noValidate onSubmit={handleSubmit} className="p-3 border rounded">
        <InputWord />
        <GameButtons />
      </Form>
      <ModalManager />
    </div>
  );
};

export default GameForm;
