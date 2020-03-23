import React, { Component } from "react";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import BaseComponent from "../common/baseComponent";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject
} from "@syncfusion/ej2-react-grids";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import { DialogUtility } from "@syncfusion/ej2-popups";
import { HashRouter, Link } from "react-router-dom";
import * as ReactDOM from "react-dom";

class CollectionDetails extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;

  state: {
    collectionReportId: "";
    area: "";
    collectionDate: Date;
    submittedBy: "";
    postedBy: "";
    checkedBy: "";
    employeeList: [];
  };

  constructor(props: any) {
    super(props);
    this.state = {
      collectionReportId: "",
      area: "",
      collectionDate: new Date(),
      submittedBy: "",
      postedBy: "",
      checkedBy: "",
      employeeList: []
    };
  }

  private dataManager: DataManager = new DataManager({
    url:
      "http://localhost:8080/collection/findCollectionReportItemByCollectionReport",
    adaptor: new UrlAdaptor()
  });

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params.collectionId);

    axios.post("http://localhost:8080/employee/findAllEmployees").then(res => {
      console.log(res.data);
      this.setState({
        employeeList: res.data
      });
    });

    if (this.props.match.params.collectionId) {
      axios
        .post("http://localhost:8080/collection/findCollectionById", {
          collectionReportId: this.props.match.params.collectionId
        })
        .then(res => {
          console.log(res.data);
          this.setState({
            area: res.data.area,
            collectionDate: res.data.collectionDate,
            checkedBy: res.data.checkedBy ? res.data.checkedBy.employeeId : "",
            postedBy: res.data.postedBy ? res.data.postedBy.employeeId : "",
            submittedBy: res.data.submittedBy
              ? res.data.submittedBy.employeeId
              : ""
          });
        });

      if (this.grid) {
        this.grid.dataSource = this.dataManager;
        this.query = new Query().addParams(
          "collectionReportId",
          this.props.match.params.collectionId
        );
        this.grid.query = this.query;
      }
    }
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
      submittedBy: e.target.value
    });
  }

  handlePostedByChange(e: any) {
    this.setState({
      postedBy: e.target.value
    });
  }

  handleCheckedByChange(e: any) {
    this.setState({
      checkedBy: e.target.value
    });
  }

  handleBackBtn() {
    this.props.history.push("/collectionSearch");
  }

  handleAddBtn() {
    axios
      .post("http://localhost:8080/collection/saveCollectionReport", {
        area: this.state.area,
        submittedById: this.state.submittedBy,
        postedById: this.state.postedBy,
        checkedById: this.state.checkedBy,
        collectionDate: this.state.collectionDate,
        collectionReportId: this.props.match.params.collectionId
      })
      .then(res => {
        console.log(res);
        this.setState({
          collectionReportId: this.props.match.params.collectionId
        });
        if (this.state.collectionReportId) {
          DialogUtility.alert({
            animationSettings: { effect: "Zoom" },
            closeOnEscape: true,
            content: "Area " + this.state.area + " created",
            // okButton: { text: "OK", click: this.okClick.bind(this) },
            showCloseIcon: true,
            title: "Area Created"
          });
        }
        console.log("collectionReportId " + this.state.collectionReportId);
        this.props.history.push(
          "/collectionSearch/" + this.state.collectionReportId
        );
      });
  }

  handleAddToCollBtn() {
    this.props.history.push(
      "/collectionItemDetails/" + this.props.match.params.collectionId
    );
  }

  handleRenderHyperlink(args: any) {
    console.log(args.data);
    if (args.column.field === "checkNo") {
      ReactDOM.render(
        <HashRouter>
          <Link
            to={
              "/collectionItemDetailsEdit/" +
              this.props.match.params.collectionId +
              "/" +
              args.data.collectionReportItemId
            }
          >
            {" "}
            {args.data.checkNo}
          </Link>
        </HashRouter>,
        args.cell
      );
    }
  }

  render() {
    let ds = null;
    let count = 0;
    if (this.state.employeeList) {
      ds = this.state.employeeList.map(item => (
        <option key={item["employeeId"]} value={item["employeeId"]}>
          {item["employeeName"]}
        </option>
      ));
    }

    return (
      <div>
        <div className="header">Collection Add</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Area: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={this.state.area}
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
              <select
                value={this.state.submittedBy}
                className="form-control"
                onChange={this.handleSubmittedByChange.bind(this)}
                onBlur={this.handleSubmittedByChange.bind(this)}
              >
                {ds}
              </select>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Posted By: </div>
            <div className="col-sm-4">
              <select
                value={this.state.postedBy}
                className="form-control"
                onChange={this.handlePostedByChange.bind(this)}
                onBlur={this.handlePostedByChange.bind(this)}
              >
                {ds}
              </select>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Checked By: </div>
            <div className="col-sm-4">
              <select
                value={this.state.checkedBy}
                className="form-control"
                onChange={this.handleCheckedByChange.bind(this)}
                onBlur={this.handleCheckedByChange.bind(this)}
              >
                {ds}
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
                Save
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={this.handleBackBtn.bind(this)}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={this.handleAddToCollBtn.bind(this)}
              >
                Add To Collection
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
              queryCellInfo={this.handleRenderHyperlink.bind(this)}
            >
              <ColumnsDirective>
                <ColumnDirective headerText="Check No" field="checkNo" />
                <ColumnDirective headerText="Name of Bank" field="nameOfBank" />
                <ColumnDirective headerText="SI/DR Date" field="siDrDate" />
                <ColumnDirective
                  headerText="MDs/Hospital/Drugstore"
                  field="mdHospDrugstore"
                />
                <ColumnDirective headerText="SI/DR No" field="siDrNo" />
                <ColumnDirective headerText="OR/PR No" field="orPrNo" />
                <ColumnDirective headerText="Amount" field="amount" />
              </ColumnsDirective>
              <Inject services={[Page, Sort]} />
            </GridComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionDetails;
