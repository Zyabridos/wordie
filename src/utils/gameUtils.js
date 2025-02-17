export const countLetters = (word) => {
  return [...word].reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
};

export const calculateCommonLetters = (target, answer) => {
  const commonLetters = {};
  for (const char of answer) {
    if (target.includes(char)) {
      commonLetters[char] = (commonLetters[char] || 0) + 1;
    }
  }
  return commonLetters;
};

export const markCorrectLetters = (target, answer, letterCount) => {
  return answer.split("").map((char, index) => {
    if (char === target[index]) {
      letterCount[char]--;
      return "correct";
    }
    return "wrong";
  });
};

export const markMisplacedLetters = (answer, result, letterCount) => {
  return result.map((status, index) => {
    const char = answer[index];
    if (status === "wrong" && letterCount[char] > 0) {
      letterCount[char]--;
      return "misplaced";
    }
    return status;
  });
};

export const compareLetters = (target, answer) => {
  if (answer.length !== target.length) {
    throw new Error("Words length mismatch");
  }

  const letterCount = countLetters(target);
  const result = markCorrectLetters(target, answer, letterCount);
  return markMisplacedLetters(answer, result, letterCount);
};
