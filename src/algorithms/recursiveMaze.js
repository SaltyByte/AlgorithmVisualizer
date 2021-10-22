import { findNeighbors } from "./utils";

function recursiveMaze(grid) {
  let colSize = grid[0].length;
  let rowSize = grid.length;
  const orderedCells = [];
  recFunc(orderedCells, rowSize, colSize, grid);
  return orderedCells;
}

function recFunc(orderedCells, row, col, grid) {
  if (row < 2 || col < 2) {
    return;
  }
  // 1 === horizontal, 0 === vertical
  let orientation = Math.floor(Math.random() * 2);
  wallBuilder(orderedCells, orientation, row, col, grid);
}

function wallBuilder(orderedCells, orientation, row, col, grid) {
  if (orientation === 1) {
    for (let i = 0; i < col; i++) {
      orderedCells.push(grid[row][i]);
    }
  } else {
    for (let i = 0; i < row; i++) {
      orderedCells.push(grid[i][col]);
    }
  }
}

export { recursiveMaze };
