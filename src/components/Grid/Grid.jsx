import React, { useState, useEffect } from "react";
import Diijkstra from "../../algo/Diijkstra";
import dfsMazeGeneration from "../../algo/dfsMaze";
import "./Grid.scss";

export default function Grid({
  resetAlgo,
  setResetAlgo,
  visualizeAlgo,
  setVisualizeAlgo,
  isFinishedAlgo,
  setFinishedAlgo,
  setIsClearGrid,
}) {
  const [grid, setGrid] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startCoords, setStartCoords] = useState([10, 10]);
  const [targetCoords, setTargetCoords] = useState([15, 14]);
  const [isMovingStartCoords, setMovingStartCoord] = useState(false);
  const [isStartOrTargetCoords, setIsStartOrTargetCoords] = useState(null);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  function createGrid() {
    let gridArray = [];
    for (let i = 0; i < 20; i++) {
      let row = [];
      for (let j = 0; j < 45; j++) {
        let cell = {
          row: i,
          col: j,
          start: i == startCoords[0] && j == startCoords[1],
          end: i == targetCoords[0] && j == targetCoords[1],
          visited: false,
          distance: Infinity,
          wall: false,
        };
        row.push(cell);
      }
      gridArray.push(row);
    }
    return gridArray;
  }

  const handleMouseDown = (e, row, col) => {
    e.preventDefault();
    if (!isAnimationFinished) {
      setIsMouseDown(true);
      const currentCellClass = e.target.className;
      if (currentCellClass.includes("start")) {
        setMovingStartCoord(true);
        setIsStartOrTargetCoords("start");
      } else if (currentCellClass.includes("end")) {
        setMovingStartCoord(true);
        setIsStartOrTargetCoords("end");
      } else {
        const updatedGrid = changeWallState(grid, row, col);
        setGrid(updatedGrid);
      }
    }
  };

  const handleMouseEnter = (e, row, col) => {
    if (!isAnimationFinished) {
      const currentCellClass = e.target.className;
      if (isMovingStartCoords && !currentCellClass.includes("wall")) {
        console.log("END ", currentCellClass);
        const option = isStartOrTargetCoords;
        const optionCoords =
          isStartOrTargetCoords === "end" ? targetCoords : startCoords;
        const setOptionCoords =
          isStartOrTargetCoords === "end" ? setTargetCoords : setStartCoords;
        const updatedGrid = grid.slice();
        const prevCell = grid[optionCoords[0]][optionCoords[1]];
        const currentCell = grid[row][col];
        const updatedPrevCell = {
          ...prevCell,
          [option]: false,
        };
        const updatedCurrentCell = {
          ...currentCell,
          [option]: true,
        };
        setOptionCoords([row, col]);
        updatedGrid[optionCoords[0]][optionCoords[1]] = updatedPrevCell;
        updatedGrid[row][col] = updatedCurrentCell;
        setGrid(updatedGrid);
      }
      if (
        isMouseDown &&
        !currentCellClass.includes("start") &&
        !currentCellClass.includes("end") &&
        !isMovingStartCoords
      ) {
        const updatedGrid = changeWallState(grid, row, col);
        setGrid(updatedGrid);
      }
    }
  };

  const handleMouseUp = (e) => {
    setIsMouseDown(false);
    setMovingStartCoord(false);
  };

  const handleMouseLeave = (e) => {
    setIsMouseDown(false);
    setMovingStartCoord(false);
  };

  const cellClass = (start, end, wall) => {
    return start ? "col start" : end ? "col end" : wall ? "col wall" : "col";
  };

  function algoStart() {
    setIsAnimationFinished(true);
    setFinishedAlgo(false);

    const start = grid[startCoords[0]][startCoords[1]];
    const target = grid[targetCoords[0]][targetCoords[1]];
    const allAnimations = Diijkstra(grid, start, target);
    const animationsSearch = allAnimations[0];
    const animationPath = allAnimations[1];

    for (let i = 1; i < animationsSearch.length; i++) {
      if (animationsSearch[i][2] === "neighborAnimation") {
        const row = animationsSearch[i][0];
        const col = animationsSearch[i][1];
        const id = `${row}-${col}`;
        const cell = document.querySelector(`[data-col='${id}']`);
        if (!cell.className.includes("wall")) {
          setTimeout(() => {
            cell.classList.add("neighbor");
          }, i * 8);
        }
      }
    }
    if (allAnimations[1].length > 0) {
      setTimeout(() => {
        for (let i = 0; i < animationPath.length; i++) {
          // do function here
          setTimeout(() => {
            const { row, col } = animationPath[i];
            const id = `${row}-${col}`;
            const pathCell = document.querySelector(`[data-col='${id}']`);
            pathCell.classList.remove("neighbor");
            pathCell.classList.add("path");
          }, i * 50);
        }
      }, animationsSearch.length * 10);
    }

    setTimeout(() => {
      alert("Finished");
      setVisualizeAlgo(false);
      setFinishedAlgo(true);
    }, animationPath.length * 50 + animationsSearch.length * 10 + 100);
  }
  useEffect(() => {
    resetArr();
  }, [resetAlgo]);
  useEffect(() => {
    if (visualizeAlgo) {
      setIsClearGrid(false);
      algoStart();
    }
  }, [visualizeAlgo]);
  function resetArr() {
    setGrid(createGrid);
    setFinishedAlgo(true);
    setIsClearGrid(true);
    const cells = document.querySelectorAll(".col");
    cells.forEach((el) => {
      if (el.className.includes("start")) {
        el.className = "col start";
      } else if (el.className.includes("end")) {
        el.className = "col end";
      } else {
        el.className = "col";
      }
    });
    setResetAlgo(false);
    setIsAnimationFinished(false);
  }

  function changeWallState(grid, row, col) {
    const updatedGrid = grid.slice();
    const currentCell = grid[row][col];
    const updatedCurrentCell = {
      ...currentCell,
      wall: true,
    };
    updatedGrid[row][col] = updatedCurrentCell;
    return updatedGrid;
  }

  function maze() {
    dfsMazeGeneration(grid, startCoords);
  }
  return (
    <>
      <div className="main-container">
        <button onClick={maze}>Algo</button>
        {/* <button onClick={resetArr}>Reset</button> */}
        <div
          className="grid-container"
          onMouseLeave={(e) => handleMouseLeave(e)}>
          {grid.map((row, i) => {
            return (
              <div key={i} className="row">
                {row.map((cell, i) => {
                  return (
                    <div
                      data-col={`${cell.row}-${cell.col}`}
                      className={cellClass(cell.start, cell.end, cell.wall)}
                      onMouseEnter={(e) =>
                        handleMouseEnter(e, cell.row, cell.col)
                      }
                      onMouseDown={(e) =>
                        handleMouseDown(e, cell.row, cell.col)
                      }
                      onMouseUp={(e) => handleMouseUp(e)}></div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
