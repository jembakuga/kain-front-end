import React, { Component } from "react";

class ProductCreate extends Component {
  state = {};

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

export default ProductCreate;
