import PropTypes from "prop-types";
import {
  DEFAULT_AMOUNT_OF_ROUNDS,
  DEFAULT_WORD_LENGTH,
} from "../defaultConstants.js";

const Grid = ({
  words,
  cellColours,
  rounds = DEFAULT_AMOUNT_OF_ROUNDS,
  wordLength = DEFAULT_WORD_LENGTH,
}) => {
  return (
    <div className="grid">
      {Array.from({ length: rounds }).map((_, rowIndex) => (
        <div className="row" key={`row-${rowIndex}`}>
          {Array.from({ length: wordLength }).map((_, colIndex) => {
            const word = words[rowIndex]?.body || "";
            const letter = word[colIndex] || "";
            const letterClass = cellColours[rowIndex]?.[colIndex] || "";
            return (
              <div
                className={`letter-cell ${letterClass}`}
                key={`cell-${rowIndex}-${colIndex}`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

Grid.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
    }),
  ).isRequired,
  cellColours: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  rounds: PropTypes.number,
  wordLength: PropTypes.number,
};

export default Grid;
