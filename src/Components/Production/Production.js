import React, { useEffect, useState, useContext } from 'react';
import Select from "react-select";
import { UserContext } from '@/UserContext';
import ConfirmationPopup from "./ConfirmationPopup";
import ConfirmationResponse from './ConfirmationResponse';
import "../../styles/Home.module.css"

const Production = () => {
  const [cuttingMachineOptions, setCuttingMachineOptions] = useState([]);
  const [selectedCuttingMachineOption, setSelectedCuttingMachineOption] = useState(null);
  const [machineItemNoOptions, setMachineItemNoOptions] = useState([]);
  const [selectedMachineItemNoOption, setSelectedMachineItemNoOption] = useState(null);
  const [bladeMasterOptions, setBladeMasterOptions] = useState([]);
  const [selectedBladeMasterOption, setSelectedBladeMasterOption] = useState(null);
  const [salesOrderOptions, setSalesOrderOptions] = useState([]);
  const [selectedSalesOrderOption, setSelectedSalesOrderOption] = useState(null);
  const [linesOrderOptions, setLinesOrderOptions] = useState([]);
  const [selectedLinesOrderOption, setSelectedLineOrderOption] = useState(null);
  const [batchNoOptions, setBatchNoOptions] = useState([]);
  const [selectedBatchNoOption, setSelectedBatchNoOption] = useState(null);
  const [gradeName, setGradeName] = useState("");
  const [grnNo, setGrnNo] = useState("");
  const [bin, setBin] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [Dia, setDia] = useState("");
  const [Length, setLength] = useState("");
  const [Width, setWidth] = useState("");
  const [Thickness, setThickness] = useState("");
  const [batchDetails, setBatchDetails] = useState([]);
  const [bladeQuantity, setBladeQuantity] = useState('')
  const [productType, setProductType] = useState("");
  const [Weight, setWeight] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResponse, setShowResponse] = useState(false)
  const [postResponse, setPostResponse] = useState('')
  const [productionLogged, setProductionLogged] = useState(false);
  const [userInput, setUserInput] = useState('');
  const { user } = useContext(UserContext);
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const [postData, setPostData] = useState({
    Branch: "",
    PostingDate: "",
    IssueBy: "",
    ProductionStartTime: "",
    BladeCode: "",
    BladeBatch: "",
    MachineItemCode: "",
    SalesOrderNumber: "",
    LineNum: "",
    BatchNum: "",
  });

  const logProductionStartToNewRelic = (username, productionDetails) => {
    if (!productionLogged) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Api-Key", process.env.NEXT_PUBLIC_NEWRELIC_API_KEY);
  
      var logPayload = {
        timestamp: Date.now(),
        message: `User '${username}' started production with details: ${JSON.stringify(productionDetails)}`,
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
    fetchCuttingMachines();
    salesOrder();
  }, []);

  const fetchCuttingMachines = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CUTTINGMACHINE_API_ENDPOINT + `${parseInt(user.Branch[0].BranchCode)}`);
      const result = await response.json();
      const options = result.map((machine) => ({
        value: machine.CuttingMachineName,
        label: machine.CuttingMachineName,
        BladeDetails: machine.BladeDetails
      }));
      setCuttingMachineOptions(options);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleCuttingMachineChange = (selectedOption) => {
    setSelectedCuttingMachineOption(selectedOption);
    updateMachineItemNoOptions(selectedOption);
  };
  
  const updateMachineItemNoOptions = (selectedOption) => {
    const machineItemNos = selectedOption.BladeDetails.map((blade) => ({
      value: blade.BladeName,
      label: blade.BladeName,
    }));
    setMachineItemNoOptions(machineItemNos);
    setSelectedMachineItemNoOption(null);
  };
  
  
  const handleMachineItemNoChange = (selectedOption) => {
    setSelectedMachineItemNoOption(selectedOption);
    updateBladeMasterOptions(selectedCuttingMachineOption, selectedOption);
  };
  
  const updateBladeMasterOptions = (selectedCuttingMachine, selectedMachineItemNo) => {
    if (selectedCuttingMachine && selectedMachineItemNo) {
      const bladeMasterOptions = selectedCuttingMachine.BladeDetails
        .filter((blade) => blade.BladeName === selectedMachineItemNo.value)
        .flatMap((blade) =>
          blade.BatchDetails.map((batch) => ({
            value: batch.BladeBatch,
            label: batch.BladeBatch,
            batchQuantity: batch.Qty,
          }))
        );
      setBladeMasterOptions(bladeMasterOptions);
      setSelectedBladeMasterOption(null);
    } else {
      setBladeMasterOptions([]);
      setSelectedBladeMasterOption(null);
    }
  };
  
  const handleBladeMasterChange = (selectedOption) => {
    setSelectedBladeMasterOption(selectedOption);
  
    const selectedBatch = selectedOption.batchQuantity;
    if (selectedBatch) {
      setBladeQuantity(selectedBatch);
    } else {
      console.error("Selected batch quantity not found!");
    }
  };
  
  const salesOrder = async () => {
    try {
     const response = await fetch(process.env.NEXT_PUBLIC_SALESORDER_API_ENDPOINT + `${parseInt(user.Branch[0].BranchCode)}`);
     const result = await response.json();
      const newArr = result.map((ele) => ({
        value: ele.SalesOrderNumber,
        label: ele.SalesOrderNumber,
        lineNumber: ele.ItemDetails.map((data) => ({
          value: data.LineNum,
          label: data.LineNum
        })),
      }));
      setSalesOrderOptions(newArr);
    } catch (error) {
      console.log("error", error);
    }
  };

  const batchNo = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BATCHDEATILS_API_ENDPOINT}?Branch=${parseInt(user.Branch[0].BranchCode)}&BatchInitial=${userInput}&WhsCode=`);
      const result = await response.json();
      const batchNos = result.responseObject.map((param) => ({
        value: param["BatchNum"],
        label: param["BatchNum"],
        gradeName: param["ItemName"],
        grnNo: param["ItemCode"],
        bin: param["BinNo"],
        warehouse: param["WhsCode"],
        productType: param["Type"],
        Dia: param["Dia"],
        Length: param["Length"],
        Width: param["Width"],
        Thickness: param["Thickness"],
        Weight: param["Weight"]
      }));
      setBatchNoOptions(batchNos);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUserInputSubmit = () => {
    if (userInput.trim() === '') {
      console.error('Please enter a valid user input.');
      return;
    }
    batchNo();
  };

  useEffect(() => {
    if (selectedSalesOrderOption && userInput) {
      batchNo();
    }
  }, [selectedSalesOrderOption]);

  useEffect(() => {
    if (selectedSalesOrderOption) {
      fetchCuttingMachines();
    }
  }, [selectedSalesOrderOption]);

  const handleBatchNoChange = (e) => {
    setSelectedBatchNoOption(e);
    const selectedBatch = batchNoOptions.find((batch) => batch.value === e.value);
    if (selectedBatch) {
      setGradeName(selectedBatch.gradeName);
      setGrnNo(selectedBatch.grnNo);
      setBin(selectedBatch.bin);
      setWarehouse(selectedBatch.warehouse);
      setProductType(selectedBatch.productType);
      setDia(selectedBatch.Dia);
      setWidth(selectedBatch.Width);
      setLength(selectedBatch.Length);
      setThickness(selectedBatch.Thickness);
      setWeight(selectedBatch.Weight);
    }
  };

  useEffect(() => {
    if (selectedBatchNoOption) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BATCHDEATILS_API_ENDPOINT}?Branch=${parseInt(user.Branch[0].BranchCode)}&BatchInitial=${userInput}&WhsCode=`);
          const result = await response.json();
          setBatchDetails(result.responseObject);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    }
  }, [selectedBatchNoOption, userInput]);

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value)
  }

  const handleStartProduction = () => {
    if (
      selectedMachineItemNoOption &&
       selectedBladeMasterOption &&
      selectedCuttingMachineOption &&
      selectedSalesOrderOption
    ) {
      setPostData((prevState) => ({
        ...prevState,
        Branch: user.Branch[0].BranchCode,
        PostingDate: currentDate,
        IssueBy: user.Name,
        ProductionStartTime: currentTime,
        BladeCode: selectedMachineItemNoOption.value,
        BladeBatch: selectedBladeMasterOption.value,
        MachineItemCode: selectedCuttingMachineOption.value,
        SalesOrderNumber: selectedSalesOrderOption.value,
        LineNum: selectedLinesOrderOption ? selectedLinesOrderOption.value : "",
        BatchNum: selectedBatchNoOption ? selectedBatchNoOption.value : "",
      }));
    } else {
      console.error("Please select all required options before starting production.");
    }
  };

  useEffect(() => {
    if(postData.BladeCode && postData.BladeBatch && postData.SalesOrderNumber) {
      setShowConfirmation(true);
      logProductionStartToNewRelic(user.Name, postData);
      console.log(postData)
      
    }
  }, [postData]);

  const handleConfirmProduction = () => {
    fetch(process.env.NEXT_PUBLIC_GOODSISSUE_POST_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Production data successfully posted:", data);
        const successdata = data;
          setShowResponse(true);
          setPostResponse(data);
        
        setShowConfirmation(false);
        setSelectedBatchNoOption(null)
        setSelectedSalesOrderOption(null)
        setSelectedBatchNoOption(null)
        setSelectedBladeMasterOption(null)
        setSelectedCuttingMachineOption(null)
        setSelectedLineOrderOption(null)
        setSelectedMachineItemNoOption(null)
        setGradeName('')
        setGrnNo('')
        setBin('')
        setWarehouse('')
        setDia('')
        setLength('')
        setWidth('')
        setThickness('')
        setWeight('')
      })
      .catch((error) => {
        console.error("Error posting production data:", error);
        setShowConfirmation(false);
      });
  };

  const handleCancelProduction = () => {
    setShowConfirmation(false);
  };

  const handleOK = () => {
    setShowResponse(false);
  }

  return (
    <>
      <div className="ps-5 pe-5 pt-5">
        <div className="row pb-3">
          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor="salesOrder">Sales Order No.</label>
            <Select
              id="salesOrder"
              instanceId="salesOrder"
              className={"select-form-control select-dropdown"}
              options={salesOrderOptions}
              value={selectedSalesOrderOption}
              onChange={(e) => {
                setSelectedSalesOrderOption(e);
                setSelectedLineOrderOption(null);
              }}
            />
            </div>
          </div>

          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor="lineNo">Line No</label>
            <Select
              id="lineNo"
              instanceId="lineNo"
              className={"select-form-control select-dropdown"}
              options={selectedSalesOrderOption ? selectedSalesOrderOption.lineNumber : []}
              value={selectedLinesOrderOption}
              onChange={(e) => setSelectedLineOrderOption(e)}
              placeholder={selectedLinesOrderOption ? selectedLinesOrderOption.label : "Select Line No"}
            />
            </div>
          </div>
          </div>
          <div className="row pb-3">
          <div className="d-flex">
            <div className=" form-control mb-3">
              <label htmlFor="UserInput">Batch Input</label>
              <div className='d-flex'>
              <input
                id="UserInput"
                type="text"
                className="form-control"
                value={userInput}
                onChange={handleUserInputChange}
              />
              <button
          className="btn btn-primary m-4 mt-2 mb-3"
          type="button"
          onClick={handleUserInputSubmit}
        >
          Search
        </button>
              </div>
              
            </div>
          </div>
        </div>

        <div className="row pb-3">

        <div className="col">
      <div className="form-control mb-3">
        <label htmlFor="batchNo">Item Batch No</label>
          <Select
            id="batchNo"
            instanceId="batchNo"
            className={"select-form-control select-dropdown"}
            options={batchNoOptions}
            value={selectedBatchNoOption}
            onChange={handleBatchNoChange}
            isDisabled={!userInput}
            placeholder={selectedBatchNoOption ? selectedBatchNoOption.label : "Select Batch No"}
          />
      </div>
    </div>
          
          <div className="col">
            <div className=" form-control mb-3">
              <label htmlFor="gadeName">Item Name</label>
              <input
                id="ItemName"
                readOnly
                type="text"
                className="form-control"
                value={gradeName}
                onChange={(e) => setGradeName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row pb-3">
        <div className="col">
        <div className="form-control mb-3">
            <label htmlFor="cuttingMachine">Cutting Machine</label>
            <Select
              id="cuttingMachine"
              instanceId="cuttingMachine"
              className={"select-form-control select-dropdown"}
              options={cuttingMachineOptions}
              value={selectedCuttingMachineOption}
              onChange={handleCuttingMachineChange}
              placeholder="Select Cutting Machine"
            />
            </div>
          </div>
          <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="floatingInputGrn">Item Code</label>
              <input
                type="text"
                readOnly
                className="form-control"
                id="floatingInputGrn"
                value={grnNo}
                onChange={(e) => setGrnNo(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row pb-3">
        <div className="col">
        <div className="form-control mb-3">
            <label htmlFor="machineItemNo">Blade Name</label>
            <Select
              id="machineItemNo"
              instanceId="machineItemNo"
              className={"select-form-control select-dropdown"}
              options={machineItemNoOptions}
              value={selectedMachineItemNoOption}
              onChange={handleMachineItemNoChange}
              placeholder="Select Blade Name"
              isDisabled={!selectedCuttingMachineOption}
            />
            </div>
          </div>
          <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="floatingInputBin">Bin Location</label>
              <input
                type="text"
                readOnly
                className="form-control"
                id="floatingInputBin"
                value={bin}
                onChange={(e) => setBin(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row pb-3">
        <div className="col">
        <div className="form-control mb-3">
            <label htmlFor="bladeMaster">Blade Batch</label>
            <Select
              id="bladeMaster"
              instanceId="bladeMaster"
              className={"select-form-control select-dropdown"}
              options={bladeMasterOptions}
              value={selectedBladeMasterOption}
              onChange={handleBladeMasterChange}
              placeholder="Select Blade Master"
              isDisabled={!selectedCuttingMachineOption}
            />
            </div>
          </div>
          <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="floatingInputWareHouse">Warehouse</label>
              <input
                type="text"
                readOnly
                className="form-control"
                id="floatingInputWareHouse"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ps-5 pe-5 pt-3">
        <div className="row pb-2">
<div className="col">
  <div className="form-control mb-3">
  <label htmlFor="floatingInputweight">
      Blade Life
    </label>
    <input
      type="number"
      readOnly
      className="form-control"
      id="floatingInputweight"
      value={bladeQuantity}
      onChange={(e) => setBladeQuantity(e.target.value)}
    />  
  </div>
</div>

        </div>
      </div>

      <div className="ps-5 pe-5 pt-3">
        <div className="row pb-2">
          <div className="col-2 size-class">
            <p className="title top-space">Size</p>
          </div>

          <div className='col-10 row'>

          <div className="col">
            <div className="form-floating mb-3">
              <input
                type="number"
                readOnly
                className="form-control"
                id="floatingInputDia"
                placeholder="Dia"
                disabled={productType === "FLATS"}
                value={Dia}
                onChange={(e) => setDia(e.target.value)}
              />
              <label htmlFor="floatingInputDia" className="form-label">
                Dia
              </label>
            </div>
          </div>

          <div className="col">
            <div className="form-floating mb-3">
              <input
                type="number"
                readOnly
                className="form-control"
                id="floatingInputThickness"
                placeholder="Thickness"
                value={Thickness}
                onChange={(e) => setThickness(e.target.value)}
              />
              <label htmlFor="floatingInputThickness" className="form-label">
                Thickness
              </label>
            </div>
          </div>

          <div className="col">
            <div className="form-floating mb-3">
              <input
                type="number"
                readOnly
                className="form-control"
                id="floatingInputWidth"
                placeholder="Width"
                value={Width}
                onChange={(e) => setWidth(e.target.value)}
              />
              <label htmlFor="floatingInputWidth" className="form-label">
                Width
              </label>
            </div>
          </div>

          <div className="col">
            <div className="form-floating mb-3">
              <input
                type="number"
                readOnly
                className="form-control"
                id="floatingInputLength"
                placeholder="Length"
                value={Length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="floatingInputLength" className="form-label">
                Length
              </label>
            </div>
          </div>
          
        </div>
      </div>
      </div>

      <div className="ps-5 pe-5 pt-3">
        <div className="row pb-2">
          <div className="col-2 size-class">
            <p className="title top-space">Weight(kg)</p>
          </div>

          <div className="col-10">
            <div className="form-floating mb-3">
              <input
                type="number"
                readOnly
                className="form-control"
                id="floatingInputweight"
                placeholder="Weight"
                value={Weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <label htmlFor="floatingInputweight" className="form-label">
                Weight
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="ps-5 pe-5 pt-3">
        <div className="row pb-2">
          <div className="col align-self-center">
            <button
              className="w-100 btn lg-botton mt-4 mb-4 btn btn-primary"
              type="submit"
              onClick={handleStartProduction}
            >
              Start Production
            </button>
          </div>
          
        </div>
      </div>
      {showConfirmation && (
            <ConfirmationPopup
            data={postData}
            onConfirm={handleConfirmProduction}
            onCancel={handleCancelProduction}
            />
          )}

{showResponse && (
        <ConfirmationResponse data={postResponse} onOK={handleOK}/>
      )}
    </>
  );
};

export default Production;