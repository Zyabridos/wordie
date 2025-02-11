export const getRandomWord = (wordList) => {
  const maxFloored = wordList.length;
  const randomInt = Math.floor(Math.random() * maxFloored);
  return wordList[randomInt];
};
