import { findNeighbors } from "../algorithms/utils";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// not finished
function dfsMaze(grid, src, dst) {
  const orderedCells = [];
  const stack = [];
  const visited = [];
  let colSize = grid[0].length;
  let rowSize = grid.length;

  // this gives cool effect
  // for (let i = 0; i < colSize; i++) {
  //   orderedCells.push(grid[0][i]);
  //   orderedCells.push(grid[grid.length - 1][colSize - 1 - i]);
  // }
  // for (let i = 0; i < rowSize; i++) {
  //   orderedCells.push(grid[i][0]);
  //   orderedCells.push(grid[rowSize - i - 1][grid[1].length - 1]);
  // }

  for (const row of grid) {
    for (const cell of row) {
      if (cell.type !== 1 && cell.type !== 2) {
        cell.type = 3;
        visited[cell.id] = false;
      }
    }
  }

  let randRow = Math.floor(Math.random() * rowSize);
  let randCol = Math.floor(Math.random() * colSize);
  let startCell = grid[randRow][randCol];
  visited[startCell.id] = true;
  stack.push(startCell);
  orderedCells.push(startCell);
  while (stack.length > 0) {
    let currCell = stack.pop();
    let neighbors = findNeighbors(currCell, grid, 0); // passing an object, avoid type 0, regular cell
    shuffleArray(neighbors);
    for (const cell of neighbors) {
      if (
        // findNeighbors(cell, grid, 0).length > 0 &&
        cell.type !== 1 &&
        cell.type !== 2 &&
        !visited[cell.id]
      ) {
        visited[cell.id] = true;
        stack.push(cell);
        orderedCells.push(currCell);
      }
    }
  }
  // let neighbors = findNeighbors(src, grid, 0); // passing an object, avoid type 0, regular cell
  // if (neighbors.length === 4) {
  //   console.log("in if");
  //   console.log(neighbors);
  //   let randInd = Math.floor(Math.random() * 3);
  //   let randCell = neighbors[randInd];
  //   orderedCells.push(randCell);
  // }
  // neighbors = findNeighbors(dst, grid, 0); // passing an object, avoid type 0, regular cell
  // if (neighbors.length === 4) {
  //   console.log("in if");
  //   console.log(neighbors);
  //   let randInd = Math.floor(Math.random() * 3);
  //   let randCell = neighbors[randInd];
  //   orderedCells.push(randCell);
  // }
  return orderedCells;
}

export { dfsMaze };
