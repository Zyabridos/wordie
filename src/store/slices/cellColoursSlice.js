import { createSlice } from "@reduxjs/toolkit";

const loadCellColours = () => {
  const savedCellColours = localStorage.getItem("cellColours");
  return savedCellColours
    ? JSON.parse(savedCellColours)
    : Array(5)
        .fill(null)
        .map(() => Array(5).fill(""));
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
      state.cellColours = Array(5)
        .fill(null)
        .map(() => Array(5).fill(""));
      localStorage.removeItem("cellColours");
    },
  },
});

export const { setCellColours, resetCellColours } = cellColoursSlice.actions;
export default cellColoursSlice.reducer;
