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

class Collection extends BaseComponent {
  state: {
    salesData: [];
    year: 0;
    month: "";
  };

  constructor(props: any) {
    super(props);
    this.state = {
      salesData: [],
      year: 0,
      month: "",
    };
  }

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

  renderYearlyVisuals() {
    console.log("renderYearlyVisuals");
    axios
      .get(
        "http://localhost:8080/collection/findCollectionAnalysis?year=" +
          this.state.year
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ salesData: res.data });
      });
    /*axios
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
      });*/

    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="header">Collections Visualizations</div>
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
              <div className="col-sm-12">
                <ChartComponent
                  id="collectionsChart"
                  primaryXAxis={{ valueType: "Category", title: "Month" }}
                  title="Collections Analysis"
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
                      name="Collection"
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

export default Collection;
