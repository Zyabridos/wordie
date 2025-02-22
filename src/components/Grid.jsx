import PropTypes from "prop-types";

const ROWS = 5;
const COLUMNS = 5;

const Grid = ({ words, cellColours }) => {
  return (
    <div className="grid">
      {Array.from({ length: ROWS })
        .map((_, rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {Array.from({ length: COLUMNS })
              .map((_, colIndex) => {
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
};

export default Grid;
