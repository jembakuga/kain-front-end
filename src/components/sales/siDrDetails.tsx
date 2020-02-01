import React from "react";
import BaseComponent from "../common/baseComponent";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
// import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import axios from "axios";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject,
  CommandModel,
  Edit,
  EditSettingsModel,
  CommandColumn,
  CommandClickEventArgs
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import * as ReactDOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";
import { DialogUtility } from "@syncfusion/ej2-popups";

class SiDrDetails extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  state: {
    siDrId: "";
    salesOrderNo: "";
    poNo: "";
    checkedBy: "";
    dueDate: Date;
    date: Date;
    issueDate: Date;
    soldTo: "";
    address: "";
    tin: "";
    businessStyle: "";
    terms: "";
    deliveredBy: "";
  };
  constructor(props: any) {
    super(props);
    this.state = {
      siDrId: "",
      salesOrderNo: "",
      poNo: "",
      checkedBy: "",
      soldTo: "",
      address: "",
      tin: "",
      businessStyle: "",
      terms: "",
      deliveredBy: "",
      dueDate: new Date(),
      date: new Date(),
      issueDate: new Date()
    };
  }
  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/salesOrder/findSiDrItemsBySiDr",
    adaptor: new UrlAdaptor()
  });

  public editOptions: EditSettingsModel = {
    allowEditing: true,
    allowDeleting: true
  };

  handleSalesOrderNoChange(e: any) {
    this.setState({
      salesOrderNo: e.target.value
    });
  }
  handlePoNoChange(e: any) {
    this.setState({
      poNo: e.target.value
    });
  }
  handleCheckedByChange(e: any) {
    this.setState({
      checkedBy: e.target.value
    });
  }
  handleSoldToChange(e: any) {
    this.setState({
      soldTo: e.target.value
    });
  }
  handlDueDateChange(e: any) {
    this.setState({
      dueDate: e.value
    });
  }
  handleAddressChange(e: any) {
    this.setState({
      address: e.target.value
    });
  }
  handleTinChange(e: any) {
    this.setState({
      tin: e.target.value
    });
  }
  handleTermsChange(e: any) {
    this.setState({
      terms: e.target.value
    });
  }
  handleBusinessStlyeChange(e: any) {
    this.setState({
      businessStyle: e.target.value
    });
  }
  handleDeliveredByChange(e: any) {
    this.setState({
      deliveredBy: e.target.value
    });
  }
  handleDateChange(e: any) {
    this.setState({
      date: e.value
    });
  }
  handleIssueDateChange(e: any) {
    this.setState({
      issueDate: e.value
    });
  }

  handleBackBtn() {
    this.props.history.push("/siDrSearch");
  }
  handleAddProductButton() {
    this.props.history.push("/siDrItemDetails/" + this.state.siDrId);
  }
  handleSaveBtn() {
    axios
      .post("http://localhost:8080/salesOrder/saveSiDr", {
        siDrId: this.props.match.params.id,
        salesOrderNo: this.state.salesOrderNo,
        soldTo: this.state.soldTo,
        address: this.state.address,
        tin: this.state.tin,
        issueDate: this.state.date,
        poNo: this.state.poNo,
        terms: this.state.terms,
        dueDate: this.state.dueDate,
        date: this.state.date,
        checkedBy: this.state.checkedBy,
        deliveredBy: this.state.deliveredBy
      })
      .then(res => {
        console.log(res);
        this.setState({
          siDrId: res.data.siDrId
        });
        if (this.state.siDrId) {
          DialogUtility.alert({
            animationSettings: { effect: "Zoom" },
            closeOnEscape: true,
            content:
              "Sales Invoice/Delivery Receipt " +
              this.state.salesOrderNo +
              " created",
            // okButton: { text: "OK", click: this.okClick.bind(this) },
            showCloseIcon: true,
            title: "Sales Invoice/Delivery Receipt Created"
          });
        }
      });
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params);
    if (this.props.match.params.id) {
      axios
        .post("http://localhost:8080/salesOrder/findSiDr", {
          siDrId: this.props.match.params.id
        })
        .then(res => {
          console.log(res.data.salesOrderNo);
          this.setState({
            siDrId: res.data.siDrId,
            salesOrderNo: res.data.salesOrderNo,
            soldTo: res.data.soldTo,
            address: res.data.address,
            tin: res.data.tin,
            businessStyle: res.data.businessStyle,
            poNo: res.data.poNo,
            terms: res.data.terms,
            deliveredBy: res.data.deliveredBy,
            issueDate: res.data.issueDate,
            date: res.data.date,
            dueDate: res.data.dueDate
          });
        });

      if (this.grid) {
        this.grid.dataSource = this.dataManager;
        this.query = new Query().addParams(
          "siDrId",
          this.props.match.params.id
        );
        // console.log("asdfsda");
        this.grid.query = this.query;
      }
    }
  }

  handleProductCodeHyperlink(args: any) {
    console.log(args.data);
    if (args.column.field === "productBean.productCode") {
      ReactDOM.render(
        <HashRouter>
          <Link
            to={
              "/siDrItemDetailsEdit/" +
              this.props.match.params.id +
              "/" +
              args.data.siDrItemId
            }
          >
            {" "}
            {args.data.productBean.productCode}
          </Link>
        </HashRouter>,
        args.cell
      );
    }
  }

  public commands: CommandModel[] = [
    {
      buttonOption: {
        content: "Remove",
        cssClass: "e-flat"
      }
    }
  ];

  public commandClick(args: CommandClickEventArgs): void {
    if (this.grid) {
      let data = JSON.parse(JSON.stringify(args.rowData));
      axios
        .post("http://localhost:8080/salesOrder/deleteSiDrItemById", {
          siDrItemId: data.siDrItemId
        })
        .then(res => {
          console.log(res.data.salesOrderNo);
          this.setState({
            siDrId: res.data.siDrId,
            salesOrderNo: res.data.salesOrderNo,
            soldTo: res.data.soldTo,
            address: res.data.address,
            tin: res.data.tin,
            businessStyle: res.data.businessStyle,
            poNo: res.data.poNo,
            terms: res.data.terms,
            deliveredBy: res.data.deliveredBy,
            issueDate: res.data.issueDate,
            date: res.data.date,
            dueDate: res.data.dueDate
          });
        });
      this.grid.dataSource = this.dataManager;
      this.query = new Query().addParams("siDrId", this.props.match.params.id);
      // console.log("asdfsda");
      this.grid.query = this.query;
      this.grid.refresh();
    }
  }

  render() {
    this.commandClick = this.commandClick.bind(this);
    return (
      <div>
        <div className="header">Sales Invoice/Delivery Receipt Create</div>
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">Sales Order No: </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                value={this.state.salesOrderNo}
                onChange={this.handleSalesOrderNoChange.bind(this)}
              />
            </div>
            <div className="col-sm-2">Issue Date: </div>
            <div className="col-sm-3">
              <DatePickerComponent
                id="issueDate"
                value={this.state.issueDate}
                change={this.handleIssueDateChange.bind(this)}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">Sold To: </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                value={this.state.soldTo}
                onChange={this.handleSoldToChange.bind(this)}
              />
            </div>
            <div className="col-sm-2">Date: </div>
            <div className="col-sm-3">
              <DatePickerComponent
                id="date"
                value={this.state.date}
                change={this.handleDateChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">Address: </div>
            <div className="col-sm-3">
              <input
                type="text"
                value={this.state.address}
                className="form-control"
                onChange={this.handleAddressChange.bind(this)}
              />
            </div>
            <div className="col-sm-2">PO No: </div>
            <div className="col-sm-3">
              <input
                type="text"
                value={this.state.poNo}
                className="form-control"
                onChange={this.handlePoNoChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">TIN: </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                value={this.state.tin}
                onChange={this.handleTinChange.bind(this)}
              />
            </div>
            <div className="col-sm-2">Terms: </div>
            <div className="col-sm-3">
              <input
                type="text"
                value={this.state.terms}
                className="form-control"
                onChange={this.handleTermsChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">Business Style: </div>
            <div className="col-sm-3">
              <input
                type="text"
                value={this.state.businessStyle}
                className="form-control"
                onChange={this.handleBusinessStlyeChange.bind(this)}
              />
            </div>
            <div className="col-sm-2">Due Date: </div>
            <div className="col-sm-3">
              <DatePickerComponent
                id="dueDate"
                value={this.state.dueDate}
                change={this.handlDueDateChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">Checked By: </div>
            <div className="col-sm-3">
              <input
                type="text"
                value={this.state.checkedBy}
                className="form-control"
                onChange={this.handleCheckedByChange.bind(this)}
              />
            </div>
            <div className="col-sm-2">Delivered By: </div>
            <div className="col-sm-3">
              <input
                type="text"
                value={this.state.deliveredBy}
                className="form-control"
                onChange={this.handleDeliveredByChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">Date: </div>
            <div className="col-sm-3">
              <DatePickerComponent
                value={this.state.date}
                change={this.handlDueDateChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-5">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={this.handleSaveBtn.bind(this)}
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
                onClick={this.handleAddProductButton.bind(this)}
              >
                Add Product
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                // onClick={this.handleAddProductButton.bind(this)}
              >
                Print
              </button>
            </div>
            <br />
            <br />
            <div>
              <GridComponent
                editSettings={this.editOptions}
                commandClick={this.commandClick}
                gridLines={"Both"}
                rowHeight={40}
                allowPaging={true}
                pageSettings={{ pageCount: 5, pageSize: 10 }}
                style={{ width: "100%" }}
                allowSorting={true}
                ref={g => (this.grid = g)}
                queryCellInfo={this.handleProductCodeHyperlink.bind(this)}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    headerText="Product Code"
                    field="productBean.productCode"
                  />
                  <ColumnDirective
                    headerText="Description"
                    field="description"
                  />
                  <ColumnDirective headerText="Quantity" field="quantity" />
                  <ColumnDirective headerText="Unit" field="unit" />

                  <ColumnDirective
                    headerText="Lot/Batch No"
                    field="lotBatchNo"
                  />
                  <ColumnDirective
                    headerText="Expiry Date"
                    field="expiryDate"
                  />
                  <ColumnDirective headerText="Unit Price" field="unitPrice" />
                  <ColumnDirective headerText="Amount" field="amount" />
                  <ColumnDirective
                    headerText="Action"
                    width="120"
                    commands={this.commands}
                  />
                </ColumnsDirective>
                <Inject services={[Edit, CommandColumn]} />
              </GridComponent>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default SiDrDetails;
