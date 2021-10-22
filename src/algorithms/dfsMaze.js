import { findNeighbors } from "../algorithms/utils";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function dfsMaze(grid) {
  const orderedCells = [];
  const stack = [];
  const visited = [];
  let colSize = grid[0].length;
  let rowSize = grid.length;

  for (const row of grid) {
    for (const cell of row) {
      if (cell.type !== 1 && cell.type !== 2) {
        cell.type = 3;
        visited[cell.id] = false;
      }
    }
  }

  // returns number from 0 to max col or row size
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
      if (cell.type !== 1 && cell.type !== 2 && !visited[cell.id]) {
        visited[cell.id] = true;
        stack.push(cell);
        orderedCells.push(currCell);
      }
    }
  }
  return orderedCells;
}

export { dfsMaze };
