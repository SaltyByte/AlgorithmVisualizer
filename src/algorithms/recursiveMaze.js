import { findNeighbors } from "./utils";

function recursiveMaze(grid) {
  let colSize = grid[0].length;
  let rowSize = grid.length;
  const orderedCells = [];
  recMaze(orderedCells, rowSize, colSize, grid);
  return orderedCells;
}

function recMaze(orderedCells, row, col, grid) {
  if (row < 4 || col < 4) {
    return;
  }
  // 1 === horizontal, 0 === vertical
  let orientation = Math.floor(Math.random() * 2);
  console.log("orientation: " + orientation);
  if (orientation === 1) {
    let randIndRow = Math.floor(Math.random() * row);
    wallBuilder(orderedCells, orientation, randIndRow, col, grid);
    recMaze(orderedCells, randIndRow, col, grid);
  } else {
    let randIndCol = Math.floor(Math.random() * col);
    wallBuilder(orderedCells, orientation, row, randIndCol, grid);
    recMaze(orderedCells, row, randIndCol, grid);
  }
}

// works
function wallBuilder(orderedCells, orientation, row, col, grid) {
  if (orientation === 1) {
    let randWallBreakCol = Math.floor(Math.random() * col);
    for (let i = 0; i < col; i++) {
      if (randWallBreakCol !== i) {
        const currCell = grid[row][i];
        console.log(currCell);
        orderedCells.push(currCell);
      }
    }
  } else {
    let randWallBreakRow = Math.floor(Math.random() * col);
    for (let i = 0; i < row; i++) {
      if (randWallBreakRow !== i) {
        const currCell = grid[i][col];
        console.log(currCell);
        orderedCells.push(currCell);
      }
    }
  }
}

export { recursiveMaze };
