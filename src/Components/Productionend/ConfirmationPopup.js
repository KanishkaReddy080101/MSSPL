import React from "react";

const ConfirmationPopup = ({ data, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Confirm Production End</h2>
        <div className="popup-content">
          <p>Are you sure you want to end production with the following details?</p>
          <ul>
            <li>
              <strong>Sales Order No.:</strong> {data.SalesOrder}
            </li>
            <li>
              <strong>Batch No.:</strong> {data.BatchNo}
            </li>
            <li>
              <strong>Grade Name:</strong> {data.GradeName}
            </li>
          </ul>
        </div>
        <div className="popup-buttons">
          <button className="btn primary" onClick={onConfirm}>
            Confirm
          </button>
          <button className="btn secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
