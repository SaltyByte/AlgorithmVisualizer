import React, { useState } from "react";
// import Select from "react-select";
import "../css/styles.css";

/* <Select
          placeholder="Select Algorithm"
          options={algorithms}
          styles={customStyles}
        /> */

// for react-select
// const algorithms = [
//   { label: "Breath-First Search", value: "bfs", className: "option" },
//   { label: "Depth-First Search", value: "dfs", className: "awesome-class" },
//   { label: "A Star Search", value: "a", className: "awesome-class" },
//   {
//     label: "Bidirectional Breath-First Search",
//     value: "bi_bfs",
//     className: "awesome-class",
//   },
// ];

const Header = (props) => {
  const [selectedAlgo, setSelectedAlgo] = useState("");
  const [selectedSpeed, setSelectedSpeed] = useState(5);
  const [algorithmAlert, setAlgorithmAlert] = useState(false);

  const handleAlgoSelectOnChange = (event) => {
    setSelectedAlgo(event.target.value);
  };

  const handleSpeedSelectOnChange = (event) => {
    console.log(event.target.value);
    setSelectedSpeed(event.target.value);
  };

  const handleMazeSelectOnChange = (event) => {
    if (!props.isRunning) {
      props.sendMazeData(event.target.value, selectedSpeed);
    }
  };

  const handleStart = () => {
    if (selectedAlgo.length === 0) {
      setAlgorithmAlert(true);
    } else if (!props.isRunning) {
      props.sendData(selectedAlgo, selectedSpeed);
    }
  };
  return (
    <div className="header">
      <div>
        <select
          required
          value={selectedAlgo}
          onChange={handleAlgoSelectOnChange}
          className={algorithmAlert ? "select alert" : "select"}
          onAnimationEnd={() => setAlgorithmAlert(false)}
        >
          <option value="" disabled hidden>
            Select Algorithm
          </option>
          <option className="option" value="bfs">
            Breath-First Search
          </option>
          <option className="option" value="dfs">
            Depth-First Search
          </option>
          <option className="option" value="a">
            A Star Search
          </option>
          <option className="option" value="bi_bfs">
            Bidirectional Breath-First Search
          </option>
        </select>
        <select
          required
          value={selectedSpeed}
          onChange={handleSpeedSelectOnChange}
          className={!props.isRunning ? "select" : "select invalid"}
        >
          <option className="option" value="5">
            Faster
          </option>
          <option className="option" value="15">
            Fast
          </option>
          <option className="option" value="50">
            Normal
          </option>
          <option className="option" value="100">
            Slow
          </option>
          <option className="option" value="-1">
            Instant
          </option>
        </select>
        <select
          value={""}
          onChange={handleMazeSelectOnChange}
          className={!props.isRunning ? "select" : "select invalid"}
        >
          <option value="" disabled hidden>
            Select Maze Generator
          </option>
          <option className="option" value="rand">
            Random Maze
          </option>
          <option className="option" value="rand_dfs">
            Randomized Depth-First Search Algorithm
          </option>
          {/* <option className="option" value="rand_kruskal">
            Randomized Kruskal's Algorithm
          </option>
          <option className="option" value="rand_prim">
            Randomized Prim's Algorithm
          </option> */}
          <option className="option" value="rec">
            Recursive Division Algorithm
          </option>
        </select>
      </div>
      <div className="button-div">
        <button onClick={props.reset} className="button reset">
          Reset
        </button>
        <button
          onClick={props.clearPathAndVisitedCells}
          className={!props.isRunning ? "button" : "button invalid"}
        >
          Clear Path & Visited Cells
        </button>
        <button
          className={!props.isRunning ? "button start" : "button invalid"}
          onClick={handleStart}
        >
          Start Visualization
        </button>
        <button
          onClick={props.resetWalls}
          className={!props.isRunning ? "button" : "button invalid"}
        >
          Clear Walls
        </button>
      </div>
    </div>
  );
};

export default Header;
