import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import Cell from "./Cell";
import "../css/style.css";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { floyd } from "../algorithms/floyd";
import { aStar } from "../algorithms/aStar";
import { bi_bfs } from "../algorithms/bi_bfs";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const preventDragHandler = (e) => {
  e.preventDefault();
};

// prevent context menu on right click
const preventContextMenu = (e) => {
  e.preventDefault();
};

const Grid = forwardRef((props, ref) => {
  const cellClass = "cell-";
  // time each cell sleeps before another iteration
  const runTimer = 10;
  const pathTimer = 50;
  const [grid, setGrid] = useState([]);
  const cellSize = 25; // each cell size 25 by 25 px
  let startCellHeight = Math.floor(props.col / 2);
  // this is called only one after initial loading
  useEffect(() => {
    console.log("Init grid");
    const newGrid = [];
    for (let i = 0; i < props.row; i++) {
      let row = [];
      for (let j = 0; j < props.col; j++) {
        // type 0 = regular cell
        // type 1 = starting cell
        // type 2 = end cell
        // type 3 = wall
        // type 4 = visited
        // type 5 = path
        // type 99 = cell after wall deletion
        let currCell = {
          id: j + props.col * i,
          row: i,
          col: j,
          type: 0,
        };
        row.push(currCell);
        // middles for start and end
        if (i === 5 && j === Math.floor(props.col / 2)) {
          currCell.type = 1;
        }
        if (i === props.row - 6 && j === Math.floor(props.col / 2)) {
          currCell.type = 2;
        }
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    // eslint-disable-next-line
  }, []);

  function handleMouseEneterAndDown(event, props) {
    // placing walls, type 11 for cell after being a wall, this is so the init animation wont be lots of walls deleted
    if (
      event.buttons === 1 &&
      (props.cell.type === 0 || props.cell.type === 99)
    ) {
      props.cell.type = 3;
      const newGrid = [...grid];
      setGrid(newGrid);
    }
    // deleting walls with right click, makeing it type 11 to handle the init animation
    if (event.buttons === 2 && props.cell.type === 3) {
      props.cell.type = 99;
      const newGrid = [...grid];
      setGrid(newGrid);
    }
    // moving start and end cells
    if (
      event.buttons === 1 &&
      (props.cell.type === 1 || props.cell.type === 2)
    ) {
      console.log("Dragging the point");
    }
  }

  const runVisualize = async (orderedCells) => {
    for (const cell of orderedCells) {
      if (cell.type === 0 || cell.type === 99) {
        cell.type = 4;
        const newGrid = [...grid];
        setGrid(newGrid);
        await sleep(runTimer);
      }
    }
  };
  // works!
  const visualizePath = async (pred, dst) => {
    if (pred.length === 0) {
      return;
    }
    let parent = pred[dst.id]; // obj cell
    const path = [];
    path.push(parent);
    parent = pred[parent.id];
    while (parent !== undefined) {
      // loop to build path
      path.push(parent);
      parent = pred[parent.id];
    }
    path.reverse();
    path.shift();
    for (const cell of path) {
      cell.type = 5;
      const newGrid = [...grid];
      setGrid(newGrid);
      await sleep(pathTimer);
    }
  };

  useImperativeHandle(ref, () => ({
    async visualize(algoType) {
      let orderedCells = [];
      let pred = [];
      let srcCell = grid[5][startCellHeight];
      let dstCell = grid[props.row - 6][startCellHeight];
      switch (algoType) {
        case "a":
          [orderedCells, pred] = aStar(srcCell, dstCell, grid);
          await runVisualize(orderedCells);
          visualizePath(pred, dstCell);
          break;
        case "bfs":
          [orderedCells, pred] = bfs(srcCell, grid);
          await runVisualize(orderedCells);
          visualizePath(pred, dstCell);
          break;
        case "dfs":
          [orderedCells, pred] = dfs(srcCell, grid);
          await runVisualize(orderedCells);
          visualizePath(pred, dstCell);
          break;
        case "floyd":
          [orderedCells, pred] = floyd(srcCell, grid);
          await runVisualize(orderedCells);
          // visualizePath(path);
          break;
        case "bi_bfs":
          [orderedCells, pred] = bi_bfs(srcCell, grid);
          await runVisualize(orderedCells);
          // visualizePath(path);
          break;
        default:
          console.log("Nothing is selected");
      }
    },
  }));

  return (
    <div
      style={{
        width: `${cellSize * props.row}px`,
        height: `${cellSize * props.col}px`,
      }}
      className="grid"
      onDragStart={preventDragHandler}
      onContextMenu={preventContextMenu}
    >
      {grid.map((row, rowId) => {
        return (
          <div key={rowId}>
            {row.map((cell, cellId) => {
              return (
                <div key={cellId}>
                  <Cell
                    cell={cell}
                    cellClass={cellClass.concat(cell.type)}
                    handleMouse={handleMouseEneterAndDown}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

export default Grid;
