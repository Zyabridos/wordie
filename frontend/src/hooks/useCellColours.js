import { useEffect, useState } from "react";

const useCellColours = (roundsCount) => {
  const loadCellColours = () => {
    const savedCellColours = localStorage.getItem("cellColours");
    return savedCellColours
      ? JSON.parse(savedCellColours)
      : Array(5)
          .fill(null)
          .map(() => Array(5).fill(""));
  };

  const [cellColours, setCellColours] = useState(loadCellColours);

  useEffect(() => {
    localStorage.setItem("cellColours", JSON.stringify(cellColours));
  }, [cellColours]);

  useEffect(() => {
    if (roundsCount === 1) {
      setCellColours(
        Array(5)
          .fill(null)
          .map(() => Array(5).fill("")),
      );
      localStorage.removeItem("cellColours");
    }
  }, [roundsCount]);

  return { cellColours, setCellColours };
};

export default useCellColours;
