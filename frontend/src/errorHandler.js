import { containsLettersAndOthers } from "./utils.js";

const regexEnglishWord = /^[a-zA-Z]+$/;
const regexRussianWord = /^[а-яA-Я]+$/;
const getInputError = (str) => {

    if (str.trim().length !== 5) {
      return "Invalid input. Please enter a 5-letter word."
    }

    if (containsLettersAndOthers(str.trim())) {
      return "Invalid input. Please enter only letters."
    }

    if (regexEnglishWord.test(str.trim()) || regexRussianWord.test(str.trim())) {
      return "Invalid input. Please enter either English or Russian word."
    }
}

export default getInputError;