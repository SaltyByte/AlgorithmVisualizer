import Grid from "./components/Grid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useState, useRef } from "react";

function App() {
  // this is to use the reset function from child, this can basicly use all child function
  const gridRef = useRef();
  const [rowSize, setRowSize] = useState(53);
  const [colSize, setColSize] = useState(21);
  const [resetCounter, setResetCounter] = useState(0);

  // this function resets the grid, to start over.
  const reset = () => {
    setResetCounter(resetCounter + 1);
  };

  const getAlgoDataAndSendToVisualize = (value) => {
    gridRef.current.visualize(value);
  };
  return (
    <div className="App">
      <Header
        updateRow={setRowSize}
        updateCol={setColSize}
        reset={reset}
        sendData={getAlgoDataAndSendToVisualize}
      />
      <Grid key={resetCounter} row={rowSize} col={colSize} ref={gridRef} />
      <Footer />
    </div>
  );
}

export default App;
