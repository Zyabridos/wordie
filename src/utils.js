export const getRandomWord = (wordsList) => {
  const maxFloored = wordsList.length;
  const randomInt = Math.floor(Math.random() * maxFloored);
  return wordsList[randomInt];
};

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
export const fetchWords = async () => {
  try {
    const response = await fetch("/words.txt");
    const text = await response.text();
    return text
      .split("\n")
      .map((word) => word.toLowerCase())
      .filter((word) => word.length === 5);
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
};
