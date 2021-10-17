import Grid from "./components/Grid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Popup from "reactjs-popup";
import React, { useState, useRef, useEffect } from "react";

function App() {
  // this is to use the reset function from child, this can basicly use all child function
  const gridRef = useRef();
  const [rowSize, setRowSize] = useState(53);
  const [colSize, setColSize] = useState(21);
  const [open, setOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  useEffect(() => {
    setOpen((o) => !o);
    // eslint-disable-next-line
  }, []);

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

  const getDataAndSendToVisualize = (algo, speed) => {
    gridRef.current.visualize(algo, speed);
  };
  const getMazeDataAndSendToGrid = (maze) => {
    gridRef.current.generateMaze(maze);
  };
  return (
    <div className="App">
      <Popup open={open}>
        <div className="popup">
          <header className="popup-header">
            Hello and welcome to the Pathfinding Visualizer
          </header>
          <p>
            This is a quick tutorial on how to use this application.
            <br />
            First select the algorithm you wish to visualize.
            <br />
            Then you can add walls (obstacles) with left mouse click and delete
            walls with right mouse click.
            <br />
            Now press "Start Visualization" to start.
            <br /> After the visualization finishes, you can reset the grid once
            again with a click on the "Reset Grid" button.
            <br />
            Please use this application on a <b>computer</b> with{" "}
            <b>fullscreen</b> on, otherwise this wont work as intended.
            <br />
          </p>
          <p>Have Fun!</p>
        </div>
      </Popup>
      <Header
        updateRow={setRowSize}
        updateCol={setColSize}
        reset={reset}
        resetPath={resetPath}
        resetVisitedCells={resetVisitedCells}
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
      />
      <Footer />
    </div>
  );
}

export default App;
