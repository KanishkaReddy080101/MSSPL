import React from "react";

// The ConfirmationResponse component takes in props 'data' and 'onOK'
const ConfirmationResponse = ({ data, onOK }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{data.statusMessage}</h2> {/* Display the status message */}
        <div className="popup-content">
          <p>{data.responseObject}</p> {/* Display the response object */}
        </div>
        <div className="popup-buttons">
          <button className="btn primary" onClick={onOK}>
            OK
          </button> {/* Button to acknowledge the response */}
        </div>
      </div>
    </div>
  );
};

// Exporting the ConfirmationResponse component as default
export default ConfirmationResponse;
