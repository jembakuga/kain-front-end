import React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import BaseComponent from "../common/baseComponent";

class ProductSearch extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  state: {
    prodCode: "";
    prodDesc: "";
    // batchNo: "";
    prodId: "";
    // retailPrice: null;
    // expiryDate: null;
    // arrivalDate: null;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      prodCode: "",
      prodDesc: "",
      // batchNo: "",
      prodId: ""
      // retailPrice: null,
      // expiryDate: null,
      // arrivalDate: null
    };
  }

  componentDidMount() {
    // console.log("componentDidMount");
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

  // handlBatchNoChange(e: any) {
  //   this.setState({
  //     batchNo: e.target.value
  //   });
  // }

  // handlRetailPriceChange(e: any) {
  //   // console.log(e);
  //   this.setState({
  //     retailPrice: e.value
  //   });
  // }

  // handlExpiryDateChange(e: any) {
  //   this.setState({
  //     expiryDate: e.value
  //   });
  // }

  // handlArrivalDateChange(e: any) {
  //   this.setState({
  //     arrivalDate: e.value
  //   });
  // }

  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/product/findProducts",
    adaptor: new UrlAdaptor()
  });

  loadProducts() {
    // console.log(this.state);
    if (this.grid) {
      this.grid.dataSource = this.dataManager;
      this.query = new Query()
        .addParams("productCode", this.state.prodCode)
        .addParams("productDesc", this.state.prodDesc);
      // .addParams("batchNo", this.state.batchNo)
      // .addParams("expiryDate", this.state.expiryDate)
      // .addParams("arrivalDate", this.state.arrivalDate)
      // .addParams("retailPrice", this.state.retailPrice);
      // console.log("asdfsda");
      this.grid.query = this.query;
      this.grid.refresh();
    }
  }

  handleSearchBtn() {
    this.loadProducts();
  }

  handleAddBtn() {
    // console.log("handleAddBtn");
    this.props.history.push("/productAdd");
  }

  handleRenderProdCodeHyperlink(args: any) {
    // console.log(args.data);
    if (args.column.field === "productCode") {
      ReactDOM.render(
        <HashRouter>
          <Link to={"/productDetails/" + args.data.productId}>
            {" "}
            {args.data.productCode}
          </Link>
        </HashRouter>,
        args.cell
      );
    }
  }

  render() {
    return (
      <div>
        <div className="header">Product Search</div>
        <div className="container-fluid">
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
          {/* <div className="row">
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
              <NumericTextBoxComponent
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
                change={this.handlArrivalDateChange.bind(this)}
              />
            </div>
          </div>
          <br /> */}
          <div className="row">
            <div className="col-sm-5">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={this.handleAddBtn.bind(this)}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={this.handleSearchBtn.bind(this)}
              >
                Search
              </button>
            </div>
          </div>
          <br />
          <div>
            <GridComponent
              dataSource={this.dataManager}
              gridLines={"Both"}
              rowHeight={40}
              allowPaging={true}
              pageSettings={{ pageCount: 5, pageSize: 10 }}
              style={{ width: "100%" }}
              allowSorting={true}
              ref={g => (this.grid = g)}
              queryCellInfo={this.handleRenderProdCodeHyperlink.bind(this)}
            >
              <ColumnsDirective>
                <ColumnDirective
                  headerText="Product Code"
                  field="productCode"
                />
                <ColumnDirective
                  headerText="Product Description"
                  field="productDesc"
                />
                <ColumnDirective
                  headerText="Available Stocks"
                  field="availProdCount"
                />
                {/* <ColumnDirective headerText="Batch No" field="batchNo" />
                <ColumnDirective
                  headerText="Retail Price"
                  field="retailPrice"
                  format="N2"
                />
                <ColumnDirective headerText="Expiry Date" field="expiryDate" />
                <ColumnDirective
                  headerText="Arrival Date"
                  field="arrivalDate"
                /> */}
              </ColumnsDirective>
              <Inject services={[Page, Sort]} />
            </GridComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSearch;
