import React, { useState } from "react";
import Select from "react-select";
import "../css/style.css";

const Header = (props) => {
  const [selectedAlgo, setSelectedAlgo] = useState("");
  const [selectedSpeed, setSelectedSpeed] = useState(-1);

  const handleAlgoSelectOnChange = (event) => {
    setSelectedAlgo(event.target.value);
  };

  const handleSpeedSelectOnChange = (event) => {
    setSelectedSpeed(event.target.value);
  };

  const handleMazeSelectOnChange = (event) => {
    if (!props.isRunning) {
      props.sendMazeData(event.target.value);
    }
  };

  const sendData = () => {
    if (!props.isRunning) {
      props.sendData(selectedAlgo, selectedSpeed);
    }
  };
  // for react-select
  const algorithms = [
    { label: "Breath-First Search", value: "bfs", className: "option" },
    { label: "Depth-First Search", value: "dfs", className: "awesome-class" },
    { label: "A Star Search", value: "a", className: "awesome-class" },
    {
      label: "Bidirectional Breath-First Search",
      value: "bi_bfs",
      className: "awesome-class",
    },
  ];

  return (
    <div className="header">
      <div>
        {/* <Select
          placeholder="Select Algorithm"
          options={algorithms}
          styles={customStyles}
        /> */}
        <select
          required
          value={selectedAlgo}
          onChange={handleAlgoSelectOnChange}
          className="select"
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
          <option className="option" value="2">
            Faster
          </option>
          <option className="option" value="25">
            Fast
          </option>
          <option className="option" value="50">
            Normal
          </option>
          <option className="option" value="125">
            Slow
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
          <option className="option" value="rand_kruskal">
            Randomized Kruskal's Algorithm
          </option>
          <option className="option" value="rand_prim">
            Randomized Prim's Algorithm
          </option>
        </select>
      </div>
      <div>
        <button onClick={props.reset} className="button">
          Reset Grid
        </button>
        <button
          className={!props.isRunning ? "button" : "button invalid"}
          onClick={sendData}
        >
          Start Visualization
        </button>
        <button
          onClick={props.resetPath}
          className={!props.isRunning ? "button" : "button invalid"}
        >
          Reset Path
        </button>
        <button
          onClick={props.resetVisitedCells}
          className={!props.isRunning ? "button" : "button invalid"}
        >
          Reset Visited Cells
        </button>
        <button
          onClick={props.resetWalls}
          className={!props.isRunning ? "button" : "button invalid"}
        >
          Reset Walls
        </button>
      </div>
    </div>
  );
};

export default Header;
