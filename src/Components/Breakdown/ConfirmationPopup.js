import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/UserContext';

const ConfirmationPopup = ({ data, onConfirm, onCancel, sqrCmValue }) => {
    const { user, setUser } = useContext(UserContext);
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Confirm Record Breakdown</h2>
        <div className="popup-content">
          <p>Are you sure you want to Stop Production with the following details?</p>
          <ul>
          {user.Branch && user.Branch.length > 0 && (
                <li>
                    <strong>Branch:</strong> {user.Branch[0].BranchCode}
                </li>
              )}
            <li>
              <strong>Posting Date:</strong> {currentDate}
            </li>
            {user && (
                <li>
                    <strong>Issue By:</strong> {user.Name}
                </li>
              )}
            <li>
              <strong>Record Breakdown Start Time:</strong> {currentTime}
            </li>
            <li>
              <strong>Blade Batch:</strong> {data.BladeBatch}
            </li>
            <li>
              <strong>Cutting Machine No:</strong> {data.CutngMachineNo}
            </li>
            <li>
              <strong>Sales Order Number:</strong> {data.SalesOrderNumber}
            </li>
            <li>
              <strong>Reason:</strong> {data.ReasonBreakdown}
            </li>
            <li>
            <strong>Square Centimeter Consumed:</strong> {sqrCmValue} sqr cm
            </li>
          </ul>
        </div>
        <div className="popup-buttons">
          <button className="btn primary" onClick={onConfirm}>
            Confirm Breakdown
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
