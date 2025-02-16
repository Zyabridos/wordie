import { combineReducers } from "@reduxjs/toolkit";
import wordsReducer from "./wordsSlice.js";
import modalReducer from "./modalSlice.js";

const rootReducer = combineReducers({
  words: wordsReducer,
  modal: modalReducer,
});

export default rootReducer;
