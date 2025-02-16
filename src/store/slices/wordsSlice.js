import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWords, getRandomWord } from "../../utils.js";

// Загрузка сохранённых слов из localStorage
const loadWords = () => {
  const savedWords = localStorage.getItem("words");
  return savedWords ? JSON.parse(savedWords) : [];
};

// Загрузка сохранённого targetWord
const loadTargetWord = () => {
  return localStorage.getItem("targetWord") || "";
};

// Получение слов с сервера
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
      localStorage.setItem("targetWord", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWordsAsync.fulfilled, (state, action) => {
      state.targetArray = action.payload;
      if (!state.targetWord) {
        state.targetWord = getRandomWord(action.payload);
      }
    });
  },
});

export const { addWord, clearWords, setTargetWord } = wordsSlice.actions;
export default wordsSlice.reducer;