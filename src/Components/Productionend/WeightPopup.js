import React from 'react';
import Select from "react-select";

const WeightPopup = ({ binOptions, onConfirm, onClose, onBinChange }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
      <h3>Get Weight</h3>
      <Select
        className="select-form-control select-dropdown"
        options={binOptions}
        onChange={onBinChange}
        placeholder="Select Bin"
      />
      <div className="popup-buttons">
          <button className="btn primary" onClick={onConfirm}>
            Confirm
          </button>
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
    </div>
    </div>
  );
};

export default WeightPopup;
