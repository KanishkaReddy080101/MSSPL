import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { UserContext } from '@/UserContext';
import { saveAs } from 'file-saver';
import XlsxPopulate from 'xlsx-populate';

const Searchform = () => {
  const { user } = useContext(UserContext);
  const [warehouseOptions, setWareHouseOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([
    { value: 'FLATS', label: 'FLATS' },
    { value: 'ROUNDS', label: 'ROUNDS' },
  ]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [binOptions, setBinOptions] = useState([]);
  const [batchNoOptions, setBatchNoOptions] = useState([]);
  const [selectedWareHouseOption, setSelectedWareHouseOption] = useState(null);
  const [selectedTypeOption, setSelectedTypeOption] = useState(null);
  const [selectedGradeOption, setSelectedGradeOption] = useState(null);
  const [selectedBinOption, setSelectedBinOption] = useState(null);
  const [selectedBatchNoOption, setSelectedBatchNoOption] = useState(null)
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [exportLogged, setExportLogged] = useState(false);

  const logUserExportToNewRelic = (username, searchCriteria) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Api-Key", process.env.NEXT_PUBLIC_NEWRELIC_API_KEY);

      var logPayload = {
        timestamp: Date.now(),
        message: `User '${username}' ${searchCriteria}`,
        logtype: "exportlogs",
        service: "search-service",
        hostname: "search.example.com"
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
          setExportLogged(true);
        })
        .catch(error => console.error('Error logging export to New Relic:', error));
    
  };


  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BATCHDEATILSs_API_ENDPOINT + `&Branch=${parseInt(user.Branch[0].BranchCode)}`);
      console.log(response)
      const result = await response.json();
      const { responseObject } = result;

      const uniqueWarehouseOptions = [];
    const uniqueBinOptions = [];
    const uniqueGradeOptions = [];
    const uniqueBatchNoOptions = [];

    responseObject.forEach((param) => {
      if (!uniqueWarehouseOptions.some(option => option.value === param['WhsCode'])) {
        uniqueWarehouseOptions.push({
          value: param['WhsCode'],
          label: param['WhsCode'],
        });
      }
      if (!uniqueBinOptions.some(option => option.value === param['BinNo'])) {
        uniqueBinOptions.push({
          value: param['BinNo'],
          label: param['BinNo'],
        });
      }
      if (!uniqueGradeOptions.some(option => option.value === param['ItemName'])) {
        uniqueGradeOptions.push({
          value: param['ItemName'],
          label: param['ItemName'],
        });
      }
      if (!uniqueBatchNoOptions.some(option => option.value === param['BatchNum'])) {
        uniqueBatchNoOptions.push({
          value: param['BatchNum'],
          label: param['BatchNum'],
        });
      }
    });

    setWareHouseOptions(uniqueWarehouseOptions);
    setGradeOptions(uniqueGradeOptions);
    setBinOptions(uniqueBinOptions);
    setBatchNoOptions(uniqueBatchNoOptions);

    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSearch = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BATCHDEATILSs_API_ENDPOINT  + `&Branch=${parseInt(user.Branch[0].BranchCode)}`);
    const result = await response.json();
    const { responseObject } = result;
    const results = responseObject.filter((param) => {
      if (selectedTypeOption && selectedTypeOption.value !== param['Type']) {
        return false;
      }
      if (selectedGradeOption && selectedGradeOption.value !== param['ItemName']) {
        return false;
      }
      if (selectedWareHouseOption && selectedWareHouseOption.value !== param['WhsCode']) {
        return false;
      }
      if (selectedBinOption && selectedBinOption.value !== param['BinNo']) {
        return false;
      }
      if (selectedBatchNoOption && selectedBatchNoOption.value !== param['BatchNum']) {
        return false;
      }
      const dia1 = document.getElementById('floatingInputDia1').value;
      const dia2 = document.getElementById('floatingInputDia2').value;
      if (dia1 > 0 || dia2 > 0) {
        if (
          (dia1 && parseFloat(dia1) > parseFloat(param['Dia'])) ||
          (dia2 && parseFloat(dia2) < parseFloat(param['Dia'])) ||
          param['Dia'] === null
        ) {
          return false;
        }
      }
      const length1 = document.getElementById('floatingInputLength1').value;
      const length2 = document.getElementById('floatingInputLength2').value;
      if (length1 > 0 || length2 > 0) {
        if (
          (length1 && parseFloat(length1) > parseFloat(param['Length'])) ||
          (length2 && parseFloat(length2) < parseFloat(param['Length'])) ||
          param['Length'] === null
        ) {
          return false;
        }
      }
      const width1 = document.getElementById('floatingInputWidth1').value;
      const width2 = document.getElementById('floatingInputWidth2').value;
      if (width1 > 0 || width2 > 0) {
        if (
          (width1 && parseFloat(width1) > parseFloat(param['Width'])) ||
          (width2 && parseFloat(width2) < parseFloat(param['Width'])) ||
          param['Width'] === null
        ) {
          return false;
        }
      }
      const thickness1 = document.getElementById('floatingInputThickness1').value;
      const thickness2 = document.getElementById('floatingInputThickness2').value;
      if (thickness1 > 0 || thickness2 > 0) {
        if (
          (thickness1 && parseFloat(thickness1) > parseFloat(param['Thickness'])) ||
          (thickness2 && parseFloat(thickness2) < parseFloat(param['Thickness'])) ||
          param['Thickness'] === null
        ) {
          return false;
        }
      }
      const weight1 = document.getElementById('floatingInputWeight1').value;
      const weight2 = document.getElementById('floatingInputWeight2').value;
      if (weight1 > 0 || weight2 > 0) {
        if (
          (weight1 && parseFloat(weight1) > parseFloat(param['Weight'])) ||
          (weight2 && parseFloat(weight2) < parseFloat(param['Weight'])) ||
          param['Weight'] === null
        ) {
          return false;
        }
      }
      const searchCriteria = [
        `Type: ${selectedTypeOption ? selectedTypeOption.value : 'All'}`,
        `Grade: ${selectedGradeOption ? selectedGradeOption.value : 'All'}`,
        `Warehouse: ${selectedWareHouseOption ? selectedWareHouseOption.value : 'All'}`,
        `Bin: ${selectedBinOption ? selectedBinOption.value : 'All'}`,
        `Batch No: ${selectedBatchNoOption ? selectedBatchNoOption.value : 'All'}`
      ].filter(criteria => criteria !== 'All').join(', ');
  
      logUserExportToNewRelic(user.UserID, `Searched Results with Criteria: ${searchCriteria}`);
      return true;
    });
    setSearchResults(results);
    setShowResults(true);
  };

  const handleClear = () => {
    setSelectedWareHouseOption(null);
    setSelectedTypeOption(null);
    setSelectedGradeOption(null);
    setSelectedBinOption(null);
    setSelectedBatchNoOption(null)
    setShowResults(false);
    document.getElementById('floatingInputDia1').value = '';
  document.getElementById('floatingInputDia2').value = '';
  document.getElementById('floatingInputLength1').value = '';
  document.getElementById('floatingInputLength2').value = '';
  document.getElementById('floatingInputWidth1').value = '';
  document.getElementById('floatingInputWidth2').value = '';
  document.getElementById('floatingInputThickness1').value = '';
  document.getElementById('floatingInputThickness2').value = '';
  document.getElementById('floatingInputWeight1').value = '';
  document.getElementById('floatingInputWeight2').value = '';
  };

  const saveAsExcel = async () => {
    if (searchResults.length > 0) {
      try {
        logUserExportToNewRelic(user.UserID, "Exported the search Results");
        const header = [
          'Type',
          'Item Code',
          'Item Name',
          'Batch No.',
          'Warehouse Code',
          'Bin No',
          'Branch',
          'Weight',
          'Dia',
          'Thickness',
          'Width',
          'Length'
        ];

        const sheetData = searchResults.map((result) => [
          result.Type,
          result.ItemCode,
          result.ItemName,
          result.BatchNum,
          result.WhsCode,
          result.BinNo,
          result.Branch,
          result.Weight,
          result.Dia,
          result.Thickness,
          result.Width,
          result.Length
        ]);

        sheetData.unshift(header);

        XlsxPopulate.fromBlankAsync().then(async (workbook) => {
          const sheet1 = workbook.sheet(0);
          const totalColumns = sheetData[0].length;

          sheet1.cell('A1').value(sheetData);
          const range = sheet1.usedRange();
          const endColumn = String.fromCharCode(64 + totalColumns);
          sheet1.row(1).style('bold', true);
          sheet1.range('A1:' + endColumn + '1').style('fill', 'BFBFBF');
          range.style('border', true);
          return workbook.outputAsync().then((res) => {
            saveAs(res, 'search_results.xlsx');
          });
        });
      } catch (error) {
        console.error('Error exporting to Excel:', error);
      }
    }
  };
  

  return (
    <>
      {/* {fields for Search Stock } */}
      <button className="clr-button btn btn-secondary" type="button" onClick={handleClear}>Clear</button>
      <div className="ps-5 pe-5 pt-5">
        <div className="row pb-3">
          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor='type'>Product Type</label>
            <Select
              id="type"
              instanceId="type"
              className={'select-form-control select-dropdown'}
              options={typeOptions}
              value={selectedTypeOption}
              onChange={setSelectedTypeOption}
              placeholder="Type"
            />
            </div>
          </div>
          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor='grade'>Grade</label>
            <Select
              id="grade"
              instanceId="grade"
              className={'select-form-control select-dropdown'}
              options={gradeOptions}
              value={selectedGradeOption}
              onChange={setSelectedGradeOption}
              placeholder="Grade"
            />
            </div>
          </div>
        </div>

        <div className="row pb-3">
          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor='warehouseType'>Warehouse</label>
            <Select
              id="warehouseType"
              instanceId="warehouseType"
              className={'select-form-control select-dropdown'}
              options={warehouseOptions}
              value={selectedWareHouseOption}
              onChange={setSelectedWareHouseOption}
              placeholder="Warehouse"
            />
            </div>
          </div>
          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor='bin'>Bin</label>
            <Select
              id="bin"
              instanceId="bin"
              className={'select-form-control select-dropdown'}
              options={binOptions}
              value={selectedBinOption}
              onChange={setSelectedBinOption}
              placeholder="Bin"
            />
            </div>
          </div>
          <div className="col">
          <div className="form-control mb-3">
            <label htmlFor='batchNo'>Batch No.</label>
            <Select
              id="batchNo"
              instanceId="batchNo"
              className={'select-dropdown'}
              options={batchNoOptions}
              value={selectedBatchNoOption}
              onChange={setSelectedBatchNoOption}
              placeholder="Batch No."
            />
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Input Field for Search Stock --> */}
      <div className="ps-5 pe-5 pt-5">
        {/* <!-- Heading--> */}
        <div className="row pb-2">
          <div className="col">
            <p className="textcenter">MIN</p>
          </div>
          <div className="col"></div>

          <div className="col">
            <p className="textcenter">MAX</p>
          </div>
        </div>

        {/* <!-- Input Field--> */}
        <div className="row pb-2">
          <div className="col">
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputDia1" placeholder="Dia" />
              <label htmlor="floatingInputDia1" className="form-label">Dia</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputThickness1" placeholder="Thickness" />
              <label htmlor="floatingInputThickness1" className="form-label">Thickness</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputWidth1" placeholder="Width" />
              <label htmlor="floatingInputWidth1" className="form-label">Width</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputLength1" placeholder="Length" />
              <label htmlor="floatingInputLength1" className="form-label">Length</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputWeight1" placeholder="Weight" />
              <label htmlor="floatingInputWeight1" className="form-label">Weight</label>
            </div>
          </div>
          <div className="col align-self-center">
            <button className="w-100 btn lg-botton mt-4 mb-4 btn btn-primary" type="submit" onClick={handleSearch}>Search</button>
          </div>
          <div className="col">
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputDia2" placeholder="Dia" />
              <label htmlor="floatingInputDia2" className="form-label">Dia</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputThickness2" placeholder="Thickness" />
              <label htmlor="floatingInputThickness2" className="form-label">Thickness</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputWidth2" placeholder="Width" />
              <label htmlor="floatingInputWidth2" className="form-label">Width</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputLength2" placeholder="Length" />
              <label htmlor="floatingInputLength2" className="form-label">Length</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputWeight2" placeholder="Weight" />
              <label htmlor="floatingInputWeight2" className="form-label">Weight</label>
            </div>
          </div>
        </div>
      </div>

      {showResults && (
        <div className='search-results'>
          <div className='results'>
            <div className='top-head'>
              <h3>Search Results</h3>
              <p>Total Pieces: {searchResults.length}</p>
              <div>
              <button className='export-button' onClick={saveAsExcel}>Export</button>
              <button className="close-button" onClick={() => setShowResults(false)}>
                Close
              </button>
              </div>
            </div>
            {searchResults.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Batch No.</th>
                    <th>Warehouse Code</th>
                    <th>Bin No.</th>
                    <th>Branch</th>
                    <th>Weight</th>
                    <th>Dia</th> 
                    <th>Thickness</th>
                    <th>Width</th>
                    <th>Length</th>
                    
                    
                    
                  </tr>
                </thead>
                <tbody className='result-search-result'>
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.Type}</td>
                      <td>{result.ItemCode}</td>
                      <td>{result.ItemName}</td>
                      <td>{result.BatchNum}</td>
                      <td>{result.WhsCode}</td>
                      <td>{result.BinNo}</td>
                      <td>{result.Branch}</td>
                      <td>{result.Weight}</td>
                      <td>{result.Dia}</td>
                      <td>{result.Thickness}</td>
                      <td>{result.Width}</td>
                      <td>{result.Length}</td>
                      
                      
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Searchform;
