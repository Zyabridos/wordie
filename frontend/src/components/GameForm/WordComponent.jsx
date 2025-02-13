const WordComponent = ({ word, letterClasses }) => {
  return (
    <div className="word-container">
      {word.split("").map((char, index) => (
        <div
          key={index}
          className={`letter-cell ${letterClasses[index] || ""}`}
        >
          {char}
        </div>
      ))}
    </div>
  );
};

export default WordComponent;
