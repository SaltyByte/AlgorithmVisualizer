function randomMaze(grid) {
  const orderedCells = [];
  let counter = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (cell.type !== 1 && cell.type !== 2) {
        cell.type = 0;
      }
      if (Math.random() < 0.2 && cell.type !== 2 && cell.type !== 1) {
        orderedCells[counter] = cell;
        counter++;
      }
    }
  }
  return orderedCells;
}

export { randomMaze };
