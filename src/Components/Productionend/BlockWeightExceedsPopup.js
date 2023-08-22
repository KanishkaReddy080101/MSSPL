import React from "react";

const BlockWeightExceededPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Block Weight Exceeded</h2>
        <p>The total weight of the pieces exceeds the block weight limit.</p>
        <div className="popup-buttons">
          <button className="btn primary" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockWeightExceededPopup;
