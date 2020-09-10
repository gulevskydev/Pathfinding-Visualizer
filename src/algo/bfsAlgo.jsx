const unvisitedNodes = [];
const visitedNodes = [];

export default function bfs(grid, start, target) {
  unvisitedNodes.push(grid[start[0]][start[1]]);

  while (unvisitedNodes.length) {
    const currentNodeCopy = unvisitedNodes.shift();
    currentNodeCopy.visited = true;
    visitedNodes.push(currentNodeCopy);

    if (currentNodeCopy.end) {
      const path = getShourtestPath(currentNodeCopy);
      return [visitedNodes, path];
    }

    const neighbors = getNeighbors(currentNodeCopy, grid);

    for (let i = 0; i < neighbors.length; i++) {
      if (!unvisitedNodes.includes(neighbors[i])) {
        neighbors[i].previosNode = currentNodeCopy;
        unvisitedNodes.push(neighbors[i]);
      }
    }
  }
  return visitedNodes;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  return neighbors.filter((n) => !n.visited && !n.wall);
}

function getShourtestPath(cell) {
  const result = [];
  while (cell.previosNode) {
    result.push(cell.previosNode);
    cell = cell.previosNode;
  }
  return result.reverse();
}
