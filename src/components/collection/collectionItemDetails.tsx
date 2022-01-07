import * as React from "react";
import { Component } from "react";
import BaseComponent from "../common/baseComponent";
import axios from "axios";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DialogUtility } from "@syncfusion/ej2-popups";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { FormValidator, FormValidatorModel } from "@syncfusion/ej2-inputs";

class CollectionItemDetails extends BaseComponent {
  private formObject: FormValidator;

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
    siDrNo: "";
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
      siDrColl: [],
      siDrNo: "",
    };
  }

  componentDidMount() {
    this.setState({
      collectionId: this.props.match.params.collectionId,
      collectionItemId: this.props.match.params.collectionItemId,
    });
    if (this.props.match.params.collectionItemId) {
      axios
        .post("http://localhost:8080/collection/findCollectionReportItemById", {
          collectionReportId: this.props.match.params.collectionId,
          collectionReportItemId: this.props.match.params.collectionItemId,
        })
        .then((res) => {
          this.setState({
            siDrDate: res.data.siDrDate,
            mdHospDrugstore: res.data.mdHospDrugstore,
            nameOfBank: res.data.nameOfBank,
            checkNo: res.data.checkNo,
            siDrId: res.data.siDrId,
            orPrNo: res.data.orPrNo,
            amount: res.data.amount,
            siDrNo: res.data.siDrNo,
            siDrColl: [{ key: res.data.siDrId, value: res.data.siDrNo }],
          });
        });
    }
    console.log(this.state);
    if (!this.props.match.params.collectionItemId) {
      axios
        .post("http://localhost:8080/salesOrder/findUncollectedSiDr")
        .then((res) => {
          console.log(res.data);
          this.setState({
            siDrColl: res.data.siDrKeyValueList,
          });
        });
    }
    let rules = {
      mdHospDrugstore: { required: true },
      siDrNo: { required: true },
      amount: { required: true },
      checkNo: { required: true },
      nameOfBank: { required: true },
      orPrNo: { required: true },
    };

    let requiredFields: FormValidatorModel = {
      rules: rules,
    };

    this.formObject = new FormValidator("#form-element", requiredFields);
  }

  handleSiDrDateChange(e: any) {
    this.setState({
      collectionDate: e.value,
    });
  }
  handleSiDrNoChange(e: any) {
    this.setState({
      siDrId: e.target.value,
    });
    axios
      .post("http://localhost:8080/salesOrder/findSiDr", {
        siDrId: e.target.value,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          mdHospDrugstore: res.data.soldTo
        });
      });
  }

  handleMdHospDrugstoreChange(e: any) {
    this.setState({
      mdHospDrugstore: e.target.value,
    });
  }

  handleOrPrNoChange(e: any) {
    this.setState({
      orPrNo: e.target.value,
    });
  }

  handleNameOfBankChange(e: any) {
    this.setState({
      nameOfBank: e.target.value,
    });
  }

  handleCheckNoChange(e: any) {
    this.setState({
      checkNo: e.target.value,
    });
  }

  handleAmountChange(e: any) {
    this.setState({
      amount: e.value,
    });
  }

  handleSaveCollectionItemButton() {
    if (this.formObject.validate() == true) {
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
          amount: this.state.amount,
        })
        .then((res) => {
          console.log(res);
          // if (this.state.productId) {
          DialogUtility.alert({
            animationSettings: { effect: "Zoom" },
            closeOnEscape: true,
            content: "Collection item added to collection",
            showCloseIcon: true,
            title: "Collection item added",
          });
          this.props.history.push(
            "/collectionSearch/"
          );
        });
    }
  }
  handleBackBtn() {
    this.props.history.push("/collectionSearch/");
  }

  render() {
    let ds = null;
    console.log(this.state.siDrColl);
    let count = 0;
    if (this.state.siDrColl) {
      ds = this.state.siDrColl.map((item) => (
        <option key={item["key"]} value={item["key"]}>
          {item["value"]}
        </option>
      ));
    }

    return (
      <div>
        <div className="header">Input Collection Item Details</div>
        <br />
        <form id="form-element">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">SI/DR No: </div>
              <div className="col-sm-3">
                <select
                  value={this.state.siDrId}
                  className="form-control"
                  onChange={this.handleSiDrNoChange.bind(this)}
                  id="siDrNo"
                  name="siDrNo"
                  disabled={
                    this.props.match.params.collectionItemId ? true : false
                  }
                >
                  <option></option>
                  {ds}
                </select>
              </div>
              <div className="col-sm-2">SI/DR Date: </div>
              <div className="col-sm-3">
                <DatePickerComponent
                  id="dueDate"
                  value={this.state.siDrDate}
                  change={this.handleSiDrDateChange.bind(this)}
                  format="MM/dd/yyyy"
                />
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-sm-2">MDs/Hospital/Drugstore: </div>
              <div className="col-sm-3">
                <input
                  type="text"
                  id="mdHospDrugstore"
                  name="mdHospDrugstore"
                  className="form-control"
                  value={this.state.mdHospDrugstore}
                  onChange={this.handleMdHospDrugstoreChange.bind(this)}
                  readOnly
                />
              </div>
              <div className="col-sm-2">OR/PR No: </div>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id="orPrNo"
                  name="orPrNo"
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
                  id="nameOfBank"
                  name="nameOfBank"
                  className="form-control"
                  value={this.state.nameOfBank}
                  onChange={this.handleNameOfBankChange.bind(this)}
                />
              </div>
              <div className="col-sm-2">Check No: </div>
              <div className="col-sm-3">
                <input
                  type="text"
                  id="checkNo"
                  name="checkNo"
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
                  id="amount"
                  name="amount"
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
        </form>
      </div>
    );
  }
}

export default CollectionItemDetails;
