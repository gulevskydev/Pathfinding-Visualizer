const unvisited = [];
const visited = [];
export default function dfsMazeGeneration(grid, start) {
  console.log(grid);
  //   const visited = [];
  const row = start[0];
  const col = start[1];
  dfsMazeAlgo(grid, row, col);
  console.log(visited);
  return visited;
}

function dfsMazeAlgo(grid, row, col) {
  let cell = grid[row][col];
  visited.push(cell);
  let newRandomArray = generateNewArray();

  for (let i = 0; i < newRandomArray.length; i++) {
    switch (newRandomArray[i]) {
      //Top
      case 0:
        if (row - 2 < 0) {
          continue;
        }
        if (!visited.includes(grid[row - 2][col])) {
          visited.push(grid[row - 1][col]);
          dfsMazeAlgo(grid, row - 2, col);
        }
        break;
      case 1:
        if (row + 2 >= grid.length) {
          continue;
        }
        if (!visited.includes(grid[row + 2][col])) {
          visited.push(grid[row + 1][col]);
          dfsMazeAlgo(grid, row + 2, col);
        }
        break;
      case 2:
        if (col - 2 < 0) {
          continue;
        }
        if (!visited.includes(grid[row][col - 2])) {
          visited.push(grid[row][col - 1]);
          dfsMazeAlgo(grid, row, col - 2);
        }
        break;
      case 3:
        if (col + 2 >= grid[0].length) {
          continue;
        }
        if (!visited.includes(grid[row][col + 2])) {
          visited.push(grid[row][col + 1]);
          dfsMazeAlgo(grid, row, col + 2);
        }
        break;
    }
  }
}

function generateNewArray() {
  const arr = [];
  while (arr.length < 4) {
    const num = Math.floor(Math.random() * 4);
    if (arr.indexOf(num) < 0) {
      arr.push(num);
    }
  }
  return arr;
}
