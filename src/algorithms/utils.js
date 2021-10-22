// type is what to aviod
function findNeighbors(cell, grid, avoidType) {
  // avoidType 3 is finding neighbors of regular
  const neighbors = []; // avoidType 0 is finding neighbors of wall
  const maxCol = grid[0].length - 1;
  const maxRow = grid.length - 1;
  let sideCellType;
  // right
  if (cell.row < maxRow) {
    sideCellType = grid[cell.row + 1][cell.col].type;
    if (sideCellType !== avoidType) {
      neighbors.push(grid[cell.row + 1][cell.col]);
    }
  }
  // up
  if (cell.col > 0) {
    sideCellType = grid[cell.row][cell.col - 1].type;
    if (sideCellType !== avoidType) {
      neighbors.push(grid[cell.row][cell.col - 1]);
    }
  }
  // left
  if (cell.row > 0) {
    sideCellType = grid[cell.row - 1][cell.col].type;
    if (sideCellType !== avoidType) {
      neighbors.push(grid[cell.row - 1][cell.col]);
    }
  }
  // down
  if (cell.col < maxCol) {
    sideCellType = grid[cell.row][cell.col + 1].type;
    if (sideCellType !== avoidType) {
      neighbors.push(grid[cell.row][cell.col + 1]);
    }
  }
  return neighbors;
}

function getDist(src, dst) {
  // 1.01 is a constant to make the algo run smarter..
  // dont know why, this is Manhattan distance formula and this is needed
  return 1.01 * (Math.abs(src.row - dst.row) + Math.abs(src.col - dst.col));
}

function buildPath(pred, dst) {
  if (pred.length === 0) {
    return [];
  }
  let parent = pred[dst.id]; // obj cell
  const path = [];
  while (parent !== undefined) {
    // loop to build path
    path.push(parent);
    parent = pred[parent.id];
  }
  path.reverse();
  path.shift();
  return path;
}

export { findNeighbors, getDist, buildPath };
