export default function astarAlgo(grid, start, target) {
  let open = [];
  let close = [];

  open.push(start);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const currentNode = grid[i][j];
      if (!currentNode.start) {
        currentNode.distanceFromStart = Infinity;
        currentNode.distanceFromTarget = Infinity;
        currentNode.distanceTotal = Infinity;
      }
    }
  }

  start.distanceFromStart = 0;
  start.distanceTotal =
    Math.abs(start.row - target.row) + Math.abs(start.col - target.col);

  while (open.length > 0) {
    let minNode = open.shift();
    minNode.visited = true;
    close.push(minNode);
    if (minNode.end) {
      const path = getShourtestPath(minNode, target);
      return [close, path];
    }

    let neighbors = getNeighbors(minNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      let potentialPathDistance = minNode.distanceFromStart + 1;
      let distanceFromEnd =
        Math.abs(neighbor.row - target.row) +
        Math.abs(neighbor.col - target.col);
      if (potentialPathDistance < neighbor.distanceFromStart) {
        neighbor.distanceFromStart = potentialPathDistance;
        neighbor.previosNode = minNode;

        neighbor.distanceTotal = potentialPathDistance + distanceFromEnd;
        open.push(neighbor);
        console.log(neighbor);
      }
    }
    open.sort((a, b) => a.distanceTotal - b.distanceTotal);
  }
  return close;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  return neighbors.filter((n) => !n.visited && !n.wall);
}

function getShourtestPath(cell, target) {
  const result = [];
  result.push(target);
  while (cell.previosNode) {
    result.push(cell.previosNode);
    cell = cell.previosNode;
  }
  return result.reverse();
}
