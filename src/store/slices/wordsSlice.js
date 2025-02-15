import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadState = () => {
  const savedWords = localStorage.getItem("words");
  return savedWords ? JSON.parse(savedWords) : [];
};

const wordsSlice = createSlice({
  name: "words",
  initialState: loadState(),
  reducers: {
    addWord: (state, action) => {
      const newWord = {
        id: nanoid(),
        body: action.payload.body,
      };
      state.push(newWord);
      localStorage.setItem("words", JSON.stringify(state));
    },
    clearWords: (state) => {
      state.length = 0;
      localStorage.removeItem("words");
    },
  },
});

export const { addWord, clearWords } = wordsSlice.actions;
export default wordsSlice.reducer;
