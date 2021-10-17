import { findNeighbors } from "./utils";

function dfs(src, grid) {
  console.log("DFSing");
  const pred = []; // int array
  const orderedCells = []; // obj array
  const visited = [];
  const stack = [];
  let size = grid[0].length * grid.length;
  for (let i = 0; i < size; i++) {
    visited[i] = false;
  }
  stack.push(src);
  while (stack.length > 0) {
    let currCell = stack.pop();
    orderedCells.push(currCell);
    if (!visited[currCell.id]) {
      visited[currCell.id] = true;
      const neighbors = findNeighbors(currCell, grid, 3); // passing an object, avoid type 3, avoid walls
      for (const cell of neighbors) {
        if (!visited[cell.id]) {
          stack.push(cell);
          pred[cell.id] = currCell;
        }
      }
    }
    if (currCell.type === 2) {
      return [orderedCells, pred];
    }
  }
  return [orderedCells, []];
}

export { dfs };
