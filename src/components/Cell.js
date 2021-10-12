import "../css/style.css";
import React from "react";

const preventDragHandler = (e) => {
  e.preventDefault();
};

const Cell = (props) => {
  return (
    <div
      onMouseEnter={(event) => props.handleMouse(event, props)}
      onMouseDown={(event) => props.handleMouse(event, props)}
      onDragStart={preventDragHandler}
      className={props.cellClass}
    ></div>
  );
};

export default Cell;
