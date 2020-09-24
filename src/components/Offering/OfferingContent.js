import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import OfferBtnRenderer from './renderer/OfferBtnRenderer'
import TimerRenderer from './renderer/TimerRenderer';
import StateRenderer from './renderer/StateRenderer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import { readItems } from '../../actions/inquiryAction';

const OfferingContent = ({ inquiries, all, readItems, state }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  useEffect(() => {
    // readItems();
  });

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const httpRequest = new XMLHttpRequest();
    const updateData = (data) => {
      var fakeServer = createFakeServer(data);
      var datasource = createServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
    };

    httpRequest.open(
      'GET',
      'http://localhost:3080/inquiries?state=' + state
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  }
  console.log(inquiries, all)
  return (
    <div className="ag-theme-alpine-dark" style={{ height: '500px', width: '' }}>

      <AgGridReact
        modules={[ServerSideRowModelModule, MenuModule, ColumnsToolPanelModule]}
        onGridReady={onGridReady}
        paginationAutoPageSize={true}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          resizable: true,
          cellClass: 'align-center',
          headerClass: 'align-center-header',
          // valueFormatter: function (params) {
          //   return formatNumber(params.value);
          // },
        }}
        rowModelType='serverSide'
        rowData={inquiries}>

        <AgGridColumn
          field="timer"
          cellRendererFramework={TimerRenderer}
          maxWidth="100"
          width="100"></AgGridColumn>

        <AgGridColumn
          field="group"
          maxWidth="200"
          width="100"></AgGridColumn>

        <AgGridColumn
          field="symbol"
          maxWidth="200"
          width="100"></AgGridColumn>

        <AgGridColumn
          field="price"
          cellRenderer="agAnimateShowChangeCellRenderer"
          valueParser={numberValueParser}
          maxWidth="100"
          width="100"
          editable></AgGridColumn>

        <AgGridColumn
          field="action"
          cellRendererFramework={OfferBtnRenderer}
          maxWidth="130"
          minWidth="130"></AgGridColumn>

        <AgGridColumn
          field="quantity"
          cellRenderer="agAnimateShowChangeCellRenderer"
          valueParser={numberValueParser}
          // minWidth="400"
          width="700"
          editable></AgGridColumn>

        <AgGridColumn
          field="state"
          cellRendererFramework={StateRenderer}
          maxWidth="100"></AgGridColumn>

      </AgGridReact>
    </div>
  );
};

function numberValueParser(params) {
  return Number(params.newValue);
}

function createServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      setTimeout(function () {
        if (response.success) {
          params.successCallback(response.rows, response.lastRow);
        } else {
          params.failCallback();
        }
      }, 500);
    },
  };
}
function createFakeServer(allData) {
  return {
    getData: function (request) {
      var requestedRows = allData.slice(request.startRow, request.endRow);
      var lastRow = getLastRowIndex(request, requestedRows);
      return {
        success: true,
        rows: requestedRows,
        lastRow: lastRow,
      };
    },
  };
}
function getLastRowIndex(request, results) {
  if (!results) return undefined;
  var currentLastRow = request.startRow + results.length;
  return currentLastRow < request.endRow ? currentLastRow : undefined;
}

const mapStateToProps = state => ({
  inquiries: state.inquiries.items,
  all: state
})

const mapDispatchToProps = dispatch => ({
  readItems: () => readItems(dispatch)
})
OfferingContent.propTypes = {
  inquiries: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(OfferingContent)