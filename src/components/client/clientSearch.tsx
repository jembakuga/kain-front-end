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

class ClientSearch extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/client/findDistinctClients",
    adaptor: new UrlAdaptor(),
  });
  state: {
    clientName: "";
  };

  constructor(props: any) {
    super(props);
    this.state = {
      clientName: "",
    };
  }

  handleClientNameChange(e: any) {
    this.setState({
      clientName: e.target.value,
    });
  }

  handleAddBtn() {
    this.props.history.push("/employeeAdd");
  }

  handleSearchBtn() {
    this.loadSiDrs();
  }

  loadSiDrs() {
    // console.log(this.state);
    if (this.grid) {
      this.grid.dataSource = this.dataManager;
      this.query = new Query()
        .addParams("soldTo", this.state.clientName)
      this.grid.query = this.query;
      this.grid.refresh();
    }
  }

  handleRenderEmployeeCodeHyperlink(args: any) {
    console.log(args);
    if (args.column.field === "soldTo") {
      ReactDOM.render(
        <HashRouter>
          <Link to={"/clientDetails/" + args.data.soldTo}>
            {" "}
            {args.data.soldTo}
          </Link>
        </HashRouter>,
        args.cell
      );
    }
  }

  render() {
    return (
      <div>
        <div className="header">Client Search</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Client Name: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                onChange={this.handleClientNameChange.bind(this)}
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
            queryCellInfo={this.handleRenderEmployeeCodeHyperlink.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText="Client Name"
                field="soldTo"
              />              
            </ColumnsDirective>
            <Inject services={[Page, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  }
}

export default ClientSearch;
