import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  targetWord: "",
  answers: [],
  commonLetters: {},
  inputError: "",
  targetArray: [],
  inputText: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setTargetWord: (state, action) => {
      state.targetWord = action.payload;
    },
    resetTargetWord: (state) => {
      state.targetWord = "";
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    addAnswer: (state, action) => {
      state.answers.push(action.payload);
    },
    resetAnswers: (state) => {
      state.answers = [];
    },
    setCommonLetters: (state, action) => {
      state.commonLetters = action.payload;
    },
    resetCommonLetters: (state) => {
      state.commonLetters = {};
    },
    setInputError: (state, action) => {
      state.inputError = action.payload;
    },
    resetInputError: (state) => {
      state.inputError = "";
    },
    setTargetArray: (state, action) => {
      state.targetArray = action.payload;
    },
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
    resetInputText: (state) => {
      state.inputText = "";
    },
  },
});

export const {
  setTargetWord,
  resetTargetWord,
  setAnswers,
  addAnswer,
  resetAnswers,
  setCommonLetters,
  resetCommonLetters,
  setInputError,
  resetInputError,
  setTargetArray,
  setInputText,
  resetInputText,
} = gameSlice.actions;
export default gameSlice.reducer;
