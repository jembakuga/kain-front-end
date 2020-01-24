import React, { Component } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";

class ProductSearch extends Component {
  private grid: GridComponent | null;
  private query: Query;
  // state: {
  //   prodCode: "";
  //   prodDesc: "";
  //   batchNo: "";
  // };

  constructor(props: any) {
    super(props);
    this.state = {
      prodCode: "",
      prodDesc: "",
      batchNo: ""
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    // this.getFormData({
    // 	url: config.get('contextPath') + '/sysadmin/initCmMessage.do',
    // });
    // this.updateFormModel({
    // 	msgType : this.utils.getUrlParameter("msgTypeSearch") ? this.utils.getUrlParameter("msgTypeSearch") : '',
    // 	msgCode : this.utils.getUrlParameter("msgCodeSearch") ? this.utils.getUrlParameter("msgCodeSearch") : '',
    // 	msgDesc : this.utils.getUrlParameter("msgDescSearch") ? this.utils.getUrlParameter("msgDescSearch") : '',
    // 	id : this.utils.getUrlParameter("id") ? this.utils.getUrlParameter("id") : '',
    // });
    // this.loadMessages(true);
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

  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/findAllProducts",
    adaptor: new UrlAdaptor()
  });

  loadMessages() {
    console.log(this.state);
    if (this.grid) {
      this.grid.dataSource = this.dataManager;
      this.query = new Query();
      // .addParams("msgType", this.state.model["msgType"])
      // .addParams("msgCode", this.state.model["msgCode"])
      // .addParams("msgDesc", this.state.model["msgDesc"]);
      // if (includeId) this.query.addParams("id", this.state.model["id"]);
      this.grid.query = this.query;
    }
  }

  handleSearchBtn() {
    this.loadMessages();
  }

  handleAddBtn() {
    console.log("handleAddBtn");
  }

  render() {
    return (
      <div>
        <h1>Product Search</h1>
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
        <div className="row">
          <div className="col-sm-3">Product Code: </div>
          <div className="col-sm-4">
            <input type="text" onChange={this.handlProdCodeChange.bind(this)} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">Product Description: </div>
          <div className="col-sm-4">
            <input type="text" onChange={this.handlProdDescChange.bind(this)} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">Batch No: </div>
          <div className="col-sm-4">
            <input type="text" onChange={this.handlBatchNoChange.bind(this)} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">Retail Price: </div>
          <div className="col-sm-4">
            <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">Product Description: </div>
          <div className="col-sm-4">
            <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">Product Description: </div>
          <div className="col-sm-4">
            <input type="text" />
          </div>
        </div>
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
          >
            <ColumnsDirective>
              <ColumnDirective headerText="Product Code" field="productCode" />
              <ColumnDirective
                headerText="Product Description"
                field="productDesc"
              />
              <ColumnDirective headerText="Batch No" field="batchNo" />
            </ColumnsDirective>
            <Inject services={[Page, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  }
}

export default ProductSearch;