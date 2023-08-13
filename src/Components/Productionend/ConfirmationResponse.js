import React from "react";

const ConfirmationResponse = ({ data, onOK }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{data.statusMessage}</h2>
        <div className="popup-content">
          { data.statusCode === 1 && 
          <p>{data.responseObject}</p>
          }
          { data.statusCode === 0 && 
          <div className='search-results'>
          <div className='results'>
              <table>
                <thead>
                  <tr>
                    <th>Is Finish Good</th>
                    <th>Goods Receipt Batch No</th>
                    <th>Bin</th>
                    <th>Dia</th>
                    <th>Thickness</th>
                    <th>Width</th>
                    <th>Length</th>
                    <th>Weight</th>
                    <th>Weight</th> 
                  </tr>
                </thead>
                <tbody className='result-search-result'>
                  {data.ReturnObject.LineDetails.map((result, index) => (
                    <tr key={index}>
                      <td>{result.FinishGood}</td>
                      <td>{result.GoodsReceiptBatchNo}</td>
                      <td>{result.BIN}</td>
                      <td>{result.Dia}</td>
                      <td>{result.Thickness}</td>
                      <td>{result.Width}</td>
                      <td>{result.Length}</td>
                      <td>{result.Weight}</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
          }
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
