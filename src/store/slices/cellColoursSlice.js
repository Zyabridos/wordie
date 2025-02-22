import { createSlice } from "@reduxjs/toolkit";
import {
  DEFAULT_WORD_LENGTH,
  DEFAULT_AMOUNT_OF_ROUNDS,
} from "../../defaultConstants.js";

const loadCellColours = () => {
  const savedCellColours = localStorage.getItem("cellColours");
  return savedCellColours
    ? JSON.parse(savedCellColours)
    : Array.from({ length: DEFAULT_AMOUNT_OF_ROUNDS }, () =>
        Array(DEFAULT_WORD_LENGTH).fill(""),
      );
};

const cellColoursSlice = createSlice({
  name: "cellColours",
  initialState: { cellColours: loadCellColours() },
  reducers: {
    setCellColours: (state, action) => {
      state.cellColours = action.payload;
      localStorage.setItem("cellColours", JSON.stringify(action.payload));
    },
    resetCellColours: (state) => {
      state.cellColours = Array.from({ length: DEFAULT_AMOUNT_OF_ROUNDS }, () =>
        Array(DEFAULT_WORD_LENGTH).fill(""),
      );
      localStorage.removeItem("cellColours");
    },
  },
});

export const { setCellColours, resetCellColours } = cellColoursSlice.actions;
export default cellColoursSlice.reducer;
