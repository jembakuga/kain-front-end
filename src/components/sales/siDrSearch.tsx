import React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";
import BaseComponent from "../common/baseComponent";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";

class SiDrSearch extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/salesOrder/findSiDrs",
    adaptor: new UrlAdaptor(),
  });

  state = {
    salesOrderNo: "",
    poNo: "",
    checkedBy: "",
    type: "",
    client: "",
  };

  handleSalesOrderNoChange(e: any) {
    this.setState({
      salesOrderNo: e.target.value,
    });
  }
  handlePoNoChange(e: any) {
    this.setState({
      poNo: e.target.value,
    });
  }
  handleCheckedByChange(e: any) {
    this.setState({
      checkedBy: e.target.value,
    });
  }

  handleTypeChange(e: any) {
    this.setState({
      type: e.target.value,
    });
  }

  handleClientChange(e: any) {
    this.setState({
      client: e.target.value,
    });
  }

  loadSiDrs() {
    // console.log(this.state);
    if (this.grid) {
      this.grid.dataSource = this.dataManager;
      this.query = new Query()
        .addParams("salesOrderNo", this.state.salesOrderNo)
        .addParams("poNo", this.state.poNo)
        .addParams("soldTo", this.state.client)
        .addParams("type", this.state.type)
        .addParams("checkedBy", this.state.checkedBy);
      this.grid.query = this.query;
      this.grid.refresh();
    }
  }

  handleSearchBtn() {
    this.loadSiDrs();
  }

  handleAddBtn() {
    // console.log("handleAddBtn");
    this.props.history.push("/siDrAdd");
  }

  handleRenderSalesOrderNoHyperlink(args: any) {
    console.log(args.data);
    if (args.column.field === "salesOrderNo") {
      ReactDOM.render(
        <HashRouter>
          <Link to={"/siDrDetails/" + args.data.siDrId}>
            {" "}
            {args.data.salesOrderNo}
          </Link>
        </HashRouter>,
        args.cell
      );
    }
  }

  render() {
    return (
      <div>
        <div className="header">Sales Invoice/Delivery Receipt Search</div>
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Sales Order No: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                onChange={this.handleSalesOrderNoChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">PO No: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                onChange={this.handlePoNoChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Checked By: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                onChange={this.handleCheckedByChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Type: </div>
            <div className="col-sm-4">
              <select
                value={this.state.type}
                className="form-control"
                onChange={this.handleTypeChange.bind(this)}
                onBlur={this.handleTypeChange.bind(this)}
              >
                <option key="" value=""></option>
                <option key="1" value="1">
                  Sales Invoice
                </option>
                <option key="2" value="2">
                  Delivery Receipt
                </option>
              </select>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Client: </div>
            <div className="col-sm-4">
            <input
                type="text"
                className="form-control"
                onChange={this.handleClientChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-5">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={this.handleAddBtn.bind(this)}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={this.handleSearchBtn.bind(this)}
              >
                Search
              </button>
            </div>
          </div>
          <br />
          <GridComponent
            dataSource={this.dataManager}
            gridLines={"Both"}
            rowHeight={40}
            allowPaging={true}
            pageSettings={{ pageCount: 5, pageSize: 10 }}
            style={{ width: "100%" }}
            allowSorting={true}
            ref={(g) => (this.grid = g)}
            queryCellInfo={this.handleRenderSalesOrderNoHyperlink.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText="Sales Order No"
                field="salesOrderNo"
              />
              <ColumnDirective headerText="Sold To" field="soldTo" />
              <ColumnDirective headerText="Address" field="address" />
              <ColumnDirective headerText="Total Amount" field="totalAmount" format='N2' />
              <ColumnDirective
                headerText="Date"
                field="date"
                format="MM/dd/yyyy"
                type="date"
              />
              <ColumnDirective headerText="PO No" field="poNo" />
              <ColumnDirective headerText="TIN" field="tin" />
              <ColumnDirective headerText="Terms" field="terms" />
              <ColumnDirective headerText="Collected" field="collectedInd" />
            </ColumnsDirective>
            <Inject services={[Page, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  }
}

export default SiDrSearch;
