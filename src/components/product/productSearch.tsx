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

  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/findAllProducts",
    adaptor: new UrlAdaptor()
  });

  handleSearchBtn() {
    console.log("handleSearchBtn");
    if (this.grid) {
      const rec: object = {
        OrderID: 10247,
        CustomerID: "ASDFG",
        ShipCity: "Vins et alcools Chevalier",
        ShipName: "Reims"
      };
      /** Add record */
      (this.grid.dataSource as object[]).unshift(rec);
      /** Refresh the Grid */
      this.grid.refresh();
    }
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
          <div className="col-sm-3">Batch No: </div>
          <div className="col-sm-4">
            <input type="text" />
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
