import React, { useState } from "react";
import PopupContents from "./PopupContent";

const MyPopup = (props) => {
  const [counter, setCounter] = useState(0);

  const closePopup = () => {
    props.closePopup(false);
  };

  return (
    <div>
      <div className="popup" onClick={closePopup}></div>
      <div className="popup-inner">
        <PopupContents counter={counter} />
        <button
          className="button popup-next"
          onClick={() => setCounter(counter + 1)}
        >
          Next
        </button>
        <button
          className="button popup-prev"
          onClick={() => setCounter(counter - 1)}
        >
          Previous
        </button>
      </div>
    </div>
  );
};

export default MyPopup;
