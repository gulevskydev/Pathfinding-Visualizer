const DiijkstraAlgo = (grid, start, target) => {
  start.distance = 0;
  const notvisitedNodes = getAllNodes(grid);
  const visitedNodes = [];
  const animations = [];

  while (notvisitedNodes.length) {
    // sort nodes by the distance value
    sortNodesByDistance(notvisitedNodes);

    const minDistanceNode = notvisitedNodes.shift();
    // check if not wall
    if (minDistanceNode.wall) {
      continue;
    }
    // if no way to find target
    if (minDistanceNode.distance === Infinity) return [animations, []];
    // when find path return  array of animations and path from start node to target node
    if (minDistanceNode === target) {
      const pathAnimations = pathFromStart(minDistanceNode);
      return [animations, pathAnimations];
    }

    minDistanceNode.visited = true;
    visitedNodes.push(minDistanceNode);
    updateNotVisititedNodes(grid, minDistanceNode, animations);
  }
};

function updateNotVisititedNodes(notvisitedNodes, closest, animations) {
  const minDistanceNodes = findminDistanceNodes(
    notvisitedNodes,
    closest,
    animations
  );
  for (let i = 0; i < minDistanceNodes.length; i++) {
    minDistanceNodes[i].distance = closest.distance + 1;
    minDistanceNodes[i].previosNode = closest;
  }
}
//  find all not visited neighbors of current node
function findminDistanceNodes(grid, closest, animations) {
  const minDistanceNodes = [];
  const { col, row } = closest;

  if (row > 0) minDistanceNodes.push(grid[row - 1][col]);
  if (row + 1 < grid.length) minDistanceNodes.push(grid[row + 1][col]);
  if (col > 0) minDistanceNodes.push(grid[row][col - 1]);
  if (col + 1 < grid[0].length) minDistanceNodes.push(grid[row][col + 1]);

  animations.push([row, col, "neighborAnimation"]);
  return minDistanceNodes.filter((node) => !node.visited);
}

function sortNodesByDistance(grid) {
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

export default DiijkstraAlgo;
