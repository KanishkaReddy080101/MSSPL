import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/UserContext';
import Select from 'react-select';
import ConfirmationPopup from "./ConfirmationPopup";
import ConfirmationResponse from './ConfirmationResponse';

function Breakdown() {
  const { user } = useContext(UserContext);
  const [batchOptions, setBatchOptions] = useState([]);
  const [reasonOptions, setReasonOptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [salesOrderNo, setSalesOrderNo] = useState('');
  const [cuttingMachine, setCuttingMachine] = useState('');
  const [bladeGRN, setBladeGRN] = useState('');
  const [bladeSqCm, setBladeSqCm] = useState('');
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedIssueDocNum, setSelectedIssueDocNum] = useState(null);
  const [issueDocNumOptions, setIssueDocNumOptions] = useState([]);
  const [batchOccurrenceCount, setBatchOccurrenceCount] = useState('')
  const [productionLogged, setProductionLogged] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const [showResponse, setShowResponse] = useState(false)
  const [postResponse, setPostResponse] = useState('')
  const [postData, setPostData] = useState({
    Branch: "",
    PostingDate: "",
    IssueBy: "",
    ProductionStartTime: "",
    BladeBatch: "",
    CutngMachineNo: "",
    SalesOrderNumber: "",
    BatchNo: "",
    ReasonBreakdown: "",
    Sqm:"",
  });
  const logProductionStartToNewRelic = (username, productionDetails) => {
    if (!productionLogged) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Api-Key", process.env.NEXT_PUBLIC_NEWRELIC_API_KEY);
  
      var logPayload = {
        timestamp: Date.now(),
        message: `User '${username}' production BreakDown with details: ${JSON.stringify(productionDetails)}`,
        logtype: "productionlogs",
        service: "production-service",
        hostname: "production.example.com"
      };
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(logPayload),
        redirect: 'follow'
      };
  
      fetch(process.env.NEXT_PUBLIC_NEWRELIC_LOG_ENDPOINT, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          setProductionLogged(true);
        })
        .catch(error => console.error('Error logging production start to New Relic:', error));
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const batchResponse = await fetch(process.env.NEXT_PUBLIC_PRODUCTIONISSUE_API_ENDPOINT + `${parseInt(user?.Branch[0].BranchCode)}`);
      const batchResult = await batchResponse.json();

      if (Array.isArray(batchResult)) {
        const options = batchResult.map((batch) => ({
          value: batch.BatchNo,
          label: batch.BatchNo,
        }));
        setBatchOptions(options);
      } else {
        console.error('Batch No API response is not an array:', batchResult);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchIssueDocNums = async (batchNo) => {
    try {
      const issueDocNumResponse = await fetch(
        process.env.NEXT_PUBLIC_PRODUCTIONISSUE_API_ENDPOINT + `${parseInt(user?.Branch[0].BranchCode)}`
      );
      const issueDocNumResult = await issueDocNumResponse.json();

      if (Array.isArray(issueDocNumResult)) {
        const filteredIssueDocNums = issueDocNumResult
        .filter((item) => item.BatchNo === batchNo)
        .map((item) => ({
          value: item.ISSUEDOCNUM,
          label: item.ISSUEDOCNUM,
        }));
      setIssueDocNumOptions(filteredIssueDocNums);
      } else {
        console.error(
          'Issue Doc Num API response is not an array:',
          issueDocNumResult
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleIssueDocNumChange = async (selectedIssueDocNum) => {
    setSelectedIssueDocNum(selectedIssueDocNum);
  
    if (selectedIssueDocNum) {
      try {
        const issueDocNumDetailsResponse = await fetch(
          process.env.NEXT_PUBLIC_PRODUCTIONISSUE_API_ENDPOINT + `${parseInt(user?.Branch[0].BranchCode)}`
        );
        const issueDocNumDetailsResult = await issueDocNumDetailsResponse.json();
  
        const selectedIssueDocNumDetails = issueDocNumDetailsResult.find(
          (item) => item.ISSUEDOCNUM === selectedIssueDocNum.value
        );
  
        if (selectedIssueDocNumDetails) {
          setSalesOrderNo(selectedIssueDocNumDetails.SalesOrder);
          setSelectedReason({
            value: selectedIssueDocNumDetails.ReasonDetails.Reason,
            label: selectedIssueDocNumDetails.ReasonDetails.Reason,
          });
          setCuttingMachine(selectedIssueDocNumDetails.MachineNo);
          setBladeGRN(selectedIssueDocNumDetails.BladeBatch);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setSalesOrderNo('');
      setSelectedReason(null);
      setCuttingMachine('');
      setBladeGRN('');
    }
  };

  const handleBatchChange = async (selectedBatch) => {
    setSelectedBatch(selectedBatch);
    setSelectedIssueDocNum(null);
    setSelectedReason(null);
  
    if (selectedBatch) {
      try {
        const reasonResponse = await fetch(
          process.env.NEXT_PUBLIC_PRODUCTIONISSUE_API_ENDPOINT + `${parseInt(user?.Branch[0].BranchCode)}`
        );
        const reasonResult = await reasonResponse.json();
        const reasonsArray = reasonResult
          .filter((reason) => reason.BatchNo === selectedBatch.value)
          .flatMap((reason) => reason.ReasonDetails.map((detail) => detail.Reason));
        const reasonOptions = reasonsArray.map((reason) => ({
          value: reason,
          label: reason,
        }));
        setReasonOptions(reasonOptions);
  
        const batchOccurrenceCount = reasonResult.filter(
          (reason) => reason.BatchNo === selectedBatch.value
        ).length;
  
        if (batchOccurrenceCount > 1) {
          fetchIssueDocNums(selectedBatch.value);
        } else {
          setIssueDocNumOptions([]);
        }
        setBatchOccurrenceCount(batchOccurrenceCount)
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setReasonOptions([]);
      setIssueDocNumOptions([]);
      setBatchOccurrenceCount(0)
    }
  };

  const handleSalesOrderChange = (selectedSalesOrder) => {
    setSalesOrderNo(selectedSalesOrder.value);
  };

  const handleCuttingMachineChange = (selectedCuttingMachine) => {
    setCuttingMachine(selectedCuttingMachine.value);
  };

  const handleBladeGRNChange = (selectedBladeGRN) => {
    setBladeGRN(selectedBladeGRN.value);
  };

  const handleReasonChange = (selectedReason) => {
    setSelectedReason(selectedReason);
  };
  

  const handleBladeSqCmChange = (event) => {
    const inputValue = event.target.value;
    const cleanedInput = inputValue.replace(/[^0-9]/g, '').slice(0, 5);
    setBladeSqCm(cleanedInput);
  };

  const autoFillDetails = async () => {
    if (selectedBatch) {
      try {
        const batchResponse = await fetch(process.env.NEXT_PUBLIC_PRODUCTIONISSUE_API_ENDPOINT + `${parseInt(user?.Branch[0].BranchCode)}`);
        const batchResult = await batchResponse.json();

        const selectedBatchDetails = batchResult.find((batch) => batch.BatchNo === selectedBatch.value);

        if (selectedBatchDetails) {
          setSalesOrderNo(selectedBatchDetails.SalesOrder);
          setCuttingMachine(selectedBatchDetails.MachineNo);
          setBladeGRN(selectedBatchDetails.BladeBatch);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    autoFillDetails();
  }, [selectedBatch]);

  const handleRecordBreakdown = () => {
    if (selectedBatch && salesOrderNo && selectedReason) {
      setPostData((prevState) => ({
        ...prevState,
        Branch: user.Branch[0].BranchCode,
        PostingDate: currentDate,
        IssueBy: user.Name,
        ProductionStartTime: currentTime,
        BladeBatch: bladeGRN,
        CutngMachineNo: cuttingMachine,
        SalesOrderNumber: salesOrderNo,
        BatchNo: selectedBatch.value,
        ReasonBreakdown: selectedReason.value,
        Sqm: bladeSqCm,
      }));

      logProductionStartToNewRelic(user.Name, postData);

    } else {
      console.error("Please select all required options before stopping production.");
    }
  };

  useEffect(() => {
    if (postData.Branch && postData.PostingDate && postData.IssueBy && postData.ProductionStartTime && postData.BladeBatch && postData.CutngMachineNo && postData.SalesOrderNumber && postData.BatchNo && postData.ReasonBreakdown) {
      setShowConfirmation(true);
      console.log(postData)
    }
  }, [postData]);

  const handleConfirmBreakdown = () => {
    fetch(process.env.NEXT_PUBLIC_GOODSRECEIPT_POST_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Production data successfully posted:", data);
        setShowConfirmation(false);
        setSelectedBatch(null);
        setSalesOrderNo('');
        setCuttingMachine('');
        setBladeGRN('');
        setBladeSqCm('');
        setPostResponse(data)
        setShowResponse(true);
      })
      .catch((error) => {
        console.error("Error posting production data:", error);
        setShowConfirmation(false);
      });
  };

  const handleOK = () => {
    setShowResponse(false);
  }
  const handleCancelProduction = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="ps-5 pe-5 pt-5">
        <div className="row pb-3">
          <div className="col">
        <div className="form-control mb-3">
            <label htmlFor="batchNo">Item Batch No</label>
            <Select
              id="batchNo"
              instanceId="batchNo"
              className="select-dropdown select-form-control"
              options={batchOptions}
              value={selectedBatch}
              onChange={handleBatchChange}
              isSearchable={true}
            />
            </div>
          </div>
          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor="jobCardNo">Sales Order No.</label>
            <input
              type="text"
              readOnly
              className="form-control"
              id="jobCardNo"
              value={salesOrderNo}
              onChange={handleSalesOrderChange}
            />
            </div>
          </div>
        </div>
        {selectedBatch && batchOccurrenceCount > 1 && (
            <div className="col">
              <div className="form-control mb-3">
              <label htmlFor="issueDocNum">Issue Doc Num</label>
              <Select
                id="issueDocNum"
                instanceId="issueDocNum"
                className="select-dropdown"
                options={issueDocNumOptions}
                value={selectedIssueDocNum}
                onChange={handleIssueDocNumChange}
                isSearchable={true}
              />
              </div>
            </div>
          )}

        <div className="row pb-3">
          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor="reasonForBreakdown">Reason for Breakdown</label>
            <Select
              id="reasonForBreakdown"
              instanceId="reasonForBreakdown"
              className="select-form-control select-dropdown"
              options={reasonOptions}
              onChange={handleReasonChange}
              isSearchable={true}
            />
            </div>
          </div>
          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor="cuttingMachine">Cutting Machine</label>
            <input
              type="text"
              readOnly
              className="form-control"
              id="cuttingMachine"
              value={cuttingMachine}
              onChange={handleCuttingMachineChange}
            />
            </div>
          </div>
        </div>

        <div className="row pb-3">
          <div className="col">
            <div className="form-floating form-control mb-3">
              <input
                type="text"
                pattern="[0-9]*"
                maxLength={5}
                className="form-control"
                id="floatingInputSqm"
                placeholder="Enter Blade SqCm consumed till Breakdown"
                value={bladeSqCm}
                onChange={handleBladeSqCmChange}
              />
              <label htmlFor="floatingInputSqm" className="form-label">
                Enter Blade SqCm consumed till Breakdown
              </label>
            </div>
          </div>
          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor="bladeGRN">Blade Batch</label>
            <input
              type="text"
              readOnly
              className="form-control"
              id="bladeGRN"
              value={bladeGRN}
              onChange={handleBladeGRNChange}
            />
            </div>
          </div>
        </div>
      </div>

      <div className="ps-5 pe-5 pt-3">
        <div className="row pb-2">
          <div className="col"></div>
          <div className="col align-self-center">
            <button 
            className="w-100 btn lg-botton mt-4 mb-4 btn btn-primary" 
            type="submit"
            onClick={handleRecordBreakdown}>
              Stop Production
            </button>
          </div>
          <div className="col"></div>
        </div>
      </div>
      {showConfirmation && (
            <ConfirmationPopup
            data={postData}
            onConfirm={handleConfirmBreakdown}
            onCancel={handleCancelProduction}
            selectedReason={selectedReason}
            sqrCmValue={bladeSqCm}
            />
          )}
          {showResponse && (
        <ConfirmationResponse data={postResponse} onOK={handleOK}/>
      )}
    </>
  );
}

export default Breakdown;
