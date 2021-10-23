import React, { useState } from "react";
import PopupContents from "./PopupContent";
import "../css/popup.css";

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
        {counter < 4 ? (
          <button className="button popup-next" onClick={handleNext}>
            Next
          </button>
        ) : null}
        {counter > 0 ? (
          <button className="button popup-prev" onClick={handlePrev}>
            Previous
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default MyPopup;
