import React, { useState, useEffect } from "react";

const ConfirmationResponse = ({ data, onOK }) => {
    const [lineDetailRows, setLineDetailRows] = useState([]);
    useEffect(() => {
        if (data.statusCode === 0) {
            if (data.statusMessage != null) {
                const lineDetails = data.ReturnObject.LineDetails;

                // Create an array to store the JSX elements for each LineDetails item
                const lineDetailRows = [];
                for (let index = 0; index < lineDetails.length; index++) {
                    const result = lineDetails[index];
                    lineDetailRows.push(
                        <tr
                            key={index}
                            className={
                                lineDetails.length > 1 &&
                                index === lineDetails.length - 1
                                    ? "last-row"
                                    : ""
                            }
                        >
                            <td>{result.FinishGood}</td>
                            <td className="last-cell">
                                {result.GoodsReceiptBatchNo}
                            </td>
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
            } else {
                let popupContent = document.getElementById(
                    "confirmationContent"
                );
                popupContent.innerHTML =
                    "<p>Something went Wrong. Contact your Admin </p>";
            }
        }
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>{data.statusMessage}</h2>
                <div className="popup-content" id="confirmationContent">
                    {data.statusCode === 1 && <p>{data.responseObject}</p>}
                    {data.statusCode === 0 && (
                        <div className="search-results">
                            <div className="results">
                                <div className="top-head-end">
                                    <button
                                        className="close-button-end"
                                        onClick={onOK}
                                    >
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
                                    <tbody className="result-search-result">
                                        {lineDetailRows}
                                    </tbody>
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
