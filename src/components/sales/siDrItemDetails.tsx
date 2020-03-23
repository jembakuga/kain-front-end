import * as React from "react";
import BaseComponent from "../common/baseComponent";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import axios from "axios";
import { DialogUtility } from "@syncfusion/ej2-popups";

class SiDrItemDetails extends BaseComponent {
  private statusCodeCombo: ComboBoxComponent;
  public comboFields: object = { text: "value", value: "key" };
  state: {
    quantity: 0;
    unit: "";
    productId: 0;
    description: "";
    lotBatchNo: "";
    expiryDate: Date;
    unitPrice: 0;
    amount: 0;
    products: [];
    availProdCount: 0;
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
      amount: 0,
      products: [],
      availProdCount: 0
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
  handleAvailProdCountChange(e: any) {
    this.setState({
      availProdCount: e.target.value
    });
  }
  handleProductChange(e: any) {
    // console.log(e.target.value);
    this.setState({
      productId: e.target.value
    });
    // console.log(this.state.productId);
    axios
      .post("http://localhost:8080/product/findAvailableProductCount", {
        productId: e.target.value
      })
      .then(res => {
        console.log(res);
        this.setState({
          availProdCount: res.data
        });
      });
  }
  componentDidMount() {
    console.log("componentDidMount", this.props.match.params);
    axios.post("http://localhost:8080/salesOrder/findAllProducts").then(res => {
      console.log(res.data);
      this.setState({
        products: res.data.prodList
      });
    });
    // this.handleProductChange(this);
    if (this.props.match.params.siDrItemId) {
      axios
        .post("http://localhost:8080/salesOrder/findSiDrItemById", {
          siDrItemId: this.props.match.params.siDrItemId
        })
        .then(res => {
          console.log(res.data.productBean.productId);
          this.setState({
            quantity: res.data.quantity,
            unit: res.data.unit,
            productId: res.data.productBean.productId,
            description: res.data.description,
            lotBatchNo: res.data.lotBatchNo,
            expiryDate: res.data.expiryDate,
            unitPrice: res.data.unitPrice,
            amount: res.data.amount
          });
        });
    }
  }

  handleAddButton() {
    axios
      .post("http://localhost:8080/salesOrder/saveSiDrItem", {
        siDrId: this.props.match.params.srDrId,
        quantity: this.state.quantity,
        unit: this.state.unit,
        productId: this.state.productId,
        description: this.state.description,
        lotBatchNo: this.state.lotBatchNo,
        expiryDate: this.state.expiryDate,
        amount: this.state.amount,
        unitPrice: this.state.unitPrice,
        siDrItemId: this.props.match.params.siDrItemId
      })
      .then(res => {
        console.log(res.data.msg);
        if (res.data.msg) {
          DialogUtility.alert({
            animationSettings: { effect: "Zoom" },
            closeOnEscape: true,
            content: res.data.msg,
            showCloseIcon: true,
            title: "Error"
          });
        } else {
          // if (this.state.productId) {
          DialogUtility.alert({
            animationSettings: { effect: "Zoom" },
            closeOnEscape: true,
            content: "Product added to sales invoice/delivery receipt",
            showCloseIcon: true,
            title: "Product added"
          });
          this.props.history.push(
            "/siDrDetails/" + this.props.match.params.srDrId
          );
        }
      });
  }
  handleBackBtn() {
    this.props.history.push("/siDrDetails/" + this.props.match.params.srDrId);
  }
  render() {
    let ds = null;
    let count = 0;
    if (this.state.products) {
      ds = this.state.products.map(item => (
        <option key={item["key"]} value={item["key"]}>
          {item["value"]}
        </option>
      ));
    }
    return (
      <div>
        <div className="header">Input Product</div>
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Quantity: </div>
            <div className="col-sm-4">
              <NumericTextBoxComponent
                format="n"
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
              <select
                value={this.state.productId}
                className="form-control"
                onChange={this.handleProductChange.bind(this)}
                // onBlur={this.handleProductChange.bind(this)}
              >
                {ds}
              </select>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Available Product Count: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                readOnly
                value={this.state.availProdCount}
                onChange={this.handleAvailProdCountChange.bind(this)}
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

export default SiDrItemDetails;
