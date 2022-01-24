import React from "react";
import BaseComponent from "../common/baseComponent";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import axios from "axios";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject,
  CommandModel,
  Edit,
  EditSettingsModel,
  CommandColumn,
  CommandClickEventArgs,
  RowDataBoundEventArgs,
} from "@syncfusion/ej2-react-grids";
import { getValue } from "@syncfusion/ej2-base";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import * as ReactDOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";
import { DialogUtility } from "@syncfusion/ej2-popups";
import { FormValidator, FormValidatorModel } from "@syncfusion/ej2-inputs";
import moment from "moment";
import '../../css/siDrPrint.css';
import NumberFormat from 'react-number-format';

class SiDrPrint extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  private formObject: FormValidator;
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };
  state: {
    siDrId: "";
    salesOrderNo: "";
    poNo: "";
    checkedBy: 0;
    dueDate: Date;
    date: Date;
    issueDate: Date;
    soldTo: "";
    address: "";
    tin: "";
    businessStyle: "";
    terms: "";
    totalAmount: 0;
    totalAmountValIncl: 0;
    addVat: 0;
    deliveredBy: 0;
    checkers: [];
    medReps: [];
    type: "";
    ready: false;
    siDrItemBeans: [];
  };
  constructor(props: any) {
    super(props);
    this.state = {
      siDrId: "",
      salesOrderNo: "",
      poNo: "",
      checkedBy: 0,
      soldTo: "",
      address: "",
      tin: "",
      businessStyle: "",
      terms: "",
      deliveredBy: 0,
      totalAmount: 0,
      totalAmountValIncl: 0,
      addVat: 0,
      dueDate: new Date(),
      date: new Date(),
      issueDate: new Date(),
      checkers: [],
      medReps: [],
      type: "",
      ready: false,
      siDrItemBeans: [],
    };
  }

  handleBackBtn() {
    this.props.history.push("/siDrDetails/" + this.state.siDrId);
  }

  handlePrintBtn() {
    window.print();
  }
  
  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/salesOrder/findSiDrItemsBySiDr",
    adaptor: new UrlAdaptor(),
  });

  public editOptions: EditSettingsModel = {
    allowEditing: true,
    allowDeleting: true,
  };

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params.id);
    if (this.props.match.params.id) {
      axios
        .post("http://localhost:8080/salesOrder/findSiDr", {
          siDrId: this.props.match.params.id,
        })
        .then((res) => {
          console.log(res.data.issueDate);
          this.setState({
            siDrId: res.data.siDrId,
            salesOrderNo: res.data.salesOrderNo,
            soldTo: res.data.soldTo,
            address: res.data.address,
            tin: res.data.tin,
            businessStyle: res.data.businessStyle,
            poNo: res.data.poNo,
            terms: res.data.terms,
            deliveredBy: res.data.deliveredBy,
            checkedBy: res.data.checkedBy,
            issueDate: res.data.issueDate,
            date: res.data.date,
            dueDate: res.data.dueDate,
            totalAmount: res.data.totalAmount,
            totalAmountValIncl: res.data.totalSalesVatIncl,
            addVat: res.data.addVat,
            type: res.data.type,
            siDrItemBeans: res.data.siDrItemBeans,
            ready: true,
          });
          //window.addEventListener("load", this.handleLoad);
          
        });

      if (this.grid) {
        console.log("akjdfhadskfj");
        this.grid.dataSource = this.dataManager;
        this.query = new Query().addParams(
          "siDrId",
          this.props.match.params.id
        );
        this.grid.query = this.query;
        
      }
    }
    axios
      .post("http://localhost:8080/employee/findEmployeeForDropdown")
      .then((res) => {
        console.log(res.data);
        console.log(this.state.checkedBy, this.state.deliveredBy);
        var checkerName = "";
        var medRep = "";
        for(var i=0; i < res.data.checkers.length; i++){
          if(this.state.checkedBy === res.data.checkers[i].employeeId){
            checkerName = res.data.checkers[i].employeeName;            
          }
        }
        for(var i=0; i < res.data.medReps.length; i++){
          if(this.state.deliveredBy === res.data.medReps[i].employeeId){
            medRep = res.data.medReps[i].employeeName;            
          }
        }

        console.log(checkerName, medRep);
        this.setState({
          checkedBy: checkerName,
          deliveredBy : medRep
        });
      });

    let requiredFields: FormValidatorModel = {
      rules: {
        type: { required: true },
        salesOrderNo: { required: true },
        soldTo: { required: true },
        address: { required: true },
        issueDate: { required: true },
        checkedBy: { required: true },
        deliveredBy: { required: true },
      },
    };

    this.formObject = new FormValidator("#form-element", requiredFields);
    this.setState({
      siDrId: this.props.match.params.id,
    });
  }

  //componentDidMount() {
  //this.handleLoad();
  /*setTimeout(() => {
      window.print();
      window.close();
    }, 3000);*/
  //}

  render() {
    if (this.state.ready === false) {
      return <div>Loading...</div>;
    } else {
      //window.print();
      //}

      let medReps = null;
      let checkers = null;
      if (this.state.medReps) {
        medReps = this.state.medReps.map((item) => (
          // console.log(item)
          <option key={item["employeeId"]} value={item["employeeId"]}>
            {item["employeeName"]}
          </option>
        ));
        // console.log("medReps", medReps);
      }
      if (this.state.checkers) {
        checkers = this.state.checkers.map((item) => (
          // console.log(item)
          <option key={item["employeeId"]} value={item["employeeId"]}>
            {item["employeeName"]}
          </option>
        ));
        // console.log("checkers", checkers);
      }
      //window.print();
      setTimeout(() => {
        //window.print();
        //window.close();
      }, 1000);
      return (
        <div className="sidr-print">
          <br /> 
          <form id="form-element">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-2"> </div>
                <div className="col-sm-3">{this.state.soldTo}</div>
                <div className="col-sm-2"> </div>
                <div className="col-sm-3">{moment(this.state.date.toString()).format("YYYY/MM/DD")}</div>
              </div>
            </div>
            <br />
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-3">{this.state.address}</div>
                <div className="col-sm-2"> </div>
                <div className="col-sm-3">{this.state.poNo}</div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-2"> </div>
                <div className="col-sm-3">{this.state.tin}</div>
                <div className="col-sm-2"> </div>
                <div className="col-sm-3">{this.state.terms}</div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-3">{this.state.businessStyle}</div>
                <div className="col-sm-2"> </div>
                <div className="col-sm-3"></div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-3"></div>
                <div className="col-sm-2"> </div>
                <div className="col-sm-3"></div>
              </div>
              <br />
              <div className="row">
                <div className="gridCss">
                  <GridComponent
                    dataSource={this.state.siDrItemBeans}
                    gridLines={"Both"}
                    rowHeight={40}
                    allowPaging={true}
                    pageSettings={{ pageCount: 5, pageSize: 10 }}
                    style={{ width: "100%" }}
                    allowSorting={true}
                    ref={(g) => (this.grid = g)}
                  >
                    <ColumnsDirective>
                      <ColumnDirective headerText="Quantity" field="quantity" />
                      <ColumnDirective headerText="Unit" field="unit" />
                      <ColumnDirective
                        headerText="Product Code"
                        field="productBean.productCode"
                      />
                      <ColumnDirective
                        headerText="Product Description"
                        field="description"
                      />
                      <ColumnDirective
                        headerText="Lot/Batch No"
                        field="lotBatchNo"
                      />
                      <ColumnDirective
                        headerText="Expiry Date"
                        field="expiryDate"
                        format="yyyy/MM/dd"
                        type="date"
                      />
                      <ColumnDirective
                        headerText="Unit Price"
                        field="unitPrice"
                      />                    
                      <ColumnDirective headerText="Amount" field="amount" />
                      <ColumnDirective
                        headerText="Is Loss"
                        field="isLoss"
                        visible={false}
                      />

                      <ColumnDirective visible={false} field="siDrItemId" />
                      <ColumnDirective
                        visible={false}
                        field="productBean.productId"
                      />
                    </ColumnsDirective>
                    <Inject services={[Edit, CommandColumn]} />
                  </GridComponent>
                </div>
              </div>
              <br />
            </div>
            <div className="row">
              <div className="col-sm-10"></div>
              <div className="col-sm-2">
                  <div className="classWithPad e-tot-sales-vat-incl">
                    {this.state.totalAmountValIncl}
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10"></div>
              <div className="col-sm-2">
                <div className="classWithPad e-less-vat">
                  less vat
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10"></div>
              <div className="col-sm-2">
                <div className="classWithPad e-amount-net-of-vat">
                net of vat
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10"></div>
              <div className="col-sm-2">
                <div className="classWithPad e-less-pwd">
                less pwd
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10"></div>
              <div className="col-sm-2">
                <div className="classWithPad e-amount-due">
                  amount due
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10"></div>
              <div className="col-sm-2">
                <div className="classWithPad e-add-vat">
                add vat
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10"></div>
              <div className="col-sm-2">
                  <div className="classWithPad e-tot-amount">
                    {this.state.totalAmount}
                  </div>
              </div>
            </div>
            <div className="row e-foot-last">
              <div className="col-sm-2">{this.state.checkedBy}</div>
              <div className="col-sm-2">{this.state.deliveredBy}</div>
              <div className="col-sm-2">
                {moment(this.state.date.toString()).format("YYYY/MM/DD")}
              </div>
              <div className="col-sm-6"></div>
            </div>
            <div className="row">
              <div className="col-sm-12">f</div>
            </div>
            <br />
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
                  onClick={this.handlePrintBtn.bind(this)}
                >
                  Print
              </button>
          </form>
        </div>
      );
    }
  }
}

export default SiDrPrint;
