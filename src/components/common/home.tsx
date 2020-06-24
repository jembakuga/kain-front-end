import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import BaseComponent from "../common/baseComponent";
import {
  Category,
  ChartComponent,
  ColumnSeries,
  Inject,
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

class Home extends BaseComponent {
  state: {
    salesData: [];
    primaryxAxis: {};
    tesing: "";
  };

  constructor(props: any) {
    super(props);
    this.state = {
      salesData: [],
      primaryxAxis: {},
      tesing: "",
    };
    //this.datalabel = { visible: true, angle: 90, enableRotation: true };
  }

  private dataManager: DataManager = new DataManager({
    url:
      "http://localhost:8080/collection/findCollectionReportItemByCollectionReport",
    adaptor: new UrlAdaptor(),
  });

  componentDidMount() {
    console.log("component mounted");

    this.setState({
      data: [
        { month: "Jan", sales: 100 },
        { month: "Feb", sales: 28 },
        { month: "Mar", sales: 34 },
        { month: "Apr", sales: 32 },
        { month: "May", sales: 40 },
        { month: "Jun", sales: 32 },
        { month: "Jul", sales: 35 },
        { month: "Aug", sales: 55 },
        { month: "Sep", sales: 38 },
        { month: "Oct", sales: 30 },
        { month: "Nov", sales: 25 },
        { month: "Dec", sales: 32 },
      ],
      primaryxAxis: { valueType: "Category" },
    });
    //this.primaryxAxis = { valueType: "Category" };
    console.log(this.state);
  }

  renderChart() {
    console.log("renderChart");
    axios
      .get("http://localhost:8080/salesOrder/findSalesAnalysis")
      .then((res) => {
        console.log(res.data);
        this.setState({ salesData: res.data });
      });
    {
      /*this.setState({
      salesData: [
        { month: "Jan", sales: 100 },
        { month: "Feb", sales: 28 },
        { month: "Mar", sales: 34 },
        { month: "Apr", sales: 32 },
        { month: "May", sales: 40 },
        { month: "Jun", sales: 32 },
        { month: "Jul", sales: 35 },
        { month: "Aug", sales: 55 },
        { month: "Sep", sales: 38 },
        { month: "Oct", sales: 30 },
        { month: "Nov", sales: 25 },
        { month: "Dec", sales: 32 },
      ],
      primaryxAxis: { valueType: "Category" },
    });*/
    }
    //this.primaryxAxis = { valueType: "Category" };
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="header">Input Collection Item Details</div>
        <br />
        <form id="form-element">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-8">
                <ChartComponent
                  id="charts"
                  primaryXAxis={{ valueType: "Category", title: "Month" }}
                  title="Sales Analysis"
                  tooltip={{ enable: true }}
                >
                  <Inject
                    services={[ColumnSeries, Tooltip, LineSeries, Category]}
                  />
                  <SeriesCollectionDirective>
                    <SeriesDirective
                      dataSource={this.state.salesData}
                      xName="month"
                      yName="sales"
                      name="Sales"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
              <div className="col-sm-4">
                <AccumulationChartComponent
                  id="pie"
                  title="Type Split"
                  enableSmartLabels
                >
                  <Inject services={[AccumulationDataLabel]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      dataSource={[
                        { x: "Sales Invoice", y: 3, text: "Sales Invoice: 3" },
                        {
                          x: "Delivery Receipt",
                          y: 3.5,
                          text: "Delivery Receipt: 3.5",
                        },
                      ]}
                      xName="x"
                      yName="y"
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
            <div className="row">
              <div className="col-sm-6">
                <div className="col-sm-4"></div>
              </div>
            </div>
          </div>
        </form>

        <button
          type="button"
          className="btn btn-outline-primary btn-sm mr-2"
          onClick={this.renderChart.bind(this)}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Home;
