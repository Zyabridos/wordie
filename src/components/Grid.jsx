import PropTypes from "prop-types";

const Grid = ({ words, cellColours }) => {
  return (
    <div className="grid">
      {Array(5)
        .fill(0)
        .map((_, rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {Array(5)
              .fill(0)
              .map((_, colIndex) => {
                const word = words[rowIndex]?.body || "";
                const letter = word[colIndex] || "";
                const letterClass = cellColours[rowIndex]?.[colIndex] || "";
                return (
                  <div className={`letter-cell ${letterClass}`} key={`cell-${rowIndex}-${colIndex}`}>
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
