import React from "react";
import "../css/popup.css";

const loadContents = (counter) => {
  switch (counter) {
    case 0:
      return (
        <div>
          <header className="popup-header">
            Hello and welcome to the Pathfinding Visualizer
          </header>
          <p>This quick tutorial will quide you how to use the application</p>
          <p>To quit the tutorial simply press outside the popup window</p>
          <p>So to get started Press the "Next" button to continue</p>
          <p>
            You can always go back to the previous page by pressing "Previous"
          </p>
          <p>
            Please use a <b>computer</b> with <b>fullscreen</b> on, else the
            application will not work as intended
          </p>
        </div>
      );
    case 1:
      return (
        <div>
          <p>Before we start, lets go over whats going on here</p>
          <p>This application will visualize few pathfinding algorithms</p>
          <p>
            Those algorithms are: Breath-First Search, Depth-First Search, A
            Star Search and Bi-Directional Search
          </p>
          <p>
            Here you can also find few maze generating algoritms which are:
            Randomized Basic Maze, Randomized Depth-First Search and Randomized
            Recursive Maze Generator
          </p>
        </div>
      );
    case 2:
      return (
        <div>
          <p>Each algorithm will show how its spreading across the grid</p>
          <p>
            When the ending point is found, the algorithm will stop spreading
            and will show the path to the ending point
          </p>
          <p>
            When no edning point is found, simply the algorithm will stop when
            theres no new cells to explore
          </p>
        </div>
      );
    case 3:
      return (
        <div>
          <p>
            Here you can move the starting and ending points by simply dragging
            with left mouse button the points around
          </p>
          <p>To add walls press the left mouse click</p>
          <p>To delete walls press right mouse click</p>
          <p>
            After you're satisfied with what you have created, choose an
            algorithm to visualize and press "Start Visualization"
          </p>
        </div>
      );
    case 4:
      return (
        <div>
          <p>
            Here you can change the speed of the algorithms, both maze
            generating algorithms and the path finding algorithms
          </p>
          <p>You can also find Reset button which will reset the whole grid</p>
          <p>Clear path & visited cells will do exactly what it says</p>
          <p>And clear walls will clear all the walls on the grid</p>
          <p>Have Fun Visualizing</p>
          <p>To start visualizing press outside the popup</p>
        </div>
      );
    default:
      return null;
  }
};

const PopupContents = (props) => {
  return <div>{loadContents(props.counter)}</div>;
};

export default PopupContents;
