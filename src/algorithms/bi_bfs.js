import { findNeighbors, buildPath } from "./utils";

function bi_bfs(src, dst, grid) {
  let size = grid[0].length * grid.length;
  const queueSrc = [];
  const queueDst = [];
  const visitedSrc = [];
  const visitedDst = [];
  const predSrc = [];
  const predDst = [];
  const orderedCells = [];
  for (let i = 0; i < size; i++) {
    visitedSrc[i] = false;
    visitedDst[i] = false;
  }
  predSrc[src.id] = undefined;
  predDst[dst.id] = visitedSrc[src.id] = true;
  visitedDst[dst.id] = true;
  queueSrc.push(src);
  queueDst.push(dst);
  while (queueSrc.length > 0 && queueDst.length > 0) {
    if (queueSrc.length > 0) {
      let currCell = queueSrc.shift();
      orderedCells.push(currCell);
      const neighbors = findNeighbors(currCell, grid, 3);
      for (const cell of neighbors) {
        if (!visitedSrc[cell.id]) {
          visitedSrc[cell.id] = true;
          predSrc[cell.id] = currCell;
          queueSrc.push(cell);
        }
        if (visitedDst[cell.id]) {
          console.log("Found path src!");
          orderedCells.push(cell);
          const path = buildPathFromTwoPreds(cell, predSrc, predDst, src, dst);
          return [orderedCells, path];
        }
      }
      visitedSrc[currCell.id] = true;
    }
    if (queueDst.length > 0) {
      let currCell = queueDst.shift();
      orderedCells.push(currCell);
      const neighbors = findNeighbors(currCell, grid, 3);
      for (const cell of neighbors) {
        if (!visitedDst[cell.id]) {
          visitedDst[cell.id] = true;
          predDst[cell.id] = currCell;
          queueDst.push(cell);
        }
        if (visitedSrc[cell.id]) {
          console.log("Found path dst!");
          orderedCells.push(cell);
          const path = buildPathFromTwoPreds(cell, predSrc, predDst, src, dst);
          return [orderedCells, path];
        }
      }
      visitedDst[currCell.id] = true;
    }
  }
  return [orderedCells, []];
}

function buildPathFromTwoPreds(cell, predSrc, predDst, src, dst) {
  const srcPath = buildPath(predSrc, cell);
  srcPath.push(cell);
  const dstPath = buildPath(predDst, cell);
  dstPath.shift();
  dstPath.reverse();
  const newPath = [...srcPath, ...dstPath];
  return newPath;
}

export { bi_bfs };
