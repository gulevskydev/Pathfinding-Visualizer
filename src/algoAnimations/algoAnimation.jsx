/*
 *** Diijkstra algo ***
 */

export function diijkstraAnimation(
  grid,
  startCoords,
  targetCoords,
  setFinishedAlgo,
  setVisualizeAlgo,
  setIsAnimationFinished,
  DiijkstraAlgo
) {
  setIsAnimationFinished(true);
  setFinishedAlgo(false);

  const start = grid[startCoords[0]][startCoords[1]];
  const target = grid[targetCoords[0]][targetCoords[1]];
  const allAnimations = DiijkstraAlgo(grid, start, target);
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
    setVisualizeAlgo(false);
    setFinishedAlgo(true);
  }, animationPath.length * 50 + animationsSearch.length * 10 + 100);
}

/*
 ***  Maze Generation ***
 */

export function generateMaze(
  grid,
  startCoords,
  targetCoords,
  mazeGeneration,
  setIsAnimationFinished,
  setFinishedAlgo,
  setGrid,
  setVisualizeAlgo
) {
  setIsAnimationFinished(true);
  setFinishedAlgo(false);

  const start = grid[startCoords[0]][startCoords[1]];
  const mazeArray = mazeGeneration(grid, startCoords);
  const updatedGrid = grid.slice();

  for (let i = 0; i < updatedGrid.length; i++) {
    for (let j = 0; j < updatedGrid[i].length; j++) {
      const currentNode = updatedGrid[i][j];
      const id = `${currentNode.row}-${currentNode.col}`;
      const currentNodeAnimation = document.querySelector(`[data-col='${id}']`);
      if (
        !mazeArray.includes(currentNode) &&
        !currentNode.start &&
        !currentNode.end
      ) {
        setTimeout(() => {
          currentNode.wall = true;
          currentNodeAnimation.classList.add("wall");
        }, j * 50);
      }
    }
  }
  setTimeout(() => {
    setGrid(updatedGrid);
    setVisualizeAlgo(false);
    setFinishedAlgo(true);
  }, 50 * updatedGrid[0].length);
}

/*
 ***  bfs/dfs/astar algorithms animation ***
 */

export function bfsAnimatation(
  grid,
  startCoords,
  targetCoords,
  setIsAnimationFinished,
  setFinishedAlgo,
  algo,
  setGrid,
  setVisualizeAlgo
) {
  setIsAnimationFinished(true);
  setFinishedAlgo(false);

  const arr = algo(grid, startCoords, targetCoords);
  const mazeArray = arr[0];
  const path = arr[1];
  const updatedGrid = grid.slice();
  for (let i = 0; i < mazeArray.length; i++) {
    const id = `${mazeArray[i].row}-${mazeArray[i].col}`;
    const currentCell = document.querySelector(`[data-col='${id}']`);

    setTimeout(() => {
      currentCell.classList.add("neighbor");
    }, i * 5);
  }
  setTimeout(() => {
    for (let i = 0; i < path.length; i++) {
      const id = `${path[i].row}-${path[i].col}`;
      const currentCell = document.querySelector(`[data-col='${id}']`);

      setTimeout(() => {
        currentCell.classList.remove("neighbor");
        currentCell.classList.add("path");
      }, i * 10);
    }
  }, mazeArray.length * 8);
  setTimeout(() => {
    setGrid(updatedGrid);
    setVisualizeAlgo(false);
    setFinishedAlgo(true);
  }, path.length * 10 + mazeArray.length * 19);
}

/*
 *** dfs ***
 */
export function dfsAnimatation(
  grid,
  startCoords,
  targetCoords,
  setIsAnimationFinished,
  setFinishedAlgo,
  dfs,
  setGrid,
  setVisualizeAlgo
) {
  setIsAnimationFinished(true);
  setFinishedAlgo(false);

  const arr = dfs(
    grid,
    grid[startCoords[0]][startCoords[1]],
    grid[targetCoords[0]][targetCoords[1]]
  );

  const updatedGrid = grid.slice();
  for (let i = 0; i < arr.length; i++) {
    const id = `${arr[i].row}-${arr[i].col}`;
    const currentCell = document.querySelector(`[data-col='${id}']`);

    setTimeout(() => {
      currentCell.classList.add("neighbor");
    }, i * 5);
  }
  setTimeout(() => {
    for (let i = 0; i < arr.length; i++) {
      const id = `${arr[i].row}-${arr[i].col}`;
      const currentCell = document.querySelector(`[data-col='${id}']`);

      setTimeout(() => {
        currentCell.classList.remove("neighbor");
        currentCell.classList.add("path");
      }, i * 10);
    }
  }, arr.length * 8);
  setTimeout(() => {
    setGrid(updatedGrid);
    setVisualizeAlgo(false);
    setFinishedAlgo(true);
  }, 5 * arr.length + 10 * arr.length);
}

/*
 *** astar
 */
export function astarAnimation(
  grid,
  startCoords,
  targetCoords,
  setIsAnimationFinished,
  setFinishedAlgo,
  astarAlgo,
  setGrid,
  setVisualizeAlgo
) {
  setIsAnimationFinished(true);
  setFinishedAlgo(false);

  const arr = astarAlgo(
    grid,
    grid[startCoords[0]][startCoords[1]],
    grid[targetCoords[0]][targetCoords[1]]
  );

  const mazeArray = arr[0];
  const path = arr[1];
  console.log(arr);
  const updatedGrid = grid.slice();
  for (let i = 0; i < mazeArray.length; i++) {
    const id = `${mazeArray[i].row}-${mazeArray[i].col}`;
    const currentCell = document.querySelector(`[data-col='${id}']`);

    setTimeout(() => {
      currentCell.classList.add("neighbor");
    }, i * 5);
  }
  setTimeout(() => {
    for (let i = 0; i < path.length; i++) {
      const id = `${path[i].row}-${path[i].col}`;
      const currentCell = document.querySelector(`[data-col='${id}']`);

      setTimeout(() => {
        currentCell.classList.remove("neighbor");
        currentCell.classList.add("path");
      }, i * 10);
    }
  }, mazeArray.length * 8);
  setTimeout(() => {
    setVisualizeAlgo(false);
    setFinishedAlgo(true);
    setGrid(updatedGrid);
  }, 10 * path.length + mazeArray.length * 18);
}
