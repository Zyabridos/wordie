import { combineReducers } from "@reduxjs/toolkit";
import wordsReducer from "./wordsSlice.js";

const rootReducer = combineReducers({
  words: wordsReducer,
});

export default rootReducer;
