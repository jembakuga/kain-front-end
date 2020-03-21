import React, { Component } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import BaseComponent from "../common/baseComponent";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import * as ReactDOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";

class CollectionSearch extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  public formatOption: object = { type: "date", format: "dd/MM/yyyy" };

  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/collection/findCollections",
    adaptor: new UrlAdaptor()
  });

  state: {
    area: "";
    collectionDate: null;
    submittedBy: "";
  };

  constructor(props: any) {
    super(props);
    this.state = {
      area: "",
      collectionDate: null,
      submittedBy: ""
    };
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params);
  }

  handleAreaChange(e: any) {
    this.setState({
      area: e.target.value
    });
  }

  handleCollectionDateChange(e: any) {
    this.setState({
      collectionDate: e.value
    });
  }

  handleSubmittedByChange(e: any) {
    this.setState({
      collectionDate: e.target.value
    });
  }

  handleSearchBtn() {
    // this.loadProducts();
  }

  handleAddBtn() {
    // console.log("handleAddBtn");
    this.props.history.push("/collectionAdd");
  }

  handleRenderAreaHyperlink(args: any) {
    // console.log(args.data);
    if (args.column.field === "area") {
      ReactDOM.render(
        <HashRouter>
          <Link to={"/collectionDetails/" + args.data.collectionReportId}>
            {" "}
            {args.data.area}
          </Link>
        </HashRouter>,
        args.cell
      );
    }
  }

  render() {
    return (
      <div>
        <div className="header">Collection Search</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Area: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                onChange={this.handleAreaChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Collection Date: </div>
            <div className="col-sm-4">
              <DatePickerComponent
                id="collectionDate"
                change={this.handleCollectionDateChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Submitted By: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                onChange={this.handleSubmittedByChange.bind(this)}
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
          <div>
            <GridComponent
              dataSource={this.dataManager}
              gridLines={"Both"}
              rowHeight={40}
              allowPaging={true}
              pageSettings={{ pageCount: 5, pageSize: 10 }}
              style={{ width: "100%" }}
              allowSorting={true}
              ref={g => (this.grid = g)}
              queryCellInfo={this.handleRenderAreaHyperlink.bind(this)}
            >
              <ColumnsDirective>
                <ColumnDirective headerText="Area" field="area" />
                <ColumnDirective
                  headerText="Collection Date"
                  field="collectionDate"
                />
                <ColumnDirective
                  headerText="Submitted By"
                  field="submittedBy.employeeName"
                />
                <ColumnDirective
                  headerText="Posted By"
                  field="postedBy.employeeName"
                />
                <ColumnDirective
                  headerText="Checked By"
                  field="checkedBy.employeeName"
                />
              </ColumnsDirective>
              <Inject services={[Page, Sort]} />
            </GridComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionSearch;
