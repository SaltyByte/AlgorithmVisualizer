import React from "react";

const loadContents = (counter) => {
  switch (counter) {
    case 0:
      return (
        <div>
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
      );
    case 1:
      return (
        <div>
          <p>testing 1</p>
        </div>
      );
    case 2:
      return (
        <div>
          <p>testing 2</p>
        </div>
      );
    case 3:
      return (
        <div>
          <p>testing 3</p>
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
