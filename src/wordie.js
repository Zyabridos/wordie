import readlineSync from "readline-sync";

const WORDLIST = [
  "water",
  "otter",
  "hound",
  "pizza",
  "eagle",
  "fruit",
  "paper",
];
const getRandomWord = (words) =>
  words[Math.floor(Math.random() * words.length)];

const MAXROUNDS = 5;

export const wordie = (targetWord = getRandomWord(WORDLIST)) => {
  console.log(
    `Welcome to the Word Guessing Game! The target word has 5 letters.`,
  );

  for (let round = 1; round <= MAXROUNDS; round++) {
    let word = readlineSync.question(
      `Round #${round}: Enter a 5-letter word to guess the same target word: `,
    );

    if (word.length !== 5) {
      console.log("Invalid input. Please enter a 5-letter word.");
      round -= 1;
      continue;
    }

    const currentGameChars = targetWord.split("");
    const wordArrayChars = word.split("");
    const answer = [];

    currentGameChars.forEach((current, index) => {
      if (wordArrayChars[index] === current) {
        answer.push(current);
      } else if (wordArrayChars.includes(current) && !answer.includes("_")) {
        answer.push("_");
        console.log(
          "This letter is in the word but in a different position:",
          current,
        );
      } else {
        answer.push("_");
      }
    });

    console.log("Result after this round:", answer.join(" "));

    if (!answer.includes("_")) {
      console.log("Congratulations! You have won!");
      return;
    }
  }

  console.log(`Game over! The word was: ${targetWord}\nBetter luck next time!`);
};
