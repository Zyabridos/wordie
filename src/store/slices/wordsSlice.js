import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWords, getRandomWord } from "../../utils/wordUtils.js";

const loadWords = () => {
  const savedWords = localStorage.getItem("words");
  return savedWords ? JSON.parse(savedWords) : [];
};

const loadTargetWord = () => {
  const word = localStorage.getItem("targetWord");
  const id = localStorage.getItem("targetWordId");
  return word && id ? { id, word } : null;
};

export const fetchWordsAsync = createAsyncThunk(
  "words/fetchWords",
  async () => {
    const words = await fetchWords();
    return words;
  },
);

const wordsSlice = createSlice({
  name: "words",
  initialState: {
    words: loadWords(),
    targetArray: [],
    targetWord: loadTargetWord(),
  },
  reducers: {
    addWord: (state, action) => {
      const newWord = {
        id: nanoid(),
        body: action.payload.body,
      };
      state.words.push(newWord);
      localStorage.setItem("words", JSON.stringify(state.words));
    },
    clearWords: (state) => {
      state.words = [];
      localStorage.removeItem("words");
    },
    setTargetWord: (state, action) => {
      state.targetWord = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWordsAsync.fulfilled, (state, action) => {
      state.targetArray = action.payload;
      if (!state.targetWord) {
        const randomObj = getRandomWord(action.payload);
        if (randomObj) {
          state.targetWord = randomObj;
        }
      }
    });
  },
});

export const { addWord, clearWords, setTargetWord } = wordsSlice.actions;
export default wordsSlice.reducer;
