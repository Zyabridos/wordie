export const compareLetters = (target, answer) => {
  if (answer.length !== target.length) {
    throw new Error("Words length mismatch");
  }

  const result = Array(answer.length).fill("wrong");
  const letterCount = {};

  for (const char of target) {
    letterCount[char] = (letterCount[char] || 0) + 1;
  }

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === target[i]) {
      result[i] = "correct";
      letterCount[answer[i]]--;
    }
  }

  for (let i = 0; i < answer.length; i++) {
    if (result[i] === "wrong" && letterCount[answer[i]] > 0) {
      result[i] = "misplaced";
      letterCount[answer[i]]--;
    }
  }

  return result;
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
