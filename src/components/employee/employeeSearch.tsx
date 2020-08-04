import * as React from "react";
import BaseComponent from "../common/baseComponent";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import * as ReactDOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";

class EmployeeSearch extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/employee/findEmployees",
    adaptor: new UrlAdaptor(),
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
      joinedDate: new Date(),
    };
  }

  handlEmployeeNameChange(e: any) {
    this.setState({
      employeeName: e.target.value,
    });
  }

  handleEmployeeTypeChange(e: any) {
    console.log(e.target);
    this.setState({
      employeeType: e.target.value,
    });
  }

  handlJoinedDateChange(e: any) {
    this.setState({
      joinedDate: e.value,
    });
  }

  handleAddBtn() {
    this.props.history.push("/employeeAdd");
  }

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

  handleRenderEmployeeCodeHyperlink(args: any) {
    // console.log(args.data);
    if (args.column.field === "employeeName") {
      ReactDOM.render(
        <HashRouter>
          <Link to={"/employeeDetails/" + args.data.employeeId}>
            {" "}
            {args.data.employeeName}
          </Link>
        </HashRouter>,
        args.cell
      );
    }
  }

  render() {
    return (
      <div>
        <div className="header">Employee Search</div>
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
                <option key="1" value="1">
                  Medical Representative
                </option>
                <option key="2" value="2">
                  Checker
                </option>
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

          <GridComponent
            dataSource={this.dataManager}
            gridLines={"Both"}
            rowHeight={40}
            allowPaging={true}
            pageSettings={{ pageCount: 5, pageSize: 10 }}
            style={{ width: "100%" }}
            allowSorting={true}
            ref={(g) => (this.grid = g)}
            queryCellInfo={this.handleRenderEmployeeCodeHyperlink.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText="Employee Name"
                field="employeeName"
              />
              <ColumnDirective
                headerText="Employee Type"
                field="employeeTypeString"
              />
              <ColumnDirective
                headerText="Joined Date"
                field="joinedDate"
                format="MM/dd/yyyy"
                type="date"
              />
            </ColumnsDirective>
            <Inject services={[Page, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  }
}

export default EmployeeSearch;
