import { fetchWords } from "./utils/wordUtils.js";
import i18n from "i18next";

const getInputError = async (str) => {
  const trimmed = str.trim().toLowerCase();

  if (trimmed.length !== 5) {
    return i18n.t("errors.invalidInput.letterLengtth");
  }

  const dictionary = await fetchWords();
  const words = dictionary.map((item) => item.word);

  if (!words.includes(trimmed)) {
    return i18n.t("errors.invalidInput.notInDictionary");
  }

  return null;
};

export default getInputError;
