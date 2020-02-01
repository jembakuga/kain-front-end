import * as React from "react";
import BaseComponent from "../common/baseComponent";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";

class EmployeeSearch extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/employee/findAllEmployees",
    adaptor: new UrlAdaptor()
  });
  state: {
    employeeId: 0;
    employeeName: "";
    role: 0;
    employeeType: 0;
    joinedDate: Date;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      employeeId: 0,
      employeeName: "",
      role: 0,
      employeeType: 0,
      joinedDate: new Date()
    };
  }

  handlEmployeeNameChange(e: any) {
    this.setState({
      employeeName: e.target.value
    });
  }

  handleEmployeeTypeChange(e: any) {
    console.log(e.target);
    this.setState({
      employeeType: e.target.value
    });
  }

  handlJoinedDateChange(e: any) {
    this.setState({
      joinedDate: e.value
    });
  }

  handleAddBtn() {}

  handleSearchBtn() {
    this.loadEmployees();
  }

  loadEmployees() {
    // console.log(this.state);
    if (this.grid) {
      this.grid.dataSource = this.dataManager;
      this.query = new Query()
        .addParams("employeeName", this.state.employeeName)
        .addParams("employeeType", this.state.employeeType + "");
      this.grid.query = this.query;
      this.grid.refresh();
    }
  }

  render() {
    return (
      <div>
        <div className="header">Product Search</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Employee Name: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                onChange={this.handlEmployeeNameChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Employee Type: </div>
            <div className="col-sm-4">
              <select
                value={this.state.employeeType}
                className="form-control"
                onChange={this.handleEmployeeTypeChange.bind(this)}
                onBlur={this.handleEmployeeTypeChange.bind(this)}
              >
                <option></option>
                <option key="1">Medical Representative</option>
                <option key="2">Checker</option>
              </select>
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
          {/* <div className="row">
            <div className="col-sm-3">Join Date: </div>
            <div className="col-sm-4">
              <DatePickerComponent
                id="dueDate"
                value={this.state.joinedDate}
                change={this.handlJoinedDateChange.bind(this)}
              />
            </div>
          </div>
          <br /> */}
          <GridComponent
            dataSource={this.dataManager}
            gridLines={"Both"}
            rowHeight={40}
            allowPaging={true}
            pageSettings={{ pageCount: 5, pageSize: 10 }}
            style={{ width: "100%" }}
            allowSorting={true}
            ref={g => (this.grid = g)}
            // queryCellInfo={this.handleRenderSalesOrderNoHyperlink.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText="Sales Order No"
                field="salesOrderNo"
              />
              <ColumnDirective headerText="Sold To" field="soldTo" />
              <ColumnDirective headerText="Address" field="address" />
              <ColumnDirective headerText="Date" field="date" />
              <ColumnDirective headerText="PO No" field="poNo" />
              <ColumnDirective headerText="TIN" field="tin" />
              <ColumnDirective headerText="Terms" field="terms" />
            </ColumnsDirective>
            <Inject services={[Page, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  }
}

export default EmployeeSearch;
