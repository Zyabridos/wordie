export const getRandomWord = (wordsList) => {
  const maxFloored = wordsList.length;
  const randomInt = Math.floor(Math.random() * maxFloored);
  return wordsList[randomInt];
};

const countLetters = (word1) => {
  const result = {};
  const word = word1.split("");
  word.forEach((current) => {
    result[current] = (result[current] || 0) + 1;
  });
  return result;
};

export const compareCommonLetters = (word1, word2) => {
  const count1 = countLetters(word1);
  const count2 = countLetters(word2);

  const result = {};

  Object.keys(count1).forEach((char) => {
    if (count2[char] !== undefined) {
      result[char] = count1[char] - count2[char];
    }
  });

  return result;
};
