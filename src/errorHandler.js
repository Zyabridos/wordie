import { fetchWords } from "./utils/wordUtils.js";
import i18n from "i18next";
const getInputError = async (str) => {
  if (str.trim().length !== 5) {
    return i18n.t("errors.invalidInput.letterLengtth");
  }

  const dictionary = await fetchWords();
  if (!dictionary.includes(str.trim().toLowerCase())) {
    return i18n.t("errors.invalidInput.notInDictionary");
  }

  return null;
};

export default getInputError;
