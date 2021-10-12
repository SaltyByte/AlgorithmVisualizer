function findNeighbors(cell, grid) {
  const neighbors = [];
  const maxCol = grid[0].length - 1;
  const maxRow = grid.length - 1;
  let sideCellType;

  // right
  if (cell.row < maxRow) {
    sideCellType = grid[cell.row + 1][cell.col].type;
    if (sideCellType !== 3) {
      neighbors.push(grid[cell.row + 1][cell.col]);
    }
  }
  // up
  if (cell.col > 0) {
    sideCellType = grid[cell.row][cell.col - 1].type;
    if (sideCellType !== 3) {
      neighbors.push(grid[cell.row][cell.col - 1]);
    }
  }
  // left
  if (cell.row > 0) {
    sideCellType = grid[cell.row - 1][cell.col].type;
    if (sideCellType !== 3) {
      neighbors.push(grid[cell.row - 1][cell.col]);
    }
  }
  // down
  if (cell.col < maxCol) {
    sideCellType = grid[cell.row][cell.col + 1].type;
    if (sideCellType !== 3) {
      neighbors.push(grid[cell.row][cell.col + 1]);
    }
  }

  return neighbors;
}

function getDist(src, dst) {
  // 2 is a constant to make the algo run smarter..
  // dont know why, this is Manhattan distance formula and this is needed
  return 2 * (Math.abs(src.row - dst.row) + Math.abs(src.col - dst.col));
}

export { findNeighbors, getDist };
