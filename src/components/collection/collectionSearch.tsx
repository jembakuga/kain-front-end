import React, { Component } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import BaseComponent from "../common/baseComponent";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import * as ReactDOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";
import axios from "axios";

class CollectionSearch extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  public formatOption: object = { type: "date", format: "dd/MM/yyyy" };

  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/collection/findCollectionReportItems",
    adaptor: new UrlAdaptor(),
  });

  state: {
    siDrNo: "";
    siDrDate: null;
    mdHospDs: "";
    collectionData: [];
  };

  constructor(props: any) {
    super(props);
    this.state = {
      siDrNo: "",
      siDrDate: null,
      mdHospDs: "",
      collectionData: [],
    };
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params);
    axios
      .post("http://localhost:8080/collection/findCollectionReportItems", {})
      .then((res) => {
        console.log(res.data.result);
        this.setState({
          collectionData: res.data.result,
        });
      });
  }

  handleSiDrNoChange(e: any) {
    this.setState({
      siDrNo: e.target.value,
    });
  }

  handleSiDrDateChange(e: any) {
    this.setState({
      siDrDate: e.value,
    });
  }

  handleMdHospDsChange(e: any) {
    this.setState({
      siDrDate: e.target.value,
    });
  }

  handleSearchBtn() {
    this.loadCollections();
  }

  loadCollections() {
    axios
      .post("http://localhost:8080/collection/findCollectionReportItems", {
        siDrNo: this.state.siDrNo,
        siDrDate : this.state.siDrDate,
        mdHospDrugstore : this.state.mdHospDs
      })
      .then((res) => {
        console.log(res.data.result);
        this.setState({
          collectionData: res.data.result,
        });
      });
  }

  handleAddBtn() {
    // console.log("handleAddBtn");
    this.props.history.push("/collectionAdd");
  }

  handleRendersiDrNoHyperlink(args: any) {
    console.log(args.data);
    if (args.column.field === "siDrNo") {
      ReactDOM.render(
        <HashRouter>
          <Link to={"/collectionDetails/" + args.data.collectionReportId}>
            {" "}
            {args.data.siDrNo}
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
            <div className="col-sm-3">SI/DR No: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                onChange={this.handleSiDrNoChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">SI/DR Date: </div>
            <div className="col-sm-4">
              <DatePickerComponent
                id="siDrDate"
                change={this.handleSiDrDateChange.bind(this)}
                format="MM/dd/yyyy"
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Mds/Hospital/Drugstore: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                onChange={this.handleMdHospDsChange.bind(this)}
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
              dataSource={this.state.collectionData}
              gridLines={"Both"}
              rowHeight={40}
              allowPaging={true}
              pageSettings={{ pageCount: 5, pageSize: 10 }}
              style={{ width: "100%" }}
              allowSorting={true}
              ref={(g) => (this.grid = g)}
              //queryCellInfo={this.handleRendersiDrNoHyperlink.bind(this)}
            >
              <ColumnsDirective>
                <ColumnDirective headerText="Si/Dr No" field="siDrNo" />
                <ColumnDirective
                  headerText="SI/DR Date"
                  field="siDrDate"
                  format="MM/dd/yyyy"
                  type="date"
                />
                <ColumnDirective
                  headerText="OR/PR No"
                  field="orPrNo"
                />
                <ColumnDirective
                  headerText="Name of Bank"
                  field="nameOfBank"
                />
                <ColumnDirective
                  headerText="Check No"
                  field="checkNo"
                />
                <ColumnDirective
                  headerText="MD/Hospital/Drugstore"
                  field="mdHospDrugstore"
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
