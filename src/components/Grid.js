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
import { aStar } from "../algorithms/aStar";
import { bi_bfs } from "../algorithms/bi_bfs";
import { randomMaze } from "../algorithms/randomMaze";
import { dfsMaze } from "../algorithms/dfsMaze";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// prevent dragging the grid
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
  const pathTimer = 50;
  const [grid, setGrid] = useState([]);
  const [clickedToMove, setClickedToMove] = useState(false);
  const [movingCell, setMovingCell] = useState(undefined);
  let srcCell = undefined;
  let dstCell = undefined;
  // each cell size 25 by 25 px
  const cellSize = 25;
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

  const swapCellsType = (src, dst) => {
    let temp = dst.type;
    dst.type = src.type;
    src.type = temp;
  };

  function handleMouseDown(event, props) {
    // update if we drag start or end points
    if (
      !clickedToMove &&
      event.buttons === 1 &&
      (props.cell.type === 1 || props.cell.type === 2)
    ) {
      console.log("setting true");
      setClickedToMove(true);
      setMovingCell(props.cell);
      // update if we add wall on down
    } else if (
      event.buttons === 1 &&
      !clickedToMove &&
      (props.cell.type === 0 || props.cell.type === 99)
    ) {
      props.cell.type = 3;
    }
    // update if we delete wall with down
    else if (event.buttons === 2 && props.cell.type === 3) {
      props.cell.type = 99;
    }
    const newGrid = [...grid];
    setGrid(newGrid);
  }

  function handleMouseUp(event, props) {
    if (clickedToMove) {
      console.log("setting false");
      setClickedToMove(false);
    }
  }

  function handleMouseEnter(event, props) {
    // placing walls, type 99 for cell after being a wall, this is so the init animation wont be lots of walls deleted
    if (
      event.buttons === 1 &&
      !clickedToMove &&
      (props.cell.type === 0 || props.cell.type === 99)
    ) {
      props.cell.type = 3;
    }
    // deleting walls with right click, makeing it type 11 to handle the init animation
    else if (event.buttons === 2 && props.cell.type === 3 && !clickedToMove) {
      props.cell.type = 99;
    }
    // moving start and end cells
    else if (event.buttons === 1 && clickedToMove) {
      swapCellsType(props.cell, movingCell);
      setMovingCell(props.cell);
    }
    const newGrid = [...grid];
    setGrid(newGrid);
  }
  // this gets full wall grid and will delete walls, for dfs basicly
  const visualizeFullMazeBuild = async (orderedCells, speed) => {
    console.log("generating dfs maze");
    const newGrid = [...grid];
    setGrid(newGrid);
    for (const cell of orderedCells) {
      if (cell.type === 3) {
        cell.type = 0;
        const newGrid = [...grid];
        setGrid(newGrid);
        await sleep(speed);
      }
    }
  };

  // this gets empty grid and will fill with walls
  const visualizeEmptyMazeBuild = async (orderedCells, speed) => {
    console.log("generating maze");
    for (const cell of orderedCells) {
      if (cell.type === 0 || cell.type === 99) {
        cell.type = 3;
        const newGrid = [...grid];
        setGrid(newGrid);
        if (speed !== 0) {
          await sleep(speed);
        }
      }
    }
  };
  const runVisualize = async (orderedCells, speed) => {
    for (const cell of orderedCells) {
      if (cell.type === 0 || cell.type === 99) {
        cell.type = 4;
        const newGrid = [...grid];
        setGrid(newGrid);
        await sleep(speed);
      }
    }
  };

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

  const initSrcDstCells = () => {
    for (const row of grid) {
      for (const cell of row) {
        if (cell.type === 1) {
          srcCell = cell;
        } else if (cell.type === 2) {
          dstCell = cell;
        }
      }
      if (srcCell !== undefined && dstCell !== undefined) {
        break;
      }
    }
  };
  const cleanUp = () => {
    for (const row of grid) {
      for (const cell of row) {
        if (cell.type === 4 || cell.type === 5) {
          cell.type = 0;
        }
      }
    }
  };

  useImperativeHandle(ref, () => ({
    async visualize(algoType, speed) {
      props.setIsRunning(true);
      let orderedCells = [];
      let pred = [];
      initSrcDstCells();
      cleanUp();
      switch (algoType) {
        case "a":
          [orderedCells, pred] = aStar(srcCell, dstCell, grid);
          await runVisualize(orderedCells, speed);
          await visualizePath(pred, dstCell);
          break;
        case "bfs":
          [orderedCells, pred] = bfs(srcCell, grid);
          await runVisualize(orderedCells, speed);
          await visualizePath(pred, dstCell);
          break;
        case "dfs":
          [orderedCells, pred] = dfs(srcCell, grid);
          await runVisualize(orderedCells, speed);
          await visualizePath(pred, dstCell);
          break;
        case "bi_bfs":
          [orderedCells, pred] = bi_bfs(srcCell, dstCell, grid);
          await runVisualize(orderedCells, speed);
          await visualizePath(pred, dstCell);
          break;
        default:
          console.log("Nothing is selected algo");
      }
      props.setIsRunning(false);
    },
    async generateMaze(mazeType) {
      let orderedCells = [];
      props.setIsRunning(true);
      initSrcDstCells();
      cleanUp();
      switch (mazeType) {
        case "rand":
          orderedCells = randomMaze(grid);
          // speed of maze generator is 0
          await visualizeEmptyMazeBuild(orderedCells, 0);
          break;
        case "rand_dfs":
          orderedCells = dfsMaze(grid, srcCell, dstCell);
          // speed of maze generator is 10
          await visualizeFullMazeBuild(orderedCells, 10);
          break;
        case "rand_kruskal":
          break;
        case "rand_prim":
          break;
        default:
          console.log("Nothing is selected maze");
      }
      props.setIsRunning(false);
    },
    resetPath() {
      for (const row of grid) {
        for (const cell of row) {
          if (cell.type === 5) {
            cell.type = 0;
          }
        }
      }
      const newGrid = [...grid];
      setGrid(newGrid);
    },
    resetVisitedCells() {
      for (const row of grid) {
        for (const cell of row) {
          if (cell.type === 4) {
            cell.type = 0;
          }
        }
      }
      const newGrid = [...grid];
      setGrid(newGrid);
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
      onMouseUp={handleMouseUp}
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
                    handleMouseEnter={handleMouseEnter}
                    handleMouseDown={handleMouseDown}
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
