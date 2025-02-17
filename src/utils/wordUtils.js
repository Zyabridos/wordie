export const getRandomWord = (wordsList) => {
  const maxFloored = wordsList.length;
  const randomInt = Math.floor(Math.random() * maxFloored);
  return wordsList[randomInt];
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
