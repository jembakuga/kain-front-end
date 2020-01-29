import React, { Component } from "react";
import BaseComponent from "../common/baseComponent";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import axios from "axios";

class SiDrDetails extends BaseComponent {
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

  handleSaveBtn() {
    // console.log("handleSaveBtn");
    // this.props.history.push("/siDrAdd");
    axios
      .post("http://localhost:8080/saveSiDr", {
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
      });
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params);
    if (this.props.match.params.id) {
      axios
        .post("http://localhost:8080/findSiDr", {
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
    }
  }

  render() {
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
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default SiDrDetails;
