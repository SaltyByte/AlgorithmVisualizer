import Grid from "./components/Grid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MyPopup from "./components/MyPopup";
import React, { useState, useRef } from "react";

function App() {
  // this is to use the reset function from child, this can basicly use all child function
  const gridRef = useRef();
  const [rowSize, setRowSize] = useState(53);
  const [colSize, setColSize] = useState(21);
  const [openPopup, setOpenPopup] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  // this function resets the grid, to start over.
  const reset = () => {
    setResetCounter(resetCounter + 1);
    setIsRunning(false);
    console.log("reseting");
  };

  // this function resets path.
  const resetPath = () => {
    if (!isRunning) {
      gridRef.current.resetPath();
      console.log("reseting path");
    }
  };

  // this function resets visited cells.
  const resetVisitedCells = () => {
    if (!isRunning) {
      gridRef.current.resetVisitedCells();
      console.log("reseting visited cells");
    }
  };
  // this function resets walls.
  const resetWalls = () => {
    if (!isRunning) {
      gridRef.current.resetWalls();
      console.log("reseting walls");
    }
  };

  const getDataAndSendToVisualize = (algo, speed) => {
    gridRef.current.visualize(algo, speed);
  };
  const getMazeDataAndSendToGrid = (maze) => {
    gridRef.current.generateMaze(maze);
  };
  return (
    <div className="App">
      {openPopup ? <MyPopup closePopup={setOpenPopup} /> : null}
      <Header
        updateRow={setRowSize}
        updateCol={setColSize}
        reset={reset}
        resetPath={resetPath}
        resetVisitedCells={resetVisitedCells}
        resetWalls={resetWalls}
        sendData={getDataAndSendToVisualize}
        sendMazeData={getMazeDataAndSendToGrid}
        isRunning={isRunning}
      />
      <Grid
        key={resetCounter}
        row={rowSize}
        col={colSize}
        ref={gridRef}
        setIsRunning={setIsRunning}
        isRunning={isRunning}
      />
      <Footer />
    </div>
  );
}

export default App;
