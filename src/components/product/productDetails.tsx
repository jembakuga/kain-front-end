import React from "react";
import BaseComponent from "../common/baseComponent";
import axios from "axios";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";

class ProductDetails extends BaseComponent {
  state: {
    prodCode: "";
    prodDesc: "";
    batchNo: "";
    prodId: "";
    retailPrice: 0;
    expiryDate: Date;
    arrivalDate: Date;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      prodCode: "",
      prodDesc: "",
      batchNo: "",
      prodId: "",
      retailPrice: 0,
      expiryDate: new Date(),
      arrivalDate: new Date()
    };
  }

  handlProdCodeChange(e: any) {
    this.setState({
      prodCode: e.target.value
    });
  }

  handlProdDescChange(e: any) {
    this.setState({
      prodDesc: e.target.value
    });
  }

  handlBatchNoChange(e: any) {
    this.setState({
      batchNo: e.target.value
    });
  }
  handlRetailPriceChange(e: any) {
    console.log(e);
    this.setState({
      retailPrice: e.value
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

  handleBackBtn() {
    this.props.history.push("/productSearch");
  }

  handleSaveBtn() {
    axios
      .post("http://localhost:8080/product/saveProduct", {
        productId: this.props.match.params.id,
        productCode: this.state.prodCode,
        productDesc: this.state.prodDesc,
        batchNo: this.state.batchNo,
        retailPrice: this.state.retailPrice,
        expiryDate: this.state.expiryDate,
        arrivalDate: this.state.arrivalDate
      })
      .then(res => {
        console.log(res);
        this.setState({
          prodCode: res.data.productCode,
          prodDesc: res.data.productDesc,
          batchNo: res.data.batchNo,
          retailPrice: res.data.retailPrice,
          arrivalDate: res.data.arrivalDate,
          expiryDate: res.data.expiryDate
        });
      });
  }

  componentDidMount() {
    console.log(this.props.match.params);
    if (this.props.match.params.id) {
      axios
        .post("http://localhost:8080/product/findProduct", {
          productId: this.props.match.params.id
        })
        .then(res => {
          console.log(res);
          this.setState({
            prodCode: res.data.productCode,
            prodDesc: res.data.productDesc,
            batchNo: res.data.batchNo,
            retailPrice: res.data.retailPrice,
            arrivalDate: res.data.arrivalDate,
            expiryDate: res.data.expiryDate
          });
        });
    }
  }

  ajaxCall(props: any) {
    let form = this;
    axios(props)
      .then(function(response) {
        if (response.data.success === "true") {
          if (props["onSuccess"]) {
            props["onSuccess"](response, form);
          }
        } else {
          if (props["onFailure"]) {
            props["onFailure"](response, form);
          }
        }
      })
      .catch(function(response) {
        // form.showSummaryMessage({
        //   msgCode: ["error_Unknown_Error"],
        //   msgHeader: "error"
        // });
      });
  }

  render() {
    return (
      <div>
        <div className="header">Product Create</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Product Code: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={this.state.prodCode}
                onChange={this.handlProdCodeChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Product Description: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={this.state.prodDesc}
                onChange={this.handlProdDescChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Batch No: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={this.state.batchNo}
                onChange={this.handlBatchNoChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Retail Price: </div>
            <div className="col-sm-4">
              <NumericTextBoxComponent
                value={this.state.retailPrice}
                change={this.handlRetailPriceChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Expiry Date: </div>
            <div className="col-sm-4">
              <DatePickerComponent
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
                id="arrivalDate"
                value={this.state.arrivalDate}
                change={this.handlArrivalDateChange.bind(this)}
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

export default ProductDetails;
