import * as React from "react";
import { Component } from "react";
import BaseComponent from "../common/baseComponent";
import {
  Category,
  ChartComponent,
  ColumnSeries,
  Inject,
  Legend,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import axios from "axios";

class Product extends BaseComponent {
  state: { productInventoryData: [] };

  constructor(props: any) {
    super(props);
    this.state = { productInventoryData: [] };
  }

  renderInventoryVisuals() {
    console.log("renderYearlyVisuals");
    axios
      .get("http://localhost:8080/product/retrieveProductInventory")
      .then((res) => {
        console.log(res.data);
        this.setState({ productInventoryData: res.data });
      });

    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="header">Product Inventory Visualizations</div>
        <br />
        <form id="form-element">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={this.renderInventoryVisuals.bind(this)}
                >
                  Load Data
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <ChartComponent
                  id="inventoryChart"
                  primaryXAxis={{ valueType: "Category", title: "Month" }}
                  title="Product Inventory"
                  tooltip={{ enable: true }}
                >
                  <Inject
                    services={[ColumnSeries, Tooltip, LineSeries, Category]}
                  />
                  <SeriesCollectionDirective>
                    <SeriesDirective
                      dataSource={this.state.productInventoryData}
                      xName="productDesc"
                      yName="availProdCount"
                      name="Sales"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
              <div className="col-sm-6">
                <ChartComponent
                  id="salesSplitChart"
                  primaryXAxis={{ valueType: "Category", title: "Month" }}
                  title="Sales Split Analysis"
                  legendSettings={{ visible: true, position: "Top" }}
                  tooltip={{ enable: true }}
                >
                  <Inject
                    services={[
                      ColumnSeries,
                      Tooltip,
                      LineSeries,
                      Legend,
                      Category,
                    ]}
                  />
                  <SeriesCollectionDirective>
                    <SeriesDirective
                      //dataSource={this.state.salesSplitData}
                      xName="month"
                      yName="si"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                    />
                    <SeriesDirective
                      //dataSource={this.state.salesSplitData}
                      xName="month"
                      yName="dr"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Product;
