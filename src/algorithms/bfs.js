import { findNeighbors } from "./utils";
function bfs(src, grid) {
  console.log("BFSing");
  let size = grid[0].length * grid.length;
  const queue = []; // obj array
  const pred = []; // int array
  const orderedCells = []; // obj array
  const visited = []; // boolean
  for (let i = 0; i < size; i++) {
    visited[i] = false;
  }
  visited[src.id] = true;
  orderedCells.push(src);
  queue.push(src);
  while (queue.length > 0) {
    let currCell = queue.shift(); // object, not number
    const neighbors = findNeighbors(currCell, grid, 3); // passing an object, avoid type 3, avoid walls
    orderedCells.push(currCell);
    for (const cell of neighbors) {
      if (!visited[cell.id]) {
        // type 0 is regular not visited cell
        visited[cell.id] = true;
        pred[cell.id] = currCell;
        queue.push(cell);
      }
      if (cell.type === 2) {
        // type 2 end
        console.log("Found dst!");
        return [orderedCells, pred];
      }
    }
    visited[currCell.id] = true;
  }
  console.log("Finished bfsing, no PATH");
  return [orderedCells, []];
}

export { bfs };
