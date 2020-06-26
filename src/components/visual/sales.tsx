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

class Sales extends BaseComponent {
  state: {
    salesData: [];
    salesSplitData: [];
    productGroupingByYear: [
      {
        product: "";
        totalAmount: 1;
        text: ": ";
      }
    ];
    productGroupingByMonth: [
      {
        product: "";
        totalAmount: 1;
        text: ": ";
      }
    ];
    year: 0;
    month: "";
  };

  constructor(props: any) {
    super(props);
    this.state = {
      salesData: [],
      salesSplitData: [],
      productGroupingByYear: [
        {
          product: "",
          totalAmount: 1,
          text: ": ",
        },
      ],
      productGroupingByMonth: [
        {
          product: "",
          totalAmount: 1,
          text: ": ",
        },
      ],
      year: 0,
      month: "",
    };
    //this.datalabel = { visible: true, angle: 90, enableRotation: true };
  }

  private dataManager: DataManager = new DataManager({
    url:
      "http://localhost:8080/collection/findCollectionReportItemByCollectionReport",
    adaptor: new UrlAdaptor(),
  });

  handleYearChange(e: any) {
    this.setState({
      year: e.target.value,
    });
  }

  handleMonthChange(e: any) {
    this.setState({
      month: e.target.value,
    });
  }

  componentDidMount() {
    console.log("component mounted");
  }

  renderYearlyVisuals() {
    console.log("renderYearlyVisuals");
    axios
      .get(
        "http://localhost:8080/salesOrder/findSalesAnalysis?year=" +
          this.state.year
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ salesData: res.data });
      });
    axios
      .get(
        "http://localhost:8080/salesOrder/findSalesSplitAnalysis?year=" +
          this.state.year
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ salesSplitData: res.data });
      });
    axios
      .get(
        "http://localhost:8080/salesOrder/findProductGroupingByYear?year=" +
          this.state.year
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ productGroupingByYear: res.data });
      });

    console.log(this.state);
  }

  renderMonthlyVisuals() {
    axios
      .get(
        "http://localhost:8080/salesOrder/findProductGroupingByMonth?year=" +
          this.state.year +
          "&month=" +
          this.state.month
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ productGroupingByMonth: res.data });
        console.log(this.state.productGroupingByMonth);
      });
  }

  render() {
    return (
      <div>
        <div className="header">Sales Visualizations</div>
        <br />

        <form id="form-element">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">
                <select
                  //value={this.state.employeeType}
                  className="form-control"
                  onChange={this.handleYearChange.bind(this)}
                  onBlur={this.handleYearChange.bind(this)}
                >
                  <option></option>
                  <option key="2019" value="2019">
                    2019
                  </option>
                  <option key="2020" value="2020">
                    2020
                  </option>
                  <option key="2021" value="2021">
                    2021
                  </option>
                  <option key="2022" value="2022">
                    2022
                  </option>
                  <option key="2023" value="2023">
                    2023
                  </option>
                  <option key="2024" value="2024">
                    2024
                  </option>
                </select>
              </div>
              <div className="col-sm-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={this.renderYearlyVisuals.bind(this)}
                >
                  Load Data
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <ChartComponent
                  id="salesChart"
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
                      //type="Column" // to define if bar graph or line graph
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
                      dataSource={this.state.salesSplitData}
                      xName="month"
                      yName="si"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                    />
                    <SeriesDirective
                      dataSource={this.state.salesSplitData}
                      xName="month"
                      yName="dr"
                      type="Column" // to define if bar graph or line graph
                      animation={{ enable: true, duration: 1200, delay: 100 }}
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6"></div>
              <div className="col-sm-2">
                <select
                  //value={this.state.employeeType}
                  className="form-control"
                  onChange={this.handleMonthChange.bind(this)}
                  onBlur={this.handleMonthChange.bind(this)}
                >
                  <option></option>
                  <option key="January" value="January">
                    January
                  </option>
                  <option key="February" value="February">
                    February
                  </option>
                  <option key="March" value="March">
                    March
                  </option>
                  <option key="April" value="April">
                    April
                  </option>
                  <option key="May" value="May">
                    May
                  </option>
                  <option key="June" value="June">
                    June
                  </option>
                  <option key="July" value="July">
                    July
                  </option>
                  <option key="August" value="August">
                    February
                  </option>
                  <option key="September" value="September">
                    September
                  </option>
                  <option key="October" value="October">
                    October
                  </option>
                  <option key="November" value="November">
                    May
                  </option>
                  <option key="December" value="December">
                    June
                  </option>
                </select>
              </div>
              <div className="col-sm-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={this.renderMonthlyVisuals.bind(this)}
                >
                  Load Data
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <AccumulationChartComponent
                  id="yearlyProdGrouping"
                  title="Yearly Product Groping"
                  enableSmartLabels
                >
                  <Inject services={[AccumulationDataLabel]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      dataSource={this.state.productGroupingByYear}
                      xName="product"
                      yName="totalAmount"
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
              <div className="col-sm-6">
                <AccumulationChartComponent
                  id="monthlyProdGrouping"
                  title="Monthly Product Groping"
                  enableSmartLabels
                >
                  <Inject services={[AccumulationDataLabel]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      dataSource={this.state.productGroupingByMonth}
                      xName="product"
                      yName="totalAmount"
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

export default Sales;
