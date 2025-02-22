import { DEFAULT_WORD_LENGTH } from "../defaultConstants.js";

export const getRandomWord = (words) => {
  if (!words.length) return null;
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export const fetchWords = async (wordLength = DEFAULT_WORD_LENGTH) => {
  try {
    const response = await fetch("/words.json");
    const json = await response.json();
    return json.filter((item) => item.word.length === wordLength);
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
};
