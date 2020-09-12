import React, { useState, useEffect } from "react";

// algorigthms
import {
  DiijkstraAlgo,
  dfsAlgo,
  bfsAlgo,
  mazeGeneration,
  astarAlgo,
} from "../../algo/index";

// animations algorithms
import {
  diijkstraAnimation,
  generateMaze,
  bfsAnimatation,
  dfsAnimatation,
  astarAnimation,
} from "../../algoAnimations/algoAnimation";

import "./Grid.scss";

export default function Grid({
  resetAlgo,
  setResetAlgo,
  visualizeAlgo,
  setVisualizeAlgo,
  selectedOption,
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
  const [isAlgoPrev, setIsAlgoPrev] = useState(false);

  useEffect(() => {
    resetArr();
  }, [resetAlgo]);

  useEffect(() => {
    changedAlgo();
  }, [selectedOption]);

  useEffect(() => {
    if (visualizeAlgo) {
      setIsClearGrid(false);
      algoVisualize();
    }
  }, [visualizeAlgo]);

  // creating main grid
  function createGrid() {
    let gridArray = [];
    for (let i = 0; i < 30; i++) {
      let row = [];
      for (let j = 0; j < 60; j++) {
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
      const currentnodeClass = e.target.className;
      if (currentnodeClass.includes("start")) {
        setMovingStartCoord(true);
        setIsStartOrTargetCoords("start");
      } else if (currentnodeClass.includes("end")) {
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
      const currentnodeClass = e.target.className;
      if (isMovingStartCoords && !currentnodeClass.includes("wall")) {
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
        !currentnodeClass.includes("start") &&
        !currentnodeClass.includes("end") &&
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

  function algoVisualize() {
    if (selectedOption === "Dijkstra's algorithm") {
      if (isAlgoPrev) {
        setGrid(resetPrevVisitedNodes(false));
      }
      diijkstraAnimation(
        grid,
        startCoords,
        targetCoords,
        setFinishedAlgo,
        setVisualizeAlgo,
        setIsAnimationFinished,
        DiijkstraAlgo
      );
      setIsAlgoPrev(true);
    } else if (selectedOption === "Breadth-first search") {
      if (isAlgoPrev) {
        setGrid(resetPrevVisitedNodes(false));
      }
      bfsAnimatation(
        grid,
        startCoords,
        targetCoords,
        setIsAnimationFinished,
        setFinishedAlgo,
        bfsAlgo,
        setGrid,
        setVisualizeAlgo
      );
      setIsAlgoPrev(true);
    } else if (selectedOption === "Depth-first search") {
      if (isAlgoPrev) {
        setGrid(resetPrevVisitedNodes(false));
      }
      dfsAnimatation(
        grid,
        startCoords,
        targetCoords,
        setIsAnimationFinished,
        setFinishedAlgo,
        dfsAlgo,
        setGrid,
        setVisualizeAlgo
      );
      setIsAlgoPrev(true);
    } else if (selectedOption === "A* search algorithm") {
      if (isAlgoPrev) {
        setGrid(resetPrevVisitedNodes(false));
      }
      astarAnimation(
        grid,
        startCoords,
        targetCoords,
        setIsAnimationFinished,
        setFinishedAlgo,
        astarAlgo,
        setGrid,
        setVisualizeAlgo
      );
      setIsAlgoPrev(true);
    } else if (selectedOption === "Generate maze") {
      resetPrevVisitedNodes(true);
      setResetAlgo(false);
      setIsAnimationFinished(false);
      setFinishedAlgo(true);
      setIsClearGrid(true);
      setIsAlgoPrev(false);
      generateMaze(
        grid,
        startCoords,
        targetCoords,
        mazeGeneration,
        setIsAnimationFinished,
        setFinishedAlgo,
        setGrid,
        setVisualizeAlgo
      );
    }
  }

  function resetPrevVisitedNodes(isWall) {
    const visited = document.querySelectorAll(".neighbor");
    const path = document.querySelectorAll(".path");
    visited.forEach((el) => el.classList.remove("neighbor"));
    path.forEach((el) => el.classList.remove("path"));
    const updateGrid = grid.slice();
    for (let i = 0; i < updateGrid.length; i++) {
      for (let j = 0; j < updateGrid[0].length; j++) {
        const currentCell = grid[i][j];
        const updatedCurrentCell = {
          row: i,
          col: j,
          start: i == startCoords[0] && j == startCoords[1],
          end: i == targetCoords[0] && j == targetCoords[1],
          visited: false,
          distance: Infinity,
          wall: isWall ? false : currentCell.wall,
        };
        updateGrid[i][j] = updatedCurrentCell;
      }
    }
    return updateGrid;
  }

  function changedAlgo() {
    setResetAlgo(false);
    setIsAnimationFinished(false);
    setFinishedAlgo(true);
    setIsClearGrid(true);
  }

  function resetArr() {
    setGrid(createGrid());
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

  // when drawing walls - rerender grid
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

  const nodeClass = (start, end, wall) => {
    return start ? "col start" : end ? "col end" : wall ? "col wall" : "col";
  };

  return (
    <>
      <div className="main-container">
        <table
          className="grid-container"
          onMouseLeave={(e) => handleMouseLeave(e)}>
          {grid.map((row, i) => {
            return (
              <tr key={i} className="row">
                {row.map((cell, i) => {
                  return (
                    <td
                      data-col={`${cell.row}-${cell.col}`}
                      className={nodeClass(cell.start, cell.end, cell.wall)}
                      onMouseEnter={(e) =>
                        handleMouseEnter(e, cell.row, cell.col)
                      }
                      onMouseDown={(e) =>
                        handleMouseDown(e, cell.row, cell.col)
                      }
                      onMouseUp={(e) => handleMouseUp(e)}></td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}
