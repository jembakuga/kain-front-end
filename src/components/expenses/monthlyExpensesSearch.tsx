import * as React from "react";
import { Component } from "react";
import BaseComponent from "../common/baseComponent";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Aggregate, AggregateColumnsDirective, AggregateDirective, AggregatesDirective,
  AggregateColumnDirective
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import axios from "axios";

class MontlyExpensesSearch extends BaseComponent {

  private grid: GridComponent | null;
  private query: Query;
  public formatOption: object = { type: "date", format: "dd/MM/yyyy" };

  public purchasesSum(props: any) : any {
    return(<div>{props.Sum}</div>)
      }

  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/collection/findCollectionReportItems",
    adaptor: new UrlAdaptor(),
  });

  state: {
    year: "";
    expensesData: [];
  };

  constructor(props: any) {
    super(props);
    this.state = {
      year: "",
      expensesData: [],
    };
  }

  handleYearChange(e: any) {
    this.setState({
      year: e.target.value,
    });
  }

  handlePrintButton() {
    console.log("PRINTING");
    //this.props.history.push("/siDrPrint/" + this.state.siDrId);
    window.open("http://localhost:3000/#/monthlyExpensesPrint/" + this.state.year);
  }

  renderExpenses(){
    console.log("renderExpenses");
    axios
      .post(
        "http://localhost:8080/expenses/retrieveYearlyExpenses",{
          year_ : this.state.year
        }
          
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ expensesData: res.data });
      });
  }


  render() {
    return (
    <div>
        <div className="header">Generate Expense Report</div>
        <br />
        <form id="form-element">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3">SI/DR No: </div>
              <div className="col-sm-4">
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
            </div>
            <br />
            <div className="row">
              <div className="col-sm-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={this.renderExpenses.bind(this)}
                >
                  Load Data
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={this.handlePrintButton.bind(this)}
                >
                  Print Preview
                </button>
              </div> 
            </div>
            <br />
            <div className="row">
              <div>
              <GridComponent
              dataSource={this.state.expensesData}
              gridLines={"Both"}
              rowHeight={40}              
              pageSettings={{ pageCount: 5, pageSize: 15 }}
              style={{ width: "100%" }}
              ref={(g) => (this.grid = g)}
              //queryCellInfo={this.handleRendersiDrNoHyperlink.bind(this)}
            >
              <ColumnsDirective>
                <ColumnDirective headerText="Month" field="monthStr" />
                <ColumnDirective
                  headerText="Year"
                  field="year_"
                />
                <ColumnDirective
                  headerText="Profit"
                  field="profit"  format='N2'
                />
                <ColumnDirective
                  headerText="Purchases"
                  field="purchases"  format='N2'
                />
                <ColumnDirective
                  headerText="Licenses"
                  field="licenses"  format='N2'
                />
                <ColumnDirective
                  headerText="Salary"
                  field="salary"  format='N2'
                />
                <ColumnDirective
                  headerText="Office Rental"
                  field="officeRental" format='N2'
                />
                <ColumnDirective
                  headerText="Parking"
                  field="parking" format='N2'
                />
                <ColumnDirective
                  headerText="PLDT"
                  field="pldt" format='N2'
                />
                <ColumnDirective
                  headerText="Meralco"
                  field="meralco" format='N2'
                />
                <ColumnDirective
                  headerText="Water Bill"
                  field="waterBill" format='N2'
                />
                <ColumnDirective
                  headerText="Office Supply"
                  field="officeSupEquip" format='N2'
                />
                <ColumnDirective
                  headerText="Petty Cash"
                  field="pettyCash" format='N2'
                />
                <ColumnDirective
                  headerText="Statutory"
                  field="statutory" format='N2'
                />
                <ColumnDirective
                  headerText="Revolving Fund"
                  field="revFund" format='N2'
                />
                <ColumnDirective
                  headerText="Epenses Tie Up"
                  field="expensesTieup" format='N2'
                />                
              </ColumnsDirective>
              { /*<AggregatesDirective>
                <AggregateDirective>
                  <AggregateColumnsDirective>
                  <AggregateColumnDirective field='profit' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='purchases' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='licenses' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='salary' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='officeRental' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='parking' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='pldt' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='meralco' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='waterBill' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='officeSupEquip' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='pettyCash' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='statutory' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='revFund' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='expensesTieup' type='Sum' format='N2' footerTemplate={this.purchasesSum} />
                  </AggregateColumnsDirective>
                </AggregateDirective>                
              </AggregatesDirective>*/}
              <Inject services={[Page, Aggregate]}/>
            </GridComponent>
              </div>
            </div>
          </div>
        </form>
    </div>);
  }
}

export default MontlyExpensesSearch;
