import { setInputError, resetInputError } from "../store/slices/gameSlice.js";
import getInputError from "../errorHandler.js";
import { addWord } from "../store/slices/wordsSlice.js";

export const handleInputValidation = async (inputText, dispatch) => {
  const trimmedInput = inputText.trim().toLowerCase();
  
  const error = await getInputError(trimmedInput);
  if (error) {
    dispatch(setInputError(error));
    return null;
  }

  dispatch(resetInputError());
  dispatch(addWord({ body: trimmedInput }));

  return trimmedInput;
};
