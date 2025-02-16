import { combineReducers } from "@reduxjs/toolkit";
import wordsReducer from "./wordsSlice.js";
import modalReducer from "./modalSlice.js";
import gameReducer from "./gameSlice.js";
import cellColoursReducer from "./cellColoursSlice.js";

const rootReducer = combineReducers({
  words: wordsReducer,
  modal: modalReducer,
  game: gameReducer,
  cellColours: cellColoursReducer,
});

export default rootReducer;
