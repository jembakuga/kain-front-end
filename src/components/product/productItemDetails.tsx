import * as React from "react";
import { Component } from "react";
import BaseComponent from "../common/baseComponent";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import axios from "axios";
import { DialogUtility } from "@syncfusion/ej2-popups";

class ProductItemDetails extends BaseComponent {
  state = {
    batchNo: "",
    basePrice: 0,
    expiryDate: new Date(),
    arrivalDate: new Date(),
    quantity: 0,
    productId: "",
    productItemId: "",
    isAjaxInProgress: false,
    isEdit: false
  };

  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     batchNo: "",
  //     basePrice: 0,
  //     expiryDate: new Date(),
  //     arrivalDate: new Date(),
  //     quantity: 0,
  //     productId: "",
  //     productItemId: "",
  //     loading: false
  //   };
  // }

  handleQuantityChange(e: any) {
    console.log(e);
    this.setState({
      quantity: e.value
    });
  }
  handlBatchNoChange(e: any) {
    this.setState({
      batchNo: e.target.value
    });
  }
  handleBasePriceChange(e: any) {
    console.log(e);
    this.setState({
      basePrice: e.value
    });
  }

  handlExpiryDateChange(e: any) {
    this.setState({
      expiryDate: e.value
    });
  }

  handlArrivalDateChange(e: any) {
    this.setState({
      arrivalDate: e.value
    });
  }

  componentDidMount() {
    console.log("parameters: ", this.props.match.params);
    this.setState({
      productId: this.props.match.params.productId,
      productItemId: this.props.match.params.productItemId,
      isEdit: this.props.match.params.productItemId ? true : false
    });
    if (this.props.match.params.productItemId) {
      axios
        .post("http://localhost:8080/product/findProductItem", {
          productItemId: this.props.match.params.productItemId
        })
        .then(res => {
          this.setState({
            batchNo: res.data.batchNo,
            basePrice: res.data.basePrice,
            expiryDate: res.data.expiryDate,
            arrivalDate: res.data.arrivalDate,
            quantity: res.data.quantity
          });
        });
    }
  }

  handleAddButton() {
    this.setState({
      isAjaxInProgress: true
    });
    console.log(this.state);
    axios
      .post("http://localhost:8080/product/saveProductItem", {
        productId: this.props.match.params.productId,
        batchNo: this.state.batchNo,
        basePrice: this.state.basePrice,
        expiryDate: this.state.expiryDate,
        arrivalDate: this.state.arrivalDate,
        quantity: this.state.quantity,
        productItemId: this.state.productItemId
        // siDrItemId: this.props.match.params.siDrItemId
      })
      .then(res => {
        console.log(this.state);
        // if (this.state.productId) {
        DialogUtility.confirm({
          animationSettings: { effect: "Zoom" },
          closeOnEscape: true,
          content: "Product added to sales invoice/delivery receipt",
          showCloseIcon: true,
          title: "Product added"
        });
        // this.props.history.push(
        //   "/productDetails/" + this.props.match.params.productId
        // );
        this.setState({
          isAjaxInProgress: false
        });
      });
  }

  handleBackBtn() {
    this.props.history.push(
      "/productDetails/" + this.props.match.params.productId
    );
  }

  render() {
    return (
      <div>
        <div className="header">Input Product Details</div>
        <br />
        {/* {this.state.isAjaxInProgress ? (
          <h1>Loading</h1>
        ) : ( */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Batch No: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                // readOnly={this.state.isEdit}
                value={this.state.batchNo}
                onChange={this.handlBatchNoChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Base Price: </div>
            <div className="col-sm-4">
              <NumericTextBoxComponent
                // readonly={this.state.isEdit}
                value={this.state.basePrice}
                change={this.handleBasePriceChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Quantity: </div>
            <div className="col-sm-4">
              <NumericTextBoxComponent
                // readonly={this.state.isEdit}
                format="n"
                value={this.state.quantity}
                change={this.handleQuantityChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Expiry Date: </div>
            <div className="col-sm-4">
              <DatePickerComponent
                // readonly={this.state.isEdit}
                id="expiryDate"
                value={this.state.expiryDate}
                change={this.handlExpiryDateChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Arrival Date: </div>
            <div className="col-sm-4">
              <DatePickerComponent
                // readonly={this.state.isEdit}
                id="arrivalDate"
                value={this.state.arrivalDate}
                change={this.handlArrivalDateChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-sm-5">
              <button
                // hidden={this.state.isEdit}
                type="button"
                disabled={this.state.isAjaxInProgress}
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={this.handleAddButton.bind(this)}
              >
                Save Product Invetory
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
        {/* )} */}
      </div>
    );
  }
}

export default ProductItemDetails;
