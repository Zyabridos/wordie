import { containsOnlyLetters } from "./utils.js";

const regexEnglishWord = /^[a-zA-Z]+$/;
const getInputError = (str) => {
  if (str.trim().length !== 5) {
    return "Invalid input. Please enter a 5-letter word.";
  }

  if (!containsOnlyLetters(str.trim())) {
    return "Invalid input. Please enter only letters.";
  }

  if (!regexEnglishWord.test(str.trim())) {
    return "Invalid input. Please enter an English word.";
  }

  // TODO: add that the word is in the dictionary

  return null;
};

export default getInputError;
