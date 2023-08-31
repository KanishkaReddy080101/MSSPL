import React, { useState, useEffect } from "react";

const ConfirmationResponse = ({ data, onOK }) => {
  const [lineDetailRows, setLineDetailRows] = useState([]);
  useEffect(() => {
    if (data.statusCode === 0) {
      const lineDetails = data.ReturnObject.LineDetails;

      // Create an array to store the JSX elements for each LineDetails item
      const lineDetailRows = [];
      for (let index = 0; index < lineDetails.length; index++) {
        const result = lineDetails[index];
        const isLastRow = index === lineDetails.length - 1;
        lineDetailRows.push(
          <tr key={index} className={index === lineDetails.length - 1 ? "last-row" : ""}>
            <td>{result.FinishGood}</td>
            <td className={isLastRow ? "last-cell" : ""}>{result.GoodsReceiptBatchNo}</td>
            <td>{result.BIN}</td>
            <td>{result.Dia}</td>
            <td>{result.Thickness}</td>
            <td>{result.Width}</td>
            <td>{result.Length}</td>
            <td>{result.Weight}</td>
          </tr>
        );
      }
      setLineDetailRows(lineDetailRows);
    }
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{data.statusMessage}</h2>
        <div className="popup-content">
          {data.statusCode === 1 && <p>{data.responseObject}</p>}
          {data.statusCode === 0 && (
            <div className="search-results">
              <div className="results">
                <div className="top-head">
                  <button className="close-button" onClick={onOK}>
                    Close
                  </button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Finish Good</th>
                      <th>Batch No</th>
                      <th>Bin</th>
                      <th>Dia</th>
                      <th>Thickness</th>
                      <th>Width</th>
                      <th>Length</th>
                      <th>Weight</th>
                    </tr>
                  </thead>
                  <tbody className="result-search-result">{lineDetailRows}</tbody>
                </table>
              </div>
            </div>
          )}
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
