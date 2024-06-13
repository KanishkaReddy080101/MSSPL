import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/UserContext';

// The ConfirmationPopup component takes in props 'data', 'onConfirm', and 'onCancel'
const ConfirmationPopup = ({ data, onConfirm, onCancel }) => {
  // Using the UserContext to access the user information
  const { user, setUser } = useContext(UserContext);

  // Getting the current date and time
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Confirm Production Details</h2> {/* Popup title */}
        <div className="popup-content">
          <p>Are you sure you want to start production with the following details?</p>
          <ul>
            {user.Branch && user.Branch.length > 0 && (
              <li>
                <strong>Branch:</strong> {user.Branch[0].BranchCode} {/* Displaying branch code */}
              </li>
            )}
            {user && (
              <li>
                <strong>Issue By:</strong> {user.Name} {/* Displaying user name */}
              </li>
            )}
            <li>
              <strong>Posting Date:</strong> {currentDate} {/* Displaying current date */}
            </li>
            <li>
              <strong>Production Start Time:</strong> {currentTime} {/* Displaying current time */}
            </li>  
            <li>
              <strong>Sales Order Number:</strong> {data.SalesOrderNumber} {/* Displaying sales order number */}
            </li>
            <li>
              <strong>Line No:</strong> {data.LineNum} {/* Displaying line number */}
            </li>
            <li>
              <strong>Batch No:</strong> {data.BatchNum} {/* Displaying batch number */}
            </li>
            <li>
              <strong>Cutting Machine No:</strong> {data.MachineItemCode} {/* Displaying cutting machine number */}
            </li>
            <li>
              <strong>Blade Code:</strong> {data.BladeCode} {/* Displaying blade code */}
            </li> 
            <li>
              <strong>Blade Batch:</strong> {data.BladeBatch} {/* Displaying blade batch */}
            </li>
          </ul>
        </div>
        <div className="popup-buttons">
          <button className="btn primary" onClick={onConfirm}>
            Confirm
          </button> {/* Button to confirm the action */}
          <button className="btn secondary" onClick={onCancel}>
            Cancel
          </button> {/* Button to cancel the action */}
        </div>
      </div>
    </div>
  );
};

// Exporting the ConfirmationPopup component as default
export default ConfirmationPopup;
