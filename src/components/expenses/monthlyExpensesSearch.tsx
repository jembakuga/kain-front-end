import * as React from "react";
import { Component } from "react";
import BaseComponent from "../common/baseComponent";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";

class MontlyExpensesSearch extends BaseComponent {

  private grid: GridComponent | null;
  private query: Query;
  public formatOption: object = { type: "date", format: "dd/MM/yyyy" };

  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/collection/findCollectionReportItems",
    adaptor: new UrlAdaptor(),
  });

  state: {
    year: "";
    collectionData: [];
  };

  constructor(props: any) {
    super(props);
    this.state = {
      year: "",
      collectionData: [],
    };
  }

  handleYearChange(e: any) {
    this.setState({
      year: e.target.value,
    });
  }


  render() {
    return (
    <div>
        <div className="header">Generate Expense Report</div>
    </div>);
  }
}

export default MontlyExpensesSearch;
