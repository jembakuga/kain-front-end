import * as React from "react";
import { Component } from "react";
import BaseComponent from "../common/baseComponent";
import axios from "axios";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DialogUtility } from "@syncfusion/ej2-popups";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";

class CollectionItemDetails extends BaseComponent {
  state: {
    siDrDate: Date;
    mdHospDrugstore: "";
    nameOfBank: "";
    checkNo: "";
    siDrId: "";
    orPrNo: "";
    amount: 0;
    collectionId: "";
    collectionItemId: "";
    siDrColl: [];
  };

  constructor(props: any) {
    super(props);
    this.state = {
      siDrDate: new Date(),
      mdHospDrugstore: "",
      nameOfBank: "",
      checkNo: "",
      siDrId: "",
      orPrNo: "",
      amount: 0,
      collectionId: "",
      collectionItemId: "",
      siDrColl: []
    };
  }

  componentDidMount() {
    // console.log(
    //   "collection item details componendDidMount",
    //   this.props.match.params
    // );
    this.setState({
      collectionId: this.props.match.params.collectionId,
      collectionItemId: this.props.match.params.collectionItemId
    });
    if (this.props.match.params.collectionItemId) {
      axios
        .post("http://localhost:8080/collection/findCollectionReportItemById", {
          collectionReportId: this.props.match.params.collectionId,
          collectionReportItemId: this.props.match.params.collectionItemId
        })
        .then(res => {
          // console.log(res.data);
          this.setState({
            siDrDate: res.data.siDrDate,
            mdHospDrugstore: res.data.mdHospDrugstore,
            nameOfBank: res.data.nameOfBank,
            checkNo: res.data.checkNo,
            siDrId: res.data.siDrId,
            orPrNo: res.data.orPrNo,
            amount: res.data.amount
          });
        });
    }

    axios
      .post("http://localhost:8080/salesOrder/findUncollectedSiDr")
      .then(res => {
        console.log(res.data);
        this.setState({
          siDrColl: res.data.siDrKeyValueList
        });
      });
  }

  handleSiDrDateChange(e: any) {
    this.setState({
      collectionDate: e.value
    });
  }
  handleSiDrNoChange(e: any) {
    this.setState({
      siDrId: e.target.value
    });
  }

  handleMdHospDrugstoreChange(e: any) {
    this.setState({
      mdHospDrugstore: e.target.value
    });
  }

  handleOrPrNoChange(e: any) {
    this.setState({
      orPrNo: e.target.value
    });
  }

  handleNameOfBankChange(e: any) {
    this.setState({
      nameOfBank: e.target.value
    });
  }

  handleCheckNoChange(e: any) {
    this.setState({
      checkNo: e.target.value
    });
  }

  handleAmountChange(e: any) {
    this.setState({
      amount: e.value
    });
  }

  handleSaveCollectionItemButton() {
    axios
      .post("http://localhost:8080/collection/saveCollectionReportItem", {
        collectionReportId: this.state.collectionId,
        collectionReportItemId: this.state.collectionItemId,
        siDrDate: this.state.siDrDate,
        mdHospDrugstore: this.state.mdHospDrugstore,
        nameOfBank: this.state.nameOfBank,
        checkNo: this.state.checkNo,
        siDrId: this.state.siDrId,
        orPrNo: this.state.orPrNo,
        amount: this.state.amount
      })
      .then(res => {
        console.log(res);
        // if (this.state.productId) {
        DialogUtility.alert({
          animationSettings: { effect: "Zoom" },
          closeOnEscape: true,
          content: "Collection item added to collection",
          showCloseIcon: true,
          title: "Collection item added"
        });
        this.props.history.push(
          "/collectionDetails/" + this.state.collectionId
        );
      });
  }
  handleBackBtn() {
    this.props.history.push("/collectionDetails/" + this.state.collectionId);
  }

  render() {
    let ds = null;
    console.log(this.state.siDrColl);
    let count = 0;
    if (this.state.siDrColl) {
      ds = this.state.siDrColl.map(item => (
        <option key={item["key"]} value={item["key"]}>
          {item["value"]}
        </option>
      ));
    }

    return (
      <div>
        <div className="header">Input Collection Item Details</div>
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">SI/DR No: </div>
            <div className="col-sm-3">
              <select
                value={this.state.siDrId}
                className="form-control"
                onChange={this.handleSiDrNoChange.bind(this)}
                // onBlur={this.handleProductChange.bind(this)}
              >
                <option></option>
                {ds}
              </select>
              {/* <input
                type="text"
                className="form-control"
                value={this.state.siDrId}
                onChange={this.handleSiDrNoChange.bind(this)}
              /> */}
            </div>
            <div className="col-sm-2">SI/DR Date: </div>
            <div className="col-sm-3">
              <DatePickerComponent
                id="dueDate"
                value={this.state.siDrDate}
                change={this.handleSiDrDateChange.bind(this)}
              />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-sm-2">MDs/Hospital/Drugstore: </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                value={this.state.mdHospDrugstore}
                onChange={this.handleMdHospDrugstoreChange.bind(this)}
              />
            </div>
            <div className="col-sm-2">OR/PR No: </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                value={this.state.orPrNo}
                onChange={this.handleOrPrNoChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">Name of Bank: </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                value={this.state.nameOfBank}
                onChange={this.handleNameOfBankChange.bind(this)}
              />
            </div>
            <div className="col-sm-2">Check No: </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                value={this.state.checkNo}
                onChange={this.handleCheckNoChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">Amount: </div>
            <div className="col-sm-3">
              <NumericTextBoxComponent
                format="n"
                value={this.state.amount}
                change={this.handleAmountChange.bind(this)}
              />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-sm-5">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={this.handleSaveCollectionItemButton.bind(this)}
              >
                Save Collection Item
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
        </div>
      </div>
    );
  }
}

export default CollectionItemDetails;
