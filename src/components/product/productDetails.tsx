import React, { Component } from "react";
import BaseComponent from "../common/baseComponent";
import axios from "axios";

class ProductDetails extends BaseComponent {
  state = {
    prodCode: "",
    prodDesc: "",
    batchNo: "",
    prodId: ""
  };
  constructor(props: any) {
    super(props);
    this.state = {
      prodCode: "",
      prodDesc: "",
      batchNo: "",
      prodId: ""
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

  componentDidMount() {
    console.log(this.props.match.params);
    axios
      .post("http://localhost:8080/findProduct", {
        productId: this.props.match.params.id
      })
      .then(res => {
        console.log(res);
        this.setState({
          prodCode: res.data.productCode,
          prodDesc: res.data.productDesc,
          batchNo: res.data.batchNo
        });
      });
    // this.ajaxCall({
    //   method: "GET",
    //   url: "http://localhost:8080/findProduct/",
    //   params: {
    //     productId: 1
    //   }
    // });
  }

  ajaxCall(props: any) {
    let form = this;
    axios(props)
      .then(function(response) {
        if (response.data.success == "true") {
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
        <h1>Product Create ee</h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-5">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                // onClick={this.handleAddBtn.bind(this)}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                // onClick={this.handleSearchBtn.bind(this)}
              >
                Back
              </button>
            </div>
          </div>
          <br />
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
              <input type="text" className="form-control" />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Product Description: </div>
            <div className="col-sm-4">
              <input type="text" className="form-control" />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Product Description: </div>
            <div className="col-sm-4">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
