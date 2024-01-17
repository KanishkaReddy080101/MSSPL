import React from 'react';
import Select from "react-select";

const WeightPopup = ({ bayOptions, onConfirm, onClose, onBayChange }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
      <h3>Get Weight</h3>
      <Select
        className="select-form-control select-dropdown"
        options={bayOptions}
        onChange={onBayChange}
        placeholder="Select Bay"
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
