import * as React from "react";
import { Component } from "react";
import BaseComponent from "../common/baseComponent";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Aggregate, AggregateColumnsDirective, AggregateDirective, AggregatesDirective,
  AggregateColumnDirective
} from "@syncfusion/ej2-react-grids";
import { Query } from "@syncfusion/ej2-data";
import axios from "axios";
import '../../css/monthlyExpensesPrint.css'


class MontlyExpensesPrint extends BaseComponent {

  private grid: GridComponent | null;
  private query: Query;
  public formatOption: object = { type: "date", format: "dd/MM/yyyy" };

  public purchasesSum(props: any) : any {
    return(<div className="aggre">{props.Sum}</div>)
      }


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

  handleBackBtn() {
    this.props.history.push("/monthlyExpensesSearch/" + this.state.year);
  }

  handleYearChange(e: any) {
    this.setState({
      year: e.target.value,
    });
  }

  handlePrintButton() {
    console.log("PRINTING");
    //this.props.history.push("/siDrPrint/" + this.state.siDrId);
    window.print();
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params.year);
    axios
      .post(
        "http://localhost:8080/expenses/retrieveYearlyExpenses",{
          year_ : this.props.match.params.year
        }
          
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ expensesData: res.data.result });
      });
      
  }


  render() {
    return (
    <div> 
        <div className="header">Generate Expense Report</div>
        <br />
        <form id="form-element">
          <div className="container-fluid"> 
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
              <AggregatesDirective>
                <AggregateDirective>
                  <AggregateColumnsDirective>
                    <AggregateColumnDirective field='profit' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='purchases' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='licenses' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='salary' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='officeRental' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='parking' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='pldt' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='meralco' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='waterBill' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='officeSupEquip' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='pettyCash' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='statutory' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='revFund' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                    <AggregateColumnDirective field='expensesTieup' type='Sum' format='C2' footerTemplate={this.purchasesSum} />
                  </AggregateColumnsDirective>
                </AggregateDirective>                
              </AggregatesDirective>
              <Inject services={[Aggregate]}/>
            </GridComponent>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-2">  
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={this.handleBackBtn.bind(this)}
                >
                  Back
                </button>              
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={this.handlePrintButton.bind(this)}
                >
                  Print
                </button>
              </div> 
            </div>
          </div>
        </form>
    </div>);
  }
}

export default MontlyExpensesPrint;
