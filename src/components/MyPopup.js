import React, { useState } from "react";
import PopupContents from "./PopupContent";
import "../css/styles.css";

const MyPopup = (props) => {
  const [counter, setCounter] = useState(0);

  const closePopup = () => {
    props.closePopup(false);
  };
  const handleNext = () => {
    if (counter < 4) {
      setCounter(counter + 1);
    }
  };
  const handlePrev = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div>
      <div className="popup" onClick={closePopup}></div>
      <div className="popup-inner">
        <PopupContents counter={counter} />
        <button className="button popup-next" onClick={handleNext}>
          Next
        </button>
        <button className="button popup-prev" onClick={handlePrev}>
          Previous
        </button>
      </div>
    </div>
  );
};

export default MyPopup;
