export default function dfs(grid, currentNode, finishNode) {
  const { allVisited, found } = depthFirstReq(grid, currentNode, finishNode);
  return [allVisited, found];
}
const visited = [];
const depthFirstReq = (grid, currentNode, finishNode, allVisited = []) => {
  if (!visited.includes(currentNode)) {
    allVisited.push(currentNode);
    visited.push(currentNode);
  }
  currentNode.visited = true;
  if (currentNode === finishNode) {
    return { allVisited, found: true };
  }
  const neighbors = getUnvisitedNonWallNeighbors(currentNode, grid);
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    neighbor.visited = true;
    visited.push(currentNode);

    const { found } = depthFirstReq(grid, neighbor, finishNode, allVisited);
    if (found) {
      return { allVisited, found: true };
    }
  }
  return { allVisited, found: false };
};

function getUnvisitedNonWallNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  return neighbors.filter(
    (n) => !n.visited && !n.wall && visited.indexOf(n) === -1
  );
}
