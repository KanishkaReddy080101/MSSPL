import React, { useContext, useState, useEffect } from 'react';
import Select from "react-select";
import { UserContext } from '@/UserContext';
import ConfirmationPopup from "./ConfirmationPopup";
import ConfirmationResponse from './ConfirmationResponse';
import WeightPopup from './WeightPopup';

function ProductionEnd() {
  const { user } = useContext(UserContext);
  const [isMultiplePieces, setIsMultiplePieces] = useState(false);
  const [numberOfPieces, setNumberOfPieces] = useState(1);
  const [isMultiplePieces2, setIsMultiplePieces2] = useState(false);
  const [numberOfPieces2, setNumberOfPieces2] = useState(1);
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
  const [Length1, setLength1] = useState("");
  const [Width1, setWidth1] = useState("");
  const [Thickness1, setThickness1] = useState("");
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
  const [readyStockSale, setReadyStockSale] = useState(false)
  const [selectedIssueDocNum, setSelectedIssueDocNum] = useState(null);
  const [issueDocNumOptions, setIssueDocNumOptions] = useState([]);
  const [batchOccurrenceCount, setBatchOccurrenceCount] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResponse, setShowResponse] = useState(false)
  const [postResponse, setPostResponse] = useState('')
  const [showBlockWeightPopup, setShowBlockWeightPopup] = useState(false);
  const [productionLogged, setProductionLogged] = useState(false);
  const [showWeightPopup, setShowWeightPopup] = useState(false);
  const [showWeightPopup2, setShowWeightPopup2] = useState(false);
  const [selectedBinForWeight, setSelectedBinForWeight] = useState(null);
  const [bayOptions, setBayOptions] = useState(['Bay1', 'Bay2', 'Bay3', 'Bay4', 'Bay5']);
  const [selectedBay, setSelectedBay] = useState(null);
  const [scrapBin, setScrapBin] = useState('')
  const [postData, setPostData] = useState('');
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  // const handleGetWeightToggle = () => {
  //   setShowWeightPopup(true);
  // };
  // const handleGetWeightToggle2 = () => {
  //   setShowWeightPopup2(true);
  // };

  // const handleBayChange = (selectedBay) => {
  //   setSelectedBay(selectedBay);
  // };
  // const getBayValues = (branchCode) => {
  //   switch (parseInt(branchCode)) {
  //     case 3:
  //       return {
  //         Bay1: '/Scale1/Scale1.txt',
  //         Bay2: '/Scale2/Scale2.txt',
  //         Bay3: '/Scale3/Scale3.txt',
  //         Bay4: '/Scale4/Scale4.txt',
  //         Bay5: '/Scale5/Scale5.txt',
  //       };
  //     case 4:
  //       return {
  //         Bay1: '/Scale1/Scale1.txt',
  //         Bay2: '/Scale2/Scale2.txt',
  //         Bay3: '/Scale3/Scale3.txt',
  //         Bay4: '/Scale4/Scale4.txt',
  //         Bay5: '/Scale5/Scale5.txt',
  //       };
  //     case 5:
  //       return {
  //         Bay1: '/Scale1/Scale1.txt',
  //         Bay2: '/Scale2/Scale2.txt',
  //         Bay3: '/Scale3/Scale3.txt',
  //         Bay4: '/Scale4/Scale4.txt',
  //         Bay5: '/Scale5/Scale5.txt',
  //       };
  //     case 6:
  //       return {
  //         Bay1: '/Scale1/Scale1.txt',
  //         Bay2: '/Scale2/Scale2.txt',
  //         Bay3: '/Scale3/Scale3.txt',
  //         Bay4: '/Scale4/Scale4.txt',
  //         Bay5: '/Scale5/Scale5.txt',
  //       };
  //     default:
  //       return {};
  //   }
  // };

  // useEffect(() => {
  //   const branchBayValues = getBayValues(user?.Branch[0].BranchCode);
  //   setBayOptions(Object.keys(branchBayValues));
  // }, [user]);


  // const handleWeightPopupConfirm = async () => {
  //   try {
  //     const branchBayValues = getBayValues(user?.Branch[0].BranchCode);
  //     const selectedBayUrl = branchBayValues[selectedBay.value];
  
  //     if (!selectedBayUrl) {
  //       console.error('Invalid branch code or bay selection');
  //       return;
  //     }
  
  //     const response = await fetch(selectedBayUrl);
  //     if (!response.ok) {
  //       console.error('Error fetching weight data. Server returned:', response.status, response.statusText);
  //       return;
  //     }
  
  //     const data = await response.text();
  //     const parsedData = parseFloat(data.trim());
  
  //     if (isNaN(parsedData)) {
  //       alert('Weight file is empty or contains invalid data!');
  //       return;
  //     }
  
  //     setWeight(parsedData);
  //     setShowWeightPopup(false);
  //   } catch (error) {
  //     console.error('Error fetching weight data:', error);
  //   }
  // };
  
  // const handleWeightPopupConfirm2 = async () => {
  //   try {
  //     const branchBayValues = getBayValues(user?.Branch[0].BranchCode);
  //     const selectedBayUrl = branchBayValues[selectedBay.value];
  
  //     if (!selectedBayUrl) {
  //       console.error('Invalid branch code or bay selection');
  //       return;
  //     }
  
  //     const response = await fetch(selectedBayUrl);
  //     if (!response.ok) {
  //       console.error('Error fetching weight data. Server returned:', response.status, response.statusText);
  //       return;
  //     }
  
  //     const data = await response.text();
  //     const parsedData = parseFloat(data.trim());
  
  //     if (isNaN(parsedData)) {
  //       alert('Weight file is empty or contains invalid data!');
  //       return;
  //     }
  
  //     setWeight2(parsedData);
  //     setShowWeightPopup2(false);
  //   } catch (error) {
  //     console.error('Error fetching weight data:', error);
  //   }
  // };
  
  
  

  // const handleWeightPopupClose = () => {
  //   setShowWeightPopup(false);
  // };
  // const handleWeightPopupClose2 = () => {
  //   setShowWeightPopup2(false)
  // };

  // const handleBinForWeightChange = (selectedOption) => {
  //   setSelectedBinForWeight(selectedOption);
  // };

  useEffect(() => {
    if (parseInt(user?.Branch[0].BranchCode) === 3) {
      setScrapBin('W001-SCRAP')
    } else if (parseInt(user?.Branch[0].BranchCode) === 4) {
      setScrapBin('W007-SCRAP')
    } else if (parseInt(user?.Branch[0].BranchCode) === 5) {
      setScrapBin('W011-SCRAP')
    } else if (parseInt(user?.Branch[0].BranchCode) === 6) {
      setScrapBin('W015-SCRAP')
    }
  }, []);

  const logProductionStartToNewRelic = (username, productionDetails) => {
    if (!productionLogged) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Api-Key", process.env.NEXT_PUBLIC_NEWRELIC_API_KEY);
  
      var logPayload = {
        timestamp: Date.now(),
        message: `User '${username}' end production with details: ${JSON.stringify(productionDetails)}`,
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
        .catch(error => console.error('Error logging production end to New Relic:', error));
    }
  };

  const getBinOptions = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BINMASTER_API_ENDPOINT + `${parseInt(user?.Branch[0].BranchCode)}`);
      const result = await response.json();
      const binOptions = result.responseObject.map((bin) => ({
        value: bin["Bin Code"],
        label: bin["Bin Name"]
      }));
      setBinOptions(binOptions);
      setBinOptions2(binOptions);
      if (finishGood1 === true) {
        if (parseInt(user?.Branch[0].BranchCode) === 3) {
          setSelectedBinOption({ value: 'W005-100', label: 'W005-100'})
        } else if (parseInt(user?.Branch[0].BranchCode) === 4) {
          setSelectedBinOption({ value: 'W009-100', label: 'W009-100'})
        } else if (parseInt(user?.Branch[0].BranchCode) === 5) {
          setSelectedBinOption({ value: 'W013-100', label: 'W013-100'})
        } else if (parseInt(user?.Branch[0].BranchCode) === 6) {
          setSelectedBinOption({ value: 'W017-100', label: 'W017-100'})
        }
      }
      if (finishGood2 === true) {
        if (parseInt(user?.Branch[0].BranchCode) === 3) {
          setSelectedBinOption2({ value: 'W005-100', label: 'W005-100'})
        } else if (parseInt(user?.Branch[0].BranchCode) === 4) {
          setSelectedBinOption2({ value: 'W009-100', label: 'W009-100'})
        } else if (parseInt(user?.Branch[0].BranchCode) === 5) {
          setSelectedBinOption2({ value: 'W013-100', label: 'W013-100'})
        } else if (parseInt(user?.Branch[0].BranchCode) === 6) {
          setSelectedBinOption2({ value: 'W017-100', label: 'W017-100'})
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
      if (parseInt(user?.Branch[0].BranchCode) === 3) {
        setSelectedBinOption({ value: 'W005-100', label: 'W005-100'})
      } else if (parseInt(user?.Branch[0].BranchCode) === 4) {
        setSelectedBinOption({ value: 'W009-100', label: 'W009-100'})
      } else if (parseInt(user?.Branch[0].BranchCode) === 5) {
        setSelectedBinOption({ value: 'W013-100', label: 'W013-100'})
      } else if (parseInt(user?.Branch[0].BranchCode) === 6) {
        setSelectedBinOption({ value: 'W017-100', label: 'W017-100'})
      }
    } else {
      setSelectedBinOption(e);
    }
  };
  const handleBinChange2 = (e) => {
   
    if (finishGood2 === true) {
      if (parseInt(user?.Branch[0].BranchCode) === 3) {
        setSelectedBinOption2({ value: 'W005-100', label: 'W005-100'})
      } else if (parseInt(user?.Branch[0].BranchCode) === 4) {
        setSelectedBinOption2({ value: 'W009-100', label: 'W009-100'})
      } else if (parseInt(user?.Branch[0].BranchCode) === 5) {
        setSelectedBinOption2({ value: 'W013-100', label: 'W013-100'})
      } else if (parseInt(user?.Branch[0].BranchCode) === 6) {
        setSelectedBinOption2({ value: 'W017-100', label: 'W017-100'})
      }
    } else {
    setSelectedBinOption2(e);
    }
  };
const batchNo = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_PRODUCTIONISSUE_API_ENDPOINT + `${parseInt(user?.Branch[0].BranchCode)}`);
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
        Length1: param["Length"],
        Width1: param["Width"],
        Thickness1: param["Thickness"],
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
      setWidth1(selectedIssueDocNumDetails.Width);
      setLength1(selectedIssueDocNumDetails.Length);
      setThickness1(selectedIssueDocNumDetails.Thickness);
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
          process.env.NEXT_PUBLIC_PRODUCTIONISSUE_API_ENDPOINT + `${parseInt(user?.Branch[0].BranchCode)}`
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
      if (readyStockSale === false) {
        for (let i = 0; i < (isMultiplePieces ? numberOfPieces : 1); i++) {
          lineDetails.push({
            Weight: Weight ? Weight : 1,
            Dia: Dia ? Dia : 1,
            Length: Length1 ? Length1 : 1,
            Thickness: Thickness1 ? Thickness1 : 1,
            Bin: selectedBinOption.value,
            Width: Width1 ? Width1 : 1,
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
          //additional scrap
          const remainingWeight = parseFloat(blockWeight - ((Weight * numberOfPieces) + (Weight2 * numberOfPieces2))).toFixed(2);
          const remainingLength = Length === Length1 && Length === Length2 ? Length : parseFloat(Length - ((Length1 * numberOfPieces) + (Length2 * numberOfPieces2))).toFixed(2);
          const remainingThickness = Thickness === Thickness1 && Thickness === Thickness2 ? Thickness : parseFloat(Thickness - ((Thickness1 * numberOfPieces) + (Thickness2 * numberOfPieces2))).toFixed(2);
          const remainingWidth = Width === Width1 && Width === Width2 ? Width : parseFloat(Width - ((Width1 * numberOfPieces) + (Width2 * numberOfPieces2))).toFixed(2);
          
          lineDetails.push({
            Weight: parseFloat(remainingWeight).toFixed(2),
            Dia: Dia ? Dia : 1,
            Length: remainingLength,
            Thickness: remainingThickness,
            Bin: scrapBin,
            Width: remainingWidth,
            NoofPieces: 1,
            FinishGood: false,
          });
          
      } else {
        lineDetails.push({
          Weight: blockWeight,
              Dia: Dia,
              Length: Length,
              Thickness: Thickness,
              Bin: selectedBinOption.value,
              Width: Width,
              NoofPieces: 1,
              FinishGood: true,
        })
      }

      if (readyStockSale === false ? lineDetails.length >= 3 : lineDetails.length >= 1) {
        const postData = {
          Branch: parseInt(user?.Branch[0].BranchCode),
          Series: 216,
          GISeries: 220,
          PostingDate: currentDate,
          IssueBy: user?.Name,
          ProductionEndTime: currentTime,
          BladeCode: BladeCode,
          BladeBatch: BladeBatch,
          CuƫngMachineNo: cuttingMachine,
          SaleOrderNumber: salesOrderOptions,
          LineNum: lineNo,
          BatchNum: selectedBatchNoOption.value,
          ItemCode: grnNo,
          LineDetails: lineDetails,
        };
        
        if (((Weight * numberOfPieces) + (Weight2 * numberOfPieces2) <= blockWeight) && 
            ((Length1 * numberOfPieces) + (Length2 * numberOfPieces2) <= Length) ||
            ((Width1 * numberOfPieces) + (Width2 * numberOfPieces2) <= Width) || 
            ((Thickness1 * numberOfPieces) + (Thickness2 * numberOfPieces2) <= Thickness)) {
          console.log('post data', postData);
          setPostData(postData);
          setShowConfirmation(true);
          logProductionStartToNewRelic(user.Name, postData);
        } else {
          setShowBlockWeightPopup(true);
        }
      } else {
        console.error("There should be at least 3 line details, including scrap.");
      }
    } else {
      console.error("Please select all required options before stopping production.");
    }
  };

  const handleConfirmEndProduction = () => {
    fetch(process.env.NEXT_PUBLIC_GOODSRECEIPT_GOODSISSUE_POST_API_ENDPOINT, {
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
        setSelectedBatchNoOption(null)
        setIsMultiplePieces(false);
    setNumberOfPieces('');
    setIsMultiplePieces2(false);
    setNumberOfPieces2('');
    setSelectedBatchNoOption(null);
    setSalesOrderOptions('')
    setGradeName('');
    setCuttingMachine('');
    setGrnNo('');
    setlineNo('');
    setBladeBatch('');
    setBladeCode('');
    setWarehouse('');
    setBlockWeight('');
    setStartTime('');
    setStartDate('');
    setDia('');
    setLength('');
    setWidth('');
    setThickness('');
    setLength1('');
    setWidth1('');
    setThickness1('');
    setWeight('');
    setDia2('');
    setLength2('');
    setWidth2('');
    setThickness2('');
    setWeight2('');
    setSelectedBinOption(null);
    setSelectedBinOption2(null);
    setFinishGood1(false);
    setFinishGood2(false);
    setReadyStockSale(false);
    setSelectedIssueDocNum(null);

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

  const handleCloseBlockWeightPopup = () => {
    setShowBlockWeightPopup(false);
  };

  const Checked1 = () => {
    setFinishGood1(!finishGood1);
    if (parseInt(user?.Branch[0].BranchCode) === 3) {
      setSelectedBinOption({ value: 'W005-100', label: 'W005-100'})
    } else if (parseInt(user?.Branch[0].BranchCode) === 4) {
      setSelectedBinOption({ value: 'W009-100', label: 'W009-100'})
    } else if (parseInt(user?.Branch[0].BranchCode) === 5) {
      setSelectedBinOption({ value: 'W013-100', label: 'W013-100'})
    } else if (parseInt(user?.Branch[0].BranchCode) === 6) {
      setSelectedBinOption({ value: 'W017-100', label: 'W017-100'})
    }
  };

  const readyStockSaleChecked = async () => {
    setReadyStockSale(!readyStockSale);
    if (readyStockSale === false) {
      if (parseInt(user?.Branch[0].BranchCode) === 3) {
        setSelectedBinOption({ value: 'W005-100', label: 'W005-100'})
      } else if (parseInt(user?.Branch[0].BranchCode) === 4) {
        setSelectedBinOption({ value: 'W009-100', label: 'W009-100'})
      } else if (parseInt(user?.Branch[0].BranchCode) === 5) {
        setSelectedBinOption({ value: 'W013-100', label: 'W013-100'})
      } else if (parseInt(user?.Branch[0].BranchCode) === 6) {
        setSelectedBinOption({ value: 'W017-100', label: 'W017-100'})
      }
    setLength2(0);
    setWidth2(0);
    setThickness2(0);
    setWeight2(0);
    } else if (selectedIssueDocNum) {
        try {
          const issueDocNumDetailsResponse = await fetch(
            process.env.NEXT_PUBLIC_PRODUCTIONISSUE_API_ENDPOINT + `${parseInt(user?.Branch[0].BranchCode)}`
          );
          const issueDocNumDetailsResult = await issueDocNumDetailsResponse.json();
    
          const selectedIssueDocNumDetails = issueDocNumDetailsResult.find(
            (item) => item.ISSUEDOCNUM === selectedIssueDocNum.value
          );
    
          if (selectedIssueDocNumDetails) {
      setWidth1(selectedIssueDocNumDetails.Width);
      setLength1(selectedIssueDocNumDetails.Length);
      setThickness1(selectedIssueDocNumDetails.Thickness);
      setWeight(selectedIssueDocNumDetails.Weight);
      setDia2(selectedIssueDocNumDetails.Dia);
      setWidth2(selectedIssueDocNumDetails.Width);
      setLength2(selectedIssueDocNumDetails.Length);
      setThickness2(selectedIssueDocNumDetails.Thickness);
      setWeight2(selectedIssueDocNumDetails.Weight);
    
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
  }
  
  const Checked2 = () => {
    setFinishGood2(!finishGood2);
    if (parseInt(user?.Branch[0].BranchCode) === 3) {
      setSelectedBinOption2({ value: 'W005-100', label: 'W005-100'})
    } else if (parseInt(user?.Branch[0].BranchCode) === 4) {
      setSelectedBinOption2({ value: 'W009-100', label: 'W009-100'})
    } else if (parseInt(user?.Branch[0].BranchCode) === 5) {
      setSelectedBinOption2({ value: 'W013-100', label: 'W013-100'})
    } else if (parseInt(user?.Branch[0].BranchCode) === 6) {
      setSelectedBinOption2({ value: 'W017-100', label: 'W017-100'})
    }
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
              className={"select-form-control select-dropdown"}
              options={batchNoOptions}
              value={selectedBatchNoOption}
              onChange={handleBatchNoChange}
              isSearchable={true}
            />
            </div>
          </div>
          <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="issueDocNum">Issue Doc Num</label>
              <Select
                id="issueDocNum"
                instanceId="issueDocNum"
                className="select-form-control select-dropdown"
                options={issueDocNumOptions}
                value={selectedIssueDocNum}
                onChange={handleIssueDocNumChange}
                isSearchable={true}
              />
              </div>
            </div>
          {/* {console.log(batchOccurrenceCount, 'batchoccrcont')} */}
          
        </div>
        <div className="col">
          <div className="form-control mb-3">
              <label htmlFor="floatingInputBin">Sales Order No.</label>
              <input
                type="text"
                readOnly
                className="form-control"
                id="floatingInputBin"
                value={salesOrderOptions}
                onChange={(e) => setSalesOrderOptions(e.target.value)}
              />
            </div>
          </div> 
        <div className="row pb-3">
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
          <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="blockWeight">Block Weight</label>
              <input
                type="text"
                readOnly
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
                readOnly
                className="form-control"
                id="cuttingMachine"
                value={cuttingMachine}
                onChange={(e) => setCuttingMachine(e.target.value)}
              />
            </div>
          </div>
        <div className="col">
            <div className="form-control mb-3">
              <label htmlFor="gadeName">Grade Name</label>
              <input
                type="text"
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
          <div className="col text-center">
            <p className="text-center balance-piece">Balance Piece - 1</p>
          </div>

          <div className="col text-center">
            <p className="text-center">Balance Piece - 2</p>
          </div>
        </div>

        <div className="row pb-2">
          <div className="col">
            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputDia1" 
              placeholder="Dia" 
              value={readyStockSale === true ? Dia : Dia}
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
              value={readyStockSale === true ? Thickness : Thickness1}
              onChange={(e) => setThickness1(e.target.value)}
              disabled={Length != Length1 || Length != Length2 || Width != Width1 || Width != Width2 || Dia > 1.00}
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
              value={readyStockSale === true ? Width : Width1}
              onChange={(e) => setWidth1(e.target.value)}
              disabled={Length != Length1 || Length != Length2 || Thickness != Thickness1 || Thickness != Thickness2 || Dia > 1.00}
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
              value={readyStockSale === true ? Length : Length1}
              onChange={(e) => setLength1(e.target.value)}
              disabled={Width != Width1 || Width != Width2 || Thickness != Thickness1 || Thickness != Thickness2}
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
          <div className='d-flex align-items-center justify-content-between'>
            <div className="form-floating">
              <input type="number" 
              className="form-control" 
              id="floatingInputWeight1" 
              placeholder="Weight" 
              value={readyStockSale === true ? blockWeight : Weight}
              onChange={(e) => setWeight(e.target.value)}
              disabled={readyStockSale === true}
              />
              <label htmlFor="floatingInputWeight1" className="form-label">
                Weight(Kg)
              </label>
            </div>
            {/* <button className='btn btn-primary' onClick={handleGetWeightToggle}>Get Weight</button> */}
            </div>

  <div className="form-check form-switch mb-3">
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
            <div className="check-box">
            <div className="chck-box">
              <input type="checkbox" className="" id="finishGood1Checkbox" 
              checked={readyStockSale === true ? true : finishGood1}
              onChange={Checked1}/>
              <label htmlFor="finishGood1Checkbox" className=""
              >
                Finish Good
              </label>
            </div>
            <div className="chck-box">
              <input type="checkbox" className="" id="readyStockSaleCheckbox" checked={readyStockSale}
              onChange={readyStockSaleChecked}/>
              <label htmlFor="readyStockSaleCheckbox" className=""
              >
                Ready Stock Sale
              </label>
            </div>
            </div>
          </div>
          <div className="col align-self-center"></div>
          <div className="col">
            <div className="form-floating mb-3">
              <input type="number" 
              className="form-control" 
              id="floatingInputDia2" 
              placeholder="Dia" 
              value={readyStockSale === true ? Dia : Dia2}
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
              value={readyStockSale === true ? Thickness : Thickness2}
              onChange={(e) => setThickness2(e.target.value)}
              disabled={Length != Length1 || Length != Length2 || Width != Width1 || Width != Width2 || Dia2 > 1.00}
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
              value={readyStockSale === true ? Width : Width2}
              onChange={(e) => setWidth2(e.target.value)}
              disabled={Length != Length1 || Length != Length2 || Thickness != Thickness1 || Thickness != Thickness2 || Dia2 > 1.00}
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
              value={readyStockSale === true ? Length : Length2}
              onChange={(e) => setLength2(e.target.value)}
              disabled={Width != Width1 || Width != Width2 || Thickness != Thickness1 || Thickness != Thickness2}
              />
              <label htmlFor="floatingInputLength2" className="form-label">
                Length
              </label>
            </div>

            <div className="form-floating mb-3">
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
          <div className='d-flex align-items-center justify-content-between'>
            <div className="form-floating">
              <input type="number" 
              className="form-control" 
              id="floatingInputWeight2" 
              placeholder="Weight" 
              value={readyStockSale === true ? blockWeight : Weight2}
              onChange={(e) => setWeight2(e.target.value)}
              disabled={readyStockSale === true}
              />
              <label htmlFor="floatingInputWeight2" className="form-label">
                Weight(Kg)
              </label>
            </div>
            {/* <button className='btn btn-primary' onClick={handleGetWeightToggle2}>Get Weight</button> */}
            </div>
  <div className="form-check form-switch mb-3">
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
      {/* {showWeightPopup && (
        <WeightPopup
        bayOptions={bayOptions.map((bay) => ({ value: bay, label: bay }))}
          onConfirm={handleWeightPopupConfirm}
          onClose={handleWeightPopupClose}
          onBayChange={handleBayChange}
        />
      )}
      {showWeightPopup2 && (
        <WeightPopup
          bayOptions={bayOptions.map((bay) => ({ value: bay, label: bay }))}
          onConfirm={handleWeightPopupConfirm2}
          onClose={handleWeightPopupClose2}
          onBayChange={handleBayChange}
        />
      )} */}
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

{showBlockWeightPopup && (
        <div className="popup-overlay">
      <div className="popup">
        {((Weight * numberOfPieces) + (Weight2 * numberOfPieces2) > blockWeight) &&        
          <>
          <h2>Block Weight Exceeded</h2>
          <p>The total weight of the pieces exceeds the block weight.</p>
          </>
        }
        {((Weight * numberOfPieces) + (Weight2 * numberOfPieces2) <= blockWeight) && 
        ((Length1 * numberOfPieces) + (Length2 * numberOfPieces2) > Length) &&
        (Length != Length1 || Length != Length2) &&
          <>
          <h2>Length Exceeded</h2>
          <p>The total Length of the pieces exceeds the actual Length.</p>
          </>
        }
        {((Weight * numberOfPieces) + (Weight2 * numberOfPieces2) <= blockWeight) &&
        ((Width1 * numberOfPieces) + (Width2 * numberOfPieces2) > Width) &&
        (Width != Width1 || Width != Width2) &&
          <>
          <h2>Width Exceeded</h2>
          <p>The total Width of the pieces exceeds the actual Width.</p>
          </>
        }
        {((Weight * numberOfPieces) + (Weight2 * numberOfPieces2) <= blockWeight) &&
        ((Thickness1 * numberOfPieces) + (Thickness2 * numberOfPieces2) > Thickness) &&
        (Thickness != Thickness1 || Thickness != Thickness2) &&
          <>
          <h2>Thickness Exceeded</h2>
          <p>The total Thickness of the pieces exceeds the actual Thickness.</p>
          </>
        }
        {((Weight * numberOfPieces) + (Weight2 * numberOfPieces2) <= blockWeight) &&
        (Length === Length1 && Length === Length2) &&
        (Width === Width1 && Width === Width2) &&
        (Thickness === Thickness1 && Thickness === Thickness2) &&
          <>
          <h2>Update Values</h2>
          <p>You need to update the Line Item Length.</p>
          </>
        }
        <div className="popup-buttons">
          <button className="btn primary" onClick={handleCloseBlockWeightPopup}>
            OK
          </button>
        </div>
      </div>
    </div>
      )}
    </>
  );
}

export default ProductionEnd;
