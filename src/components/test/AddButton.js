import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { AgGridColumn, AgGridReact } from '@ag-grid-community/react';

import { AllCommunityModules } from "@ag-grid-community/all-modules";
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

const AddButton = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([
    { timer: "Toyota", symbol: "Celica", price: 35000, side: "<input />", submit: "Celica", pass: "Celica", quantity: "Celica", result: "Celica" },
    { timer: "Toyota", symbol: "Celica", price: 35000, side: "Celica", submit: "Celica", pass: "Celica", quantity: "Celica", result: "Celica" },
    { timer: "Toyota", symbol: "Celica", price: 35000, side: "Celica", submit: "Celica", pass: "Celica", quantity: "Celica", result: "Celica" },
    { timer: "Toyota", symbol: "Celica", price: 35000, side: "Celica", submit: "Celica", pass: "Celica", quantity: "Celica", result: "Celica" },
    { timer: "Toyota", symbol: "Celica", price: 35000, side: "Celica", submit: "Celica", pass: "Celica", quantity: "Celica", result: "Celica" },
    { timer: "Toyota", symbol: "Celica", price: 35000, side: "Celica", submit: "Celica", pass: "Celica", quantity: "Celica", result: "Celica" },

  ]);
  const [columns, setColumns] = useState([
    { field: 'timer' },
    { field: 'symbol' },
    { field: 'price' },
    { field: 'side' },
    { field: 'submit' }
  ]);

  const [forceRefresh, setForceRefresh] = useState(false);

  useEffect(() => {
    if (forceRefresh) {
      gridApi.refreshCells({ force: true });
      setForceRefresh(false);
    }
  }, [forceRefresh]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json');
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        setRowData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  const setHeaderNames = () => {
    const newColumns = gridApi.getColumnDefs();
    newColumns.forEach((newColumn, index) => {
      newColumn.headerName = 'C' + index;
    });
    setColumns(newColumns);
  };

  const removeHeaderNames = () => {
    const newColumns = gridApi.getColumnDefs();
    newColumns.forEach((newColumn, index) => {
      newColumn.headerName = undefined;
    });
    setColumns(newColumns);
  };

  const setValueFormatters = () => {
    const newColumns = gridApi.getColumnDefs();
    newColumns.forEach((newColumn, index) => {
      newColumn.valueFormatter = params => '[ ' + params.value + ' ]';
    });

    setColumns(newColumns);
    setForceRefresh(true);
  };

  const removeValueFormatters = () => {
    const newColumns = gridApi.getColumnDefs();
    newColumns.forEach((newColumn, index) => {
      newColumn.valueFormatter = undefined;
    });

    setColumns(newColumns);
    setForceRefresh(true);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={setHeaderNames}>Set Header Names</button>
          <button onClick={removeHeaderNames}>Remove Header Names</button>
          <button onClick={setValueFormatters}>Set Value Formatters</button>
          <button onClick={removeValueFormatters}>Remove Value Formatters</button>
          <div
            style={{
              height: '100%',
              width: '100%'
            }}
            className="ag-theme-alpine test-grid">
            <AgGridReact
              modules={AllCommunityModules}
              rowData={rowData}
              onGridReady={onGridReady}

            >
              <AgGridColumn field="timer"></AgGridColumn>
              <AgGridColumn field="symbol"></AgGridColumn>
              <AgGridColumn field="price"></AgGridColumn>
              <AgGridColumn field="side"></AgGridColumn>
              <AgGridColumn field="submit"></AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddButton;