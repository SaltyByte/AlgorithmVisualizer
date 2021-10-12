import React, { useState } from "react";
import "../css/style.css";

const Header = (props) => {
  const [selectedAlgo, setSelectedAlgo] = useState("");

  const handleSelectOnChange = (event) => {
    setSelectedAlgo(event.target.value);
  };

  const sendAlgoValueToVisualize = () => {
    props.sendData(selectedAlgo);
  };

  return (
    <div className="header">
      <div>
        <select
          className="selector"
          required
          value={selectedAlgo}
          onChange={handleSelectOnChange}
        >
          <option value="" disabled hidden>
            Select Algorithm Here
          </option>
          <option className="option" value="bfs">
            Breath-First Search
          </option>
          <option className="option" value="dfs">
            Depth-First Search
          </option>
          <option className="option" value="a">
            A Star
          </option>
          <option className="option" value="floyd">
            Floyd-Warshall
          </option>
          <option className="option" value="bi_bfs">
            Bidirectional Breath-First Search
          </option>
        </select>
      </div>
      <div style={{ position: "relative" }}>
        <button className="button" onClick={sendAlgoValueToVisualize}>
          Start Pathfinding
        </button>
        <button onClick={props.reset} className="button">
          Reset Grid
        </button>
      </div>
    </div>
  );
};

export default Header;
