const Diijkstra = (grid, start, target) => {
  start.distance = 0;
  const visitedCells = [];
  const notVisitedCells = getAllNodes(grid);
  const animations = [];
  while (notVisitedCells.length) {
    sortCellsbyDistance(notVisitedCells);
    const closestCell = notVisitedCells.shift();
    if (closestCell.wall) {
      continue;
    }
    if (closestCell.distance === Infinity) return [animations, []];
    if (closestCell === target) {
      const pathAnimations = pathFromStart(closestCell);
      return [animations, pathAnimations];
    }
    closestCell.visited = true;
    visitedCells.push(closestCell);
    updateNotVisititedCells(grid, closestCell, animations);
  }
};

function updateNotVisititedCells(notVisitedCells, closest, animations) {
  const closestCells = findClosestCells(notVisitedCells, closest, animations);
  for (let i = 0; i < closestCells.length; i++) {
    closestCells[i].distance = closest.distance + 1;
    closestCells[i].previosNode = closest;
  }
}

function findClosestCells(grid, closest, animations) {
  const closestCells = [];
  const { col, row } = closest;

  if (row > 0) closestCells.push(grid[row - 1][col]);
  if (row + 1 < grid.length) closestCells.push(grid[row + 1][col]);
  if (col > 0) closestCells.push(grid[row][col - 1]);
  if (col + 1 < grid[0].length) closestCells.push(grid[row][col + 1]);

  animations.push([row, col, "neighborAnimation"]);
  return closestCells.filter((cell) => {
    return cell.visited === false;
  });
}

function sortCellsbyDistance(grid) {
  return grid.sort((a, b) => a.distance - b.distance);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function pathFromStart(cell) {
  const pathArray = [cell];
  while (cell.previosNode) {
    pathArray.push(cell.previosNode);
    cell = cell.previosNode;
  }
  return pathArray.reverse();
}

export default Diijkstra;
