import { findNeighbors } from "./utils";

function bi_bfs(src, dst, grid) {
  let size = grid[0].length * grid.length;

  const queueA = [];
  const queueB = [];
  const visitedA = [];
  const visitedB = [];
  const pred = [];
  const orderedCells = [];
  orderedCells.push(src);

  for (let i = 0; i < size; i++) {
    visitedA[i] = false;
    visitedB[i] = false;
  }

  visitedA[src.id] = true;
  visitedB[dst.id] = true;

  queueA.push(src);
  queueB.push(dst);

  while (queueA.length > 0 && queueB.length > 0) {
    if (queueA.length > 0) {
      let currCell = queueA.pop();
    }
  }
}

export { bi_bfs };
