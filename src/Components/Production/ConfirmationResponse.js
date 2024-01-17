import React from "react";

const ConfirmationResponse = ({ data, onOK }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{data.statusMessage}</h2>
        <div className="popup-content">
          <p>{data.responseObject}</p>
        </div>
        <div className="popup-buttons">
          <button className="btn primary" onClick={onOK}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationResponse;
