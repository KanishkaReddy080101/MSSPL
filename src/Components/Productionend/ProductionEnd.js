import React, { useContext, useState, useEffect } from 'react';
import Select from "react-select";
import { UserContext } from '@/UserContext';
import ConfirmationPopup from "./ConfirmationPopup";
import ConfirmationResponse from './ConfirmationResponse';
// const PROXY_URL = 'http://localhost:8080/';

function ProductionEnd() {
  const { user, setUser } = useContext(UserContext);
  const [isMultiplePieces, setIsMultiplePieces] = useState(false);
  const [numberOfPieces, setNumberOfPieces] = useState('');
  const [isMultiplePieces2, setIsMultiplePieces2] = useState(false);
  const [numberOfPieces2, setNumberOfPieces2] = useState('');
  const [salesOrderOptions, setSalesOrderOptions] = useState('');
  const [selectedBatchNoOption, setSelectedBatchNoOption] = useState('');
  const [batchNoOptions, setBatchNoOptions] = useState([]);
  const [gradeName, setGradeName] = useState("");
  const [cuttingMachine, setCuttingMachine] = useState("");
  const [grnNo, setGrnNo] = useState("");
  const [lineNo, setlineNo] = useState("");
  const [BladeBatch, setBladeBatch] = useState("");
  const [BladeCode, setBladeCode] = useState('');
  const [warehouse, setWarehouse] = useState("");
  const [blockWeight, setBlockWeight] = useState("")
  const [startTime, setStartTime] = useState("")
  const [startDate, setStartDate] = useState("")
  const [Dia, setDia] = useState(1);
  const [Length, setLength] = useState("");
  const [Width, setWidth] = useState("");
  const [Thickness, setThickness] = useState("");
  const [Weight, setWeight] = useState("")
  const [Dia2, setDia2] = useState(1);
  const [reasonOptions, setReasonOptions] = useState([]);
  const [Length2, setLength2] = useState("");
  const [Width2, setWidth2] = useState("");
  const [Thickness2, setThickness2] = useState("");
  const [Weight2, setWeight2] = useState("")
  const [binOptions, setBinOptions] = useState([]);
  const [selectedBinOption, setSelectedBinOption] = useState(null);
  const [binOptions2, setBinOptions2] = useState([]);
  const [selectedBinOption2, setSelectedBinOption2] = useState(null);
  const [finishGood1, setFinishGood1] = useState(false);
  const [finishGood2, setFinishGood2] = useState(false);
  const [selectedIssueDocNum, setSelectedIssueDocNum] = useState(null);
    const [issueDocNumOptions, setIssueDocNumOptions] = useState([]);
  const [batchOccurrenceCount, setBatchOccurrenceCount] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResponse, setShowResponse] = useState(false)
  const [postResponse, setPostResponse] = useState('')
  const [postData, setPostData] = useState('');
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


  let GET_PRODUCTIONISSUE_API="http://localhost:3000/api/Master/GetProductionIssue?";
  let GET_PRODUCTIONISSUE_BATCH="Batch=";
  let GET_PRODUCTIONISSUE_BATCH_VALUE="";
  let GET_PRODUCTIONISSUE_WHSCODE="&WhsCode=";
  let GET_PRODUCTIONISSUE_WHSCODE_VALUE="";
  let GET_PRODUCTIONISSUE_BRANCH="&Branch=";
  let GET_PRODUCTIONISSUE_BRANCH_VALUE=parseInt(user.Branch[0].BranchCode);

  const getBinOptions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api-7071/Master/BinMasterData?Branch=${parseInt(user.Branch[0].BranchCode)}`);
      const result = await response.json();
      const binOptions = result.responseObject.map((bin) => ({
        value: bin["Bin Code"],
        label: bin["Bin Name"]
      }));
      setBinOptions(binOptions);
      setBinOptions2(binOptions);
      if (finishGood1 === true) {
        if (parseInt(user.Branch[0].BranchCode) === 3) {
          setSelectedBinOption({ value: 'W005', label: 'W005'})
        } else if (parseInt(user.Branch[0].BranchCode) === 5) {
          setSelectedBinOption({ value: 'W009', label: 'W009'})
        } else if (parseInt(user.Branch[0].BranchCode) === 7) {
          setSelectedBinOption({ value: 'W013', label: 'W013'})
        } else if (parseInt(user.Branch[0].BranchCode) === 6) {
          setSelectedBinOption({ value: 'W017', label: 'W017'})
        }
      }
      if (finishGood2 === true) {
        if (parseInt(user.Branch[0].BranchCode) === 3) {
          setSelectedBinOption2({ value: 'W005', label: 'W005'})
        } else if (parseInt(user.Branch[0].BranchCode) === 5) {
          setSelectedBinOption2({ value: 'W009', label: 'W009'})
        } else if (parseInt(user.Branch[0].BranchCode) === 7) {
          setSelectedBinOption2({ value: 'W013', label: 'W013'})
        } else if (parseInt(user.Branch[0].BranchCode) === 6) {
          setSelectedBinOption2({ value: 'W017', label: 'W017'})
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getBinOptions();
  }, []);

  const handleBinChange = (e) => {
    
    if (finishGood1 === true) {
      if (parseInt(user.Branch[0].BranchCode) === 3) {
        setSelectedBinOption({ value: 'W005', label: 'W005'})
      } else if (parseInt(user.Branch[0].BranchCode) === 5) {
        setSelectedBinOption({ value: 'W009', label: 'W009'})
      } else if (parseInt(user.Branch[0].BranchCode) === 7) {
        setSelectedBinOption({ value: 'W013', label: 'W013'})
      } else if (parseInt(user.Branch[0].BranchCode) === 6) {
        setSelectedBinOption({ value: 'W017', label: 'W017'})
      }
    } else {
      setSelectedBinOption(e);
    }
  };
  const handleBinChange2 = (e) => {
   
    if (finishGood2 === true) {
      if (parseInt(user.Branch[0].BranchCode) === 3) {
        setSelectedBinOption2({ value: 'W005', label: 'W005'})
      } else if (parseInt(user.Branch[0].BranchCode) === 5) {
        setSelectedBinOption2({ value: 'W009', label: 'W009'})
      } else if (parseInt(user.Branch[0].BranchCode) === 7) {
        setSelectedBinOption2({ value: 'W013', label: 'W013'})
      } else if (parseInt(user.Branch[0].BranchCode) === 6) {
        setSelectedBinOption2({ value: 'W017', label: 'W017'})
      }
    } else {
    setSelectedBinOption2(e);
    }
  };

const batchNo = async () => {
    try {
      const response = await fetch(GET_PRODUCTIONISSUE_API+GET_PRODUCTIONISSUE_BATCH+GET_PRODUCTIONISSUE_BATCH_VALUE+GET_PRODUCTIONISSUE_WHSCODE+GET_PRODUCTIONISSUE_WHSCODE_VALUE+GET_PRODUCTIONISSUE_BRANCH+GET_PRODUCTIONISSUE_BRANCH_VALUE);
      const result = await response.json();
      const batchNo = result.map((param) => ({
        value: param["BatchNo"],
        label: param["BatchNo"],
        salesOrderOptions: param["SalesOrder"],
        ItemName: param["ItemName"],
        cuttingMachine: param["MachineNo"],
        grnNo: param["ITEMCODE"],
        BladeCode: param['BladeCode'],
        lineNo: param['LineNum'],
        warehouse: param["WhsCode"],
        blockWeight: param["ISSUEQTY"],
        startTime: param["StartTime"],
        startDate: param["StartDate"],
        Dia: param["Dia"],
        Length: param["Length"],
        Width: param["Width"],
        Thickness: param["Thickness"],
        Weight: param["Weight"],
        Dia2: param["Dia"],
        Length2: param["Length"],
        Width2: param["Width"],
        Thickness2: param["Thickness"],
        Weight2: param["Weight"],
        BladeBatch: param["BladeBatch"],
        Bin: param['Bin'],
        Bin2: param['Bin'],
        BladeCode: param['BladeCode'],
      }));
      setBatchNoOptions(batchNo);
    } catch (error) {
      console.log("error", error);
    }
  };

const fetchIssueDocNums = async (batchNo) => {
  try {
    const issueDocNumResponse = await fetch(
      `${GET_PRODUCTIONISSUE_API}${GET_PRODUCTIONISSUE_BATCH}${batchNo}${GET_PRODUCTIONISSUE_WHSCODE}${GET_PRODUCTIONISSUE_WHSCODE_VALUE}${GET_PRODUCTIONISSUE_BRANCH}${GET_PRODUCTIONISSUE_BRANCH_VALUE}`
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
      console.log('docnum', issueDocNumOptions)
      console.log(finishGood1)
      
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
        `${GET_PRODUCTIONISSUE_API}${GET_PRODUCTIONISSUE_BATCH}${selectedBatchNoOption.value}${GET_PRODUCTIONISSUE_WHSCODE}${GET_PRODUCTIONISSUE_WHSCODE_VALUE}${GET_PRODUCTIONISSUE_BRANCH}${GET_PRODUCTIONISSUE_BRANCH_VALUE}`
      );
      const issueDocNumDetailsResult = await issueDocNumDetailsResponse.json();

      const selectedIssueDocNumDetails = issueDocNumDetailsResult.find(
        (item) => item.ISSUEDOCNUM === selectedIssueDocNum.value
      );

      if (selectedIssueDocNumDetails) {
        setSalesOrderOptions(selectedIssueDocNumDetails.SalesOrder);
        setGradeName(selectedIssueDocNumDetails.ItemName);
      setGrnNo(selectedIssueDocNumDetails.ITEMCODE);
      setWarehouse(selectedIssueDocNumDetails.WhsCode);
      setBladeBatch(selectedIssueDocNumDetails.BladeBatch);
      setBladeCode(selectedIssueDocNumDetails.BladeCode);
      setCuttingMachine(selectedIssueDocNumDetails.MachineNo);
      setBlockWeight(selectedIssueDocNumDetails.ISSUEQTY);
      setStartTime(selectedIssueDocNumDetails.StartTime);
      setStartDate(selectedIssueDocNumDetails.StartDate)
      setDia(selectedIssueDocNumDetails.Dia);
      setWidth(selectedIssueDocNumDetails.Width);
      setLength(selectedIssueDocNumDetails.Length);
      setThickness(selectedIssueDocNumDetails.Thickness);
      setWeight(selectedIssueDocNumDetails.Weight);
      setDia2(selectedIssueDocNumDetails.Dia);
      setWidth2(selectedIssueDocNumDetails.Width);
      setLength2(selectedIssueDocNumDetails.Length);
      setThickness2(selectedIssueDocNumDetails.Thickness);
      setWeight2(selectedIssueDocNumDetails.Weight);
      setBladeBatch(selectedIssueDocNumDetails.BladeBatch);
      setSelectedBinOption(finishGood1 === true? selectedBinOption : {value: selectedIssueDocNumDetails.Bin, label: selectedIssueDocNumDetails.Bin});
      setlineNo(selectedIssueDocNumDetails.LineNum);
      setSelectedBinOption2(finishGood2 === true ? selectedBinOption2 : {value: selectedIssueDocNumDetails.Bin, label: selectedIssueDocNumDetails.Bin})
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
    useEffect(() => {
    batchNo();
  }, []);

  const handleBatchNoChange = async (selectedBatchNoOption) => {
    setSelectedBatchNoOption(selectedBatchNoOption);
    setSelectedIssueDocNum(null);

    const selectedBatchNo = batchNoOptions.find((order) => order.value === selectedBatchNoOption.value);
    if (selectedBatchNo) {
      try {
        const reasonResponse = await fetch(
          `${GET_PRODUCTIONISSUE_API}${GET_PRODUCTIONISSUE_BATCH}${GET_PRODUCTIONISSUE_BATCH_VALUE}${GET_PRODUCTIONISSUE_WHSCODE}${GET_PRODUCTIONISSUE_WHSCODE_VALUE}${GET_PRODUCTIONISSUE_BRANCH}${GET_PRODUCTIONISSUE_BRANCH_VALUE}`
        );
        const reasonResult = await reasonResponse.json();
      
          const reasonsArray = reasonResult
            .filter((reason) => reason.BatchNo === selectedBatchNo.value)
            .flatMap((reason) =>
              reason.ReasonDetails.map((detail) => detail.Reason)
            );
          const reasonOptions = reasonsArray.map((reason) => ({
            value: reason,
            label: reason,
          }));
          setReasonOptions(reasonOptions);
      
          const batchOccurrenceCount = reasonResult.filter(
            (reason) => reason.BatchNo === selectedBatchNo.value
          ).length;
      
          if (batchOccurrenceCount > 0) {
            fetchIssueDocNums(selectedBatchNo.value);
          } else {
            setIssueDocNumOptions([]);
          }
          setBatchOccurrenceCount(batchOccurrenceCount);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setIssueDocNumOptions([]);
      setBatchOccurrenceCount(0)
    }
  };

  useEffect(() => {
    handleBatchNoChange();
  }, []);

  const handleMultiplePiecesChange = (e) => {
    setIsMultiplePieces(e.target.checked);
    setNumberOfPieces('');
  };

  const handleMultiplePiecesChange2 = (e) => {
    setIsMultiplePieces2(e.target.checked);
    setNumberOfPieces2('');
  };

  const handleNumberOfPiecesChange = (e) => {
    setNumberOfPieces(e.target.value);
  };

  const handleNumberOfPiecesChange2 = (e) => {
    setNumberOfPieces2(e.target.value);
  };

  const handleEndProduction = () => {
    if (selectedBatchNoOption) {
      const lineDetails = [];
      
      for (let i = 0; i < (isMultiplePieces ? numberOfPieces : 1); i++) {
      lineDetails.push({
        Weight: Weight ? Weight : 1,
        Dia: Dia ? Dia : 1,
        Length: Length ? Length : 1,
        Thickness: Thickness ? Thickness : 1,
        Bin: selectedBinOption.value,
        Width: Width ? Width : 1,
        NoofPieces: isMultiplePieces ? numberOfPieces : 1,
        FinishGood: finishGood1,
      });
    }
  
      if (!Weight2 == '') {
        for (let i = 0; i < (isMultiplePieces2 ? numberOfPieces2 : 1); i++) {
        lineDetails.push({
          Weight: Weight2 ? Weight2 : 1,
          Dia: Dia2 ? Dia2 : 1,
          Length: Length2 ? Length2 : 1,
          Thickness: Thickness2 ? Thickness2 : 1,
          Bin: selectedBinOption2.value,
          Width: Width2 ? Width2 : 1,
          NoofPieces: isMultiplePieces2 ? numberOfPieces : 1,
          FinishGood: finishGood2,
        });
      }
      }

      const postData = {
        Branch: parseInt(user.Branch[0].BranchCode),
        Series: 216,
        GISeries: 220,
        PostingDate: currentDate,
        IssueBy: user.Name,
        ProductionEndTime: currentTime,
        BladeCode: BladeCode,
        BladeBatch: BladeBatch,
        CuƫngMachineNo: cuttingMachine,
        SalesOrderNumber: salesOrderOptions,
        LineNum: lineNo,
        BatchNum: selectedBatchNoOption.value,
        ItemCode: grnNo,
        LineDetails: lineDetails,
      };

      setPostData(postData);
      setShowConfirmation(true);
      console.log(postData)
    } else {
      console.error("Please select all required options before stopping production.");
    }
  };

  const handleConfirmEndProduction = () => {
    fetch(`http://localhost:3000/api-7689/MiscIssue/AddGoodsReceiptGoodsIssue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Production data successfully posted:", data);
        setPostResponse(data);
        setShowConfirmation(false);
        setShowResponse(true);
      })
      .catch((error) => {
        console.error("Error posting production data:", error);
        setShowConfirmation(false);
      });
  };

  const handleCancelEndProduction = () => {
    setShowConfirmation(false);
  };

  const handleOK = () => {
    setShowResponse(false);
  }

  const Checked1 = () => {
    console.log(finishGood1);
    setFinishGood1(!finishGood1);
    if (parseInt(user.Branch[0].BranchCode) === 3) {
      setSelectedBinOption({ value: 'W005', label: 'W005'})
    } else if (parseInt(user.Branch[0].BranchCode) === 5) {
      setSelectedBinOption({ value: 'W009', label: 'W009'})
    } else if (parseInt(user.Branch[0].BranchCode) === 7) {
      setSelectedBinOption({ value: 'W013', label: 'W013'})
    } else if (parseInt(user.Branch[0].BranchCode) === 6) {
      setSelectedBinOption({ value: 'W017', label: 'W017'})
    }
  };
  
  const Checked2 = () => {
    console.log(finishGood2);
    setFinishGood2(!finishGood2);
    if (parseInt(user.Branch[0].BranchCode) === 3) {
      setSelectedBinOption2({ value: 'W005', label: 'W005'})
    } else if (parseInt(user.Branch[0].BranchCode) === 5) {
      setSelectedBinOption2({ value: 'W009', label: 'W009'})
    } else if (parseInt(user.Branch[0].BranchCode) === 7) {
      setSelectedBinOption2({ value: 'W013', label: 'W013'})
    } else if (parseInt(user.Branch[0].BranchCode) === 6) {
      setSelectedBinOption2({ value: 'W017', label: 'W017'})
    }
  };
  
  

  return (
    <>
      <div className="ps-5 pe-5 pt-5">
        <div className="row pb-3">
        <div className="col">
            <label htmlFor="batchNo">Item Batch No</label>
            <Select
              id="batchNo"
              instanceId="batchNo"
              className={"select-form-control select-dropdown"}
              options={batchNoOptions}
              value={selectedBatchNoOption}
              onChange={handleBatchNoChange}
              isSearchable={true}
            />
          </div>
          {/* {console.log(batchOccurrenceCount, 'batchoccrcont')} */}
          {selectedBatchNoOption && (
            <div className="col">
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
          )}
          <div className="col">
          <div className="form-control mb-3">
              <label htmlFor="floatingInputBin">Sales Order No.</label>
              <input
                type="text"
                className="form-control"
                id="floatingInputBin"
                value={salesOrderOptions}
                onChange={(e) => setSalesOrderOptions(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row pb-3">
          <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="floatingInputGrn">Item Code</label>
              <input
                type="text"
                className="form-control"
                id="floatingInputGrn"
                value={grnNo}
                onChange={(e) => setGrnNo(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="blockWeight">Block Weight</label>
              <input
                type="text"
                className="form-control"
                id="blockWeight"
                value={blockWeight}
                onChange={(e) => setBlockWeight(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row pb-3">
        <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="cuttingMachine">Cutting Machine</label>
              <input
                type="text"
                className="form-control"
                id="cuttingMachine"
                value={cuttingMachine}
                onChange={(e) => setCuttingMachine(e.target.value)}
              />
            </div>
          </div>
        <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="gadeName">Blade Name</label>
              <input
                type="text"
                className="form-control"
                id="gadeName"
                value={gradeName}
                onChange={(e) => setGradeName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row pb-3">
        <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="bladeBatch">Blade Batch</label>
              <input
                type="text"
                className="form-control"
                id="bladeBatch"
                value={BladeBatch}
                onChange={(e) => setBladeBatch(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="floatingInputWareHouse">Warehouse</label>
              <input
                type="text"
                className="form-control"
                id="floatingInputWareHouse"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row pb-3">
        <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="text"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="text"
                className="form-control"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ps-5 pe-5 pt-5">
        <div className="row pb-2">
          <div className="col">
            <p className="text-center">Balance Piece -1</p>
          </div>
          <div className="col"></div>
          <div className="col">
            <p className="text-center">Balance Piece -2</p>
          </div>
        </div>

        <div className="row pb-2">
          <div className="col">
            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputDia1" 
              placeholder="Dia" 
              value={Dia}
              onChange={(e) => setDia(e.target.value)}
              disabled
              />
              <label htmlFor="floatingInputDia1" className="form-label">
                Dia
              </label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputThickness1" 
              placeholder="Thickness" 
              value={Thickness}
              onChange={(e) => setThickness(e.target.value)}
              disabled={Dia > 1.00}
              />
              <label htmlFor="floatingInputThickness1" className="form-label">
                Thickness
              </label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputWidth1" 
              placeholder="Width" 
              value={Width}
              onChange={(e) => setWidth(e.target.value)}
              disabled={Dia > 1.00}
              />
              <label htmlFor="floatingInputWidth1" className="form-label">
                Width
              </label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputLength1" 
              placeholder="Length" 
              value={Length}
              onChange={(e) => setLength(e.target.value)}
              
              />
              <label htmlFor="floatingInputLength1" className="form-label">
                Length
              </label>
            </div>

            <div className="form-floating mb-3">
            {/* <label htmlFor="binSelect">Bin Location</label> */}
            <Select
              id="binSelect"
              instanceId="binSelect"
              className="select-form-control select-dropdown"
              options={binOptions}
              value={selectedBinOption}
              onChange={handleBinChange}
              isDisabled={finishGood1 === true}
            />
          </div>

            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputWeight1" 
              placeholder="Weight" 
              value={Weight}
              onChange={(e) => setWeight(e.target.value)}
              />
              <label htmlFor="floatingInputWeight1" className="form-label">
                Weight(Kg)
              </label>
            </div>

            <div className="fform-floating mb-3 orm-check form-switch">
              <input className="form-check-input" type="checkbox" id="multiplePieces1" onChange={handleMultiplePiecesChange} />
              <label className="form-check-label" htmlFor="multiplePieces1">
                Multiple Pieces
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInputPiece1"
                placeholder="No. Of Pieces"
                disabled={!isMultiplePieces}
                value={numberOfPieces}
                onChange={handleNumberOfPiecesChange}
              />
              <label htmlFor="floatingInputPiece1" className="form-label">
                No. Of Pieces
              </label>
            </div>

            <div className="chck-box">
              <input type="checkbox" className="" id="finishGood1Checkbox" 
              checked={finishGood1}
              onChange={Checked1}/>
              <label htmlFor="finishGood1Checkbox" className=""
              >
                Finish Good
              </label>
            </div>
          </div>
          <div className="col align-self-center"></div>
          <div className="col">
            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputDia2" 
              placeholder="Dia" 
              value={Dia2}
              onChange={(e) => setDia2(e.target.value)}
              disabled
              />
              <label htmlFor="floatingInputDia2" className="form-label">
                Dia
              </label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputThickness2" 
              placeholder="Thickness" 
              value={Thickness2}
              onChange={(e) => setThickness2(e.target.value)}
              disabled={Dia2 > 1}
              />
              <label htmlFor="floatingInputThickness2" className="form-label">
                Thickness
              </label>
            </div>


            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputWidth2" 
              placeholder="Width" 
              value={Width2}
              onChange={(e) => setWidth2(e.target.value)}
              disabled={Dia2 > 1}
              />
              <label htmlFor="floatingInputWidth2" className="form-label">
                Width
              </label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputLength2" 
              placeholder="Length" 
              value={Length2}
              onChange={(e) => setLength2(e.target.value)}
              
              />
              <label htmlFor="floatingInputLength2" className="form-label">
                Length
              </label>
            </div>

            <div className="form-floating mb-3">
            {/* <label htmlFor="binSelect2">Bin Location</label> */}
            <Select
              id="binSelect2"
              instanceId="binSelect2"
              className={"select-form-control select-dropdown"}
              options={binOptions2}
              value={selectedBinOption2}
              onChange={handleBinChange2}
              isDisabled={finishGood2 === true}
            />
          </div>

            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputWeight2" 
              placeholder="Weight" 
              value={Weight2}
              onChange={(e) => setWeight2(e.target.value)}
              />
              <label htmlFor="floatingInputWeight2" className="form-label">
                Weight(Kg)
              </label>
            </div>

            <div className="fform-floating mb-3 orm-check form-switch">
              <input className="form-check-input" type="checkbox" id="multiplePieces2" onChange={handleMultiplePiecesChange2} />
              <label className="form-check-label" htmlFor="multiplePieces2">
                Multiple Pieces
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInputPiece2"
                placeholder="No. Of Pieces"
                disabled={!isMultiplePieces2}
                value={numberOfPieces2}
                onChange={handleNumberOfPiecesChange2}
              />
              <label htmlFor="floatingInputPiece2" className="form-label">
                No. Of Pieces
              </label>
            </div>

            <div className="chck-box">
              <input type="checkbox" className="" id="finishGood2Checkbox" checked={finishGood2}
              onChange={Checked2}/>
              <label htmlFor="finishGood2Checkbox" className=""
              >
                Finish Good
              </label>
            </div>
          </div>
        </div>

        <div className="row pb-2">
          <div className="col"></div>
          <div className="col">
            <button className="w-100 btn lg-botton mt-4 mb-4 btn btn-primary" type="submit"
            onClick={handleEndProduction}>
              End Production
            </button>
          </div>
          <div className="col"></div>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationPopup
          data={{
            BatchNo: selectedBatchNoOption ? selectedBatchNoOption.value : "",
            SalesOrder: salesOrderOptions,
            GradeName: gradeName,
          }}
          onConfirm={handleConfirmEndProduction}
          onCancel={handleCancelEndProduction}
        />
      )}

      {showResponse && (
        <ConfirmationResponse data={postResponse} onOK={handleOK}/>
      )}
    </>
  );
}

export default ProductionEnd;
