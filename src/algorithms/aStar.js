import { findNeighbors, getDist as h, buildPath } from "./utils";
import PriorityQueue from "js-priority-queue";
function aStar(src, dst, grid) {
  const orderedCells = []; // obj array
  let size = grid[0].length * grid.length;
  // basicly pred map
  const cameFrom = [];
  // score from src to next cell
  const gScore = {};
  // f(n) = h(n) + g(n). score of dist from src to next node + score of dist from next node to dst
  const fScore = {};
  for (let i = 0; i < size; i++) {
    // init with inf
    gScore[i] = 999999;
    fScore[i] = 999999;
  }
  var compareCells = function (cellOne, cellTwo) {
    return fScore[cellOne.id] - fScore[cellTwo.id];
  };
  const pq = new PriorityQueue({ comparator: compareCells });
  pq.queue(src);
  gScore[src.id] = 0;
  fScore[src.id] = h(src, dst);
  while (pq.length > 0) {
    let currCell = pq.dequeue();
    orderedCells.push(currCell);
    if (currCell.type === 2) {
      console.log("Found dst");
      const path = buildPath(cameFrom, dst);
      return [orderedCells, path];
    }
    const neighbors = findNeighbors(currCell, grid, 3); // passing an object, avoid type 3, avoid walls
    for (const cell of neighbors) {
      let tempScore = gScore[currCell.id] + 1;
      if (tempScore < gScore[cell.id]) {
        cameFrom[cell.id] = currCell;
        gScore[cell.id] = tempScore;
        fScore[cell.id] = gScore[cell.id] + h(cell, dst);
        if (!(cell in pq)) {
          pq.queue(cell);
        }
      }
    }
  }
  console.log("Didnt find dst");
  return [orderedCells, []];
}

export { aStar };
