import { useSelector, useDispatch } from "react-redux";
import {
  setCellColours,
  resetCellColours,
} from "../store/slices/cellColoursSlice.js";

const useCellColours = () => {
  const dispatch = useDispatch();
  const cellColours =
    useSelector((state) => state.cellColours.cellColours) || [];

  const updateCellColours = (newColours) => {
    dispatch(setCellColours(newColours));
  };

  const clearColours = () => {
    dispatch(resetCellColours());
  };

  return { cellColours, updateCellColours, clearColours };
};

export default useCellColours;
