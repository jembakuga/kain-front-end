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
  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/salesOrder/findSiDrItemsBySiDr",
    adaptor: new UrlAdaptor(),
  });

  public editOptions: EditSettingsModel = {
    allowEditing: true,
    allowDeleting: true,
  };

  handleSalesOrderNoChange(e: any) {
    this.setState({
      salesOrderNo: e.target.value,
    });
  }
  handlePoNoChange(e: any) {
    this.setState({
      poNo: e.target.value,
    });
  }
  handleCheckedByChange(e: any) {
    this.setState({
      checkedBy: e.target.value,
    });
  }
  handleSoldToChange(e: any) {
    this.setState({
      soldTo: e.target.value,
    });
  }
  handlDueDateChange(e: any) {
    this.setState({
      dueDate: e.value,
    });
  }
  handleAddressChange(e: any) {
    this.setState({
      address: e.target.value,
    });
  }
  handleTinChange(e: any) {
    this.setState({
      tin: e.target.value,
    });
  }
  handleTermsChange(e: any) {
    this.setState({
      terms: e.target.value,
    });
  }
  handleBusinessStlyeChange(e: any) {
    this.setState({
      businessStyle: e.target.value,
    });
  }
  handleDeliveredByChange(e: any) {
    console.log(e.target.value);
    this.setState({
      deliveredBy: e.target.value,
    });
  }
  handleDateChange(e: any) {
    this.setState({
      date: e.value,
    });
  }
  handleIssueDateChange(e: any) {
    this.setState({
      issueDate: e.value,
    });
  }

  handleTypeChange(e: any) {
    this.setState({
      type: e.target.value,
    });
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params);
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
        //window.print();
      }
    }
    axios
      .post("http://localhost:8080/employee/findEmployeeForDropdown")
      .then((res) => {
        console.log(res.data);
        this.setState({
          checkers: res.data.checkers,
          medReps: res.data.medReps,
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
        <div>
          <br />
          <form id="form-element">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-2"> </div>
                <div className="col-sm-3">{this.state.soldTo}</div>
                <div className="col-sm-2"> </div>
                <div className="col-sm-3">{this.state.date}</div>
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
                <div>
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
                        headerText="Unit Price"
                        field="unitPrice"
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
              <div className="col-sm-2">{this.state.checkedBy}</div>
              <div className="col-sm-2">{this.state.deliveredBy}</div>
              <div className="col-sm-2">
                {moment(this.state.date.toString()).format("YYYY/MM/DD")}
              </div>
              <div className="col-sm-6"></div>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default SiDrPrint;
