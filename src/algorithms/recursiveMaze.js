function recursiveMaze(grid) {
  let colSize = grid[0].length;
  let rowSize = grid.length;
  const orderedCells = [];
  recMaze(orderedCells, 0, 0, rowSize, colSize, grid);
  return orderedCells;
}

function recMaze(orderedCells, rowSrc, colSrc, rowDst, colDst, grid) {
  if (rowDst - rowSrc < 3 || colDst - colSrc < 3) {
    return;
  }
  // 1 === horizontal, 0 === vertical
  let orientation = Math.floor(Math.random() * 2);
  console.log("orientation: " + orientation);
  if (orientation === 1) {
    let randIndRow = Math.floor(Math.random() * (rowDst - rowSrc) + rowSrc);
    while (randIndRow % 2 === 0) {
      randIndRow = Math.floor(Math.random() * (rowDst - rowSrc) + rowSrc);
    }
    wallBuilder(
      orderedCells,
      orientation,
      rowSrc,
      colSrc,
      randIndRow,
      colDst,
      grid
    );
    recMaze(orderedCells, rowSrc, colSrc, randIndRow, colDst, grid);
    recMaze(orderedCells, randIndRow + 1, colSrc, rowDst, colDst, grid);
  } else {
    let randIndCol = Math.floor(Math.random() * (colDst - colSrc) + colSrc);
    while (randIndCol % 2 === 0) {
      randIndCol = Math.floor(Math.random() * (colDst - colSrc) + colSrc);
    }
    wallBuilder(
      orderedCells,
      orientation,
      rowSrc,
      colSrc,
      rowDst,
      randIndCol,
      grid
    );
    recMaze(orderedCells, rowSrc, colSrc, rowDst, randIndCol, grid);
    recMaze(orderedCells, rowSrc, randIndCol + 1, rowDst, colDst, grid);
  }
}

function wallBuilder(
  orderedCells,
  orientation,
  rowMin,
  colMin,
  rowMax,
  colMax,
  grid
) {
  if (orientation === 1) {
    let randWallBreakCol = Math.floor(
      Math.random() * (colMax - colMin) + colMin
    );
    while (randWallBreakCol % 2 !== 0) {
      randWallBreakCol = Math.floor(Math.random() * (colMax - colMin) + colMin);
    }
    for (let i = colMin; i < colMax; i++) {
      if (randWallBreakCol !== i) {
        const currCell = grid[rowMax][i];
        orderedCells.push(currCell);
      }
    }
  } else {
    let randWallBreakRow = Math.floor(
      Math.random() * (rowMax - rowMin) + rowMin
    );
    while (randWallBreakRow % 2 !== 0) {
      randWallBreakRow = Math.floor(Math.random() * (rowMax - rowMin) + rowMin);
    }
    for (let i = rowMin; i < rowMax; i++) {
      if (randWallBreakRow !== i) {
        const currCell = grid[i][colMax];
        orderedCells.push(currCell);
      }
    }
  }
}

export { recursiveMaze };
