import React from "react";

const Grid = ({ words, cellColours }) => {
  return (
    <div className="grid">
      {Array(5)
        .fill(0)
        .map((_, rowIndex) => (
          <div className="row" key={rowIndex}>
            {Array(5)
              .fill(0)
              .map((_, colIndex) => {
                const word = words[rowIndex]?.body || "";
                const letter = word[colIndex] || "";
                const letterClass = cellColours[rowIndex]?.[colIndex] || "";
                return (
                  <div className={`letter-cell ${letterClass}`} key={colIndex}>
                    {letter}
                  </div>
                );
              })}
          </div>
        ))}
    </div>
  );
};

export default Grid;
