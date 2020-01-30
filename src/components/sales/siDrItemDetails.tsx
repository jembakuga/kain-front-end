import * as React from "react";
import BaseComponent from "../common/baseComponent";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";

class SiDrItemDetails extends BaseComponent {
  state: {
    quantity: 0;
    unit: "";
    productId: 0;
    description: "";
    lotBatchNo: "";
    expiryDate: Date;
    unitPrice: 0;
    amount: 0;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      quantity: 0,
      unit: "",
      productId: 0,
      description: "",
      lotBatchNo: "",
      expiryDate: new Date(),
      unitPrice: 0,
      amount: 0
    };
  }
  handleQuantityChange(e: any) {
    this.setState({
      quantity: e.value
    });
    if (this.state.quantity && this.state.unitPrice) {
      this.setState({
        amount: this.state.quantity * this.state.unitPrice
      });
    }
  }
  handleUnitChange(e: any) {
    this.setState({
      unit: e.target.value
    });
  }
  handleDescriptionChange(e: any) {
    this.setState({
      description: e.target.value
    });
  }
  handleLotBatchNoChange(e: any) {
    this.setState({
      lotBatchNo: e.target.value
    });
  }
  handlExpiryDateChange(e: any) {
    this.setState({
      expiryDate: e.value
    });
  }
  handleUnitPriceChange(e: any) {
    this.setState({
      unitPrice: e.value
    });
    if (this.state.quantity && this.state.unitPrice) {
      this.setState({
        amount: this.state.quantity * this.state.unitPrice
      });
    }
  }
  handleAmountChange(e: any) {
    this.setState({
      amount: e.value
    });
  }
  handleProductIdChange(e: any) {
    this.setState({
      productId: e.target.value
    });
  }
  componentDidMount() {
    console.log("componentDidMount", this.props.match.params);
  }

  handleAddButton() {
    axios
      .post("http://localhost:8080/saveSiDrItem", {
        siDrId: this.props.match.params.id,
        quantity: this.state.quantity,
        unit: this.state.unit,
        productId: this.state.productId,
        description: this.state.description,
        lotBatchNo: this.state.lotBatchNo,
        expiryDate: this.state.expiryDate,
        amount: this.state.amount
      })
      .then(res => {
        console.log(res);
      });
  }
  render() {
    return (
      <div>
        <div className="header">Input Product</div>
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Quantity: </div>
            <div className="col-sm-4">
              <NumericTextBoxComponent
                value={this.state.quantity}
                change={this.handleQuantityChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Unit: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={this.state.unit}
                onChange={this.handleUnitChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Product: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={this.state.productId}
                onChange={this.handleProductIdChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Description: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={this.state.description}
                onChange={this.handleDescriptionChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Lot/Batch No: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={this.state.lotBatchNo}
                onChange={this.handleLotBatchNoChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Expiry Date: </div>
            <div className="col-sm-4">
              <DatePickerComponent
                id="dueDate"
                value={this.state.expiryDate}
                change={this.handlExpiryDateChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Unit Price: </div>
            <div className="col-sm-4">
              <NumericTextBoxComponent
                value={this.state.unitPrice}
                change={this.handleUnitPriceChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Amount: </div>
            <div className="col-sm-4">
              <NumericTextBoxComponent
                readOnly
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
                onClick={this.handleAddButton.bind(this)}
              >
                Save Product to Invoice/DR
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                // onClick={this.handleBackBtn.bind(this)}
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

export default SiDrItemDetails;
