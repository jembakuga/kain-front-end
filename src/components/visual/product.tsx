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
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";

class Product extends BaseComponent {
  state: { productInventoryData: []; productComparisonData: [] };

  constructor(props: any) {
    super(props);
    this.state = { productInventoryData: [], productComparisonData: [] };
  }

  renderInventoryVisuals() {
    console.log("renderYearlyVisuals");
    axios
      .get("http://localhost:8080/product/retrieveProductInventory?year=2022")
      .then((res) => {
        console.log(res.data);
        this.setState({ productInventoryData: res.data });
      });

    /*axios
      .get(
        "http://localhost:8080/product/retrieveProductPriceComparison?year=2022"
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ productComparisonData: res.data });
      });
*/
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
              <div className="col-sm-12">
                <ChartComponent
                  id="profitChart"
                  primaryXAxis={{ valueType: "Category", title: "Month" }}
                  title="Product Inventory"
                  tooltip={{
                    enable: true,
                    format: "${point.tooltip}",
                  }}
                  legendSettings={{ visible: true, position: "Top" }}
                  palettes={["#AEEE49"]}
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
                      dataSource={this.state.productInventoryData}
                      xName="productDesc"
                      yName="profitPerProduct"
                      name="Available Product in Inventory"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                      tooltipMappingName="profitPerProduct"
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <ChartComponent
                  id="inventoryChart"
                  primaryXAxis={{ valueType: "Category", title: "Month" }}
                  title="Product Inventory"
                  tooltip={{
                    enable: true,
                    format: "${point.tooltip}",
                  }}
                  legendSettings={{ visible: true, position: "Top" }}
                  palettes={["#E94649", "#F6B53F"]}
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
                      dataSource={this.state.productInventoryData}
                      xName="productDesc"
                      yName="availProdCount"
                      name="Available Product in Inventory"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                      tooltipMappingName="availCountFormatted"
                    />
                    <SeriesDirective
                      dataSource={this.state.productInventoryData}
                      xName="productDesc"
                      yName="soldProdCount"
                      name="Sold Products"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                      tooltipMappingName="soldProdCountFormatted"
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <ChartComponent
                  id="salesSplitChart"
                  primaryXAxis={{ valueType: "Category", title: "Month" }}
                  title="Base Price vs Sold Price"
                  legendSettings={{ visible: true, position: "Top" }}
                  tooltip={{ enable: true }}
                  palettes={["#6FAAB0", "#C4C24A"]}
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
                      dataSource={this.state.productInventoryData}
                      xName="productDesc"
                      yName="aveBasePrice"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                      name="Average Base Price"
                    />
                    <SeriesDirective
                      dataSource={this.state.productInventoryData}
                      xName="productDesc"
                      yName="aveSoldPrice"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                      name="Average Sold Price"
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            </div>
            {/*<div className="row">
              <div className="col-sm-12">
                <ChartComponent
                  id="profitChart"
                  primaryXAxis={{ valueType: "Category", title: "Month" }}
                  title="Profit Chart"
                  tooltip={{ enable: true }}
                >
                  <Inject
                    services={[ColumnSeries, Tooltip, LineSeries, Category]}
                  />
                  <SeriesCollectionDirective>
                    <SeriesDirective
                      dataSource={this.state.productInventoryData}
                      xName="productDesc"
                      yName="profit"
                      name="Sales"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
                  </div>*/}
            <div className="row">
              <div className="col-sm-12">
                <AccumulationChartComponent
                  id="profitPieChart"
                  //primaryXAxis={{ valueType: "Category", title: "Month" }}
                  title="Profit Chart"
                  //tooltip={{ enable: true }}
                  enableSmartLabels
                >
                  <Inject services={[AccumulationDataLabel]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      dataSource={this.state.productInventoryData}
                      xName="productDesc"
                      yName="profit"
                      name="Sales"
                      //type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                      radius="90%"
                      innerRadius="40%"
                      dataLabel={{
                        visible: true,
                        name: "text",
                      }}
                    />
                  </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Product;
