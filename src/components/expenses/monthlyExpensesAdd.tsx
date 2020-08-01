import * as React from "react";
import { Component } from "react";
import BaseComponent from "../common/baseComponent";
import { FormValidator, FormValidatorModel } from "@syncfusion/ej2-inputs";
import axios from "axios";
import { DialogUtility } from "@syncfusion/ej2-popups";

class MontlyExpensesAdd extends BaseComponent {
  private formObject: FormValidator;

  state = {
    expensesId: "",
    profit: "",
    purchases: "",
    licenses: "",
    salary: "",
    officeRental: "",
    parking: "",
    pldt: "",
    meralco: "",
    waterBill: "",
    officeSupp: "",
    pettyCash: "",
    statutory: "",
    revFund: "",
    expensesTieUp: "",
    total: "",
  };

  handleProfitChange(e: any) {
    console.log(e.target.value);
    this.setState({
      profit: e.target.value,
    });
  }
  handlePurchasesChange(e: any) {
    this.setState({
      purchases: e.target.value,
    });
  }
  handleLicensesChange(e: any) {
    this.setState({
      licenses: e.target.value,
    });
  }
  handleSalaryChange(e: any) {
    this.setState({
      salary: e.target.value,
    });
  }
  handleOfficeRentalChange(e: any) {
    this.setState({
      officeRental: e.target.value,
    });
  }
  handleParkingChange(e: any) {
    this.setState({
      parking: e.target.value,
    });
  }
  handlePldtChange(e: any) {
    this.setState({
      pldt: e.target.value,
    });
  }
  handleMeralcoChange(e: any) {
    this.setState({
      meralco: e.target.value,
    });
  }
  handleWaterBillChange(e: any) {
    this.setState({
      waterBill: e.target.value,
    });
  }
  handleOfficeSuppChange(e: any) {
    this.setState({
      officeSupp: e.target.value,
    });
  }
  handlePettyCashChange(e: any) {
    this.setState({
      pettyCash: e.target.value,
    });
  }
  handleStatutoryChange(e: any) {
    this.setState({
      statutory: e.target.value,
    });
  }
  handleRevFundChange(e: any) {
    this.setState({
      revFund: e.target.value,
    });
  }
  handleExpensesTieUpChange(e: any) {
    this.setState({
      expensesTieUp: e.target.value,
    });
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params);
    {
      /*let requiredFields: FormValidatorModel = {
      rules: {},
    };

    this.formObject = new FormValidator("#form-element", requiredFields);
  */
    }
  }

  handleSaveBtn() {
    //if (this.formObject.validate() == true) {
    console.log(this.state);
    axios
      .post("http://localhost:8080/expenses/saveMonthlyExpenses", {
        profit: this.state.profit,
        purchases: this.state.purchases,
        licenses: this.state.licenses,
        salary: this.state.salary,
        officeRental: this.state.officeRental,
        parking: this.state.parking,
        pldt: this.state.pldt,
        meralco: this.state.meralco,
        waterBill: this.state.waterBill,
        officeSupEquip: this.state.officeSupp,
        pettyCash: this.state.pettyCash,
        statutory: this.state.statutory,
        revFund: this.state.revFund,
        expensesTieup: this.state.expensesTieUp,
        total: this.state.total,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          expensesId: res.data.expensesId,
        });
        if (this.state.expensesId) {
          DialogUtility.alert({
            animationSettings: { effect: "Zoom" },
            closeOnEscape: true,
            content: "Montly Expsenses Saved ",
            // okButton: { text: "OK", click: this.okClick.bind(this) },
            showCloseIcon: true,
            title: "Montly Expsenses Saved",
          });
        }
      });
    //}
  }

  handleBackBtn() {}

  render() {
    return (
      <div>
        <div className="header">Add Monthly Expenses</div>
        <br />
        <form id="form-element">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">Profit</div>
              <div className="col-sm-3">
                <input
                  id="profit"
                  name="profit"
                  type="text"
                  className="form-control"
                  //value={this.state.profit}
                  onChange={this.handleProfitChange.bind(this)}
                />
              </div>
              <div className="col-sm-2">Purchases</div>
              <div className="col-sm-3">
                <input
                  id="purchases"
                  name="purchases"
                  type="text"
                  className="form-control"
                  //value={this.state.purchases}
                  onChange={this.handlePurchasesChange.bind(this)}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-2">Licenses</div>
              <div className="col-sm-3">
                <input
                  id="licenses"
                  name="licenses"
                  type="text"
                  className="form-control"
                  //value={this.state.licenses}
                  onChange={this.handleLicensesChange.bind(this)}
                />
              </div>
              <div className="col-sm-2">Salary</div>
              <div className="col-sm-3">
                <input
                  id="salary"
                  name="salary"
                  type="text"
                  className="form-control"
                  //value={this.state.salary}
                  onChange={this.handleSalaryChange.bind(this)}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-2">Office Rental</div>
              <div className="col-sm-3">
                <input
                  id="officeRental"
                  name="officeRental"
                  type="text"
                  className="form-control"
                  //value={this.state.officeRental}
                  onChange={this.handleOfficeRentalChange.bind(this)}
                />
              </div>
              <div className="col-sm-2">SMM Parking</div>
              <div className="col-sm-3">
                <input
                  id="parking"
                  name="parking"
                  type="text"
                  className="form-control"
                  //value={this.state.parking}
                  onChange={this.handleParkingChange.bind(this)}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-2">PLDT</div>
              <div className="col-sm-3">
                <input
                  id="pldt"
                  name="pldt"
                  type="text"
                  className="form-control"
                  //value={this.state.pldt}
                  onChange={this.handlePldtChange.bind(this)}
                />
              </div>
              <div className="col-sm-2">Meralco</div>
              <div className="col-sm-3">
                <input
                  id="meralco"
                  name="meralco"
                  type="text"
                  className="form-control"
                  //value={this.state.meralco}
                  onChange={this.handleMeralcoChange.bind(this)}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-2">Water Bill</div>
              <div className="col-sm-3">
                <input
                  id="waterBill"
                  name="waterBill"
                  type="text"
                  className="form-control"
                  //value={this.state.waterBill}
                  onChange={this.handleWaterBillChange.bind(this)}
                />
              </div>
              <div className="col-sm-2">Office Supplies & Equipment</div>
              <div className="col-sm-3">
                <input
                  id="officeSupp"
                  name="officeSupp"
                  type="text"
                  className="form-control"
                  //value={this.state.officeSupp}
                  onChange={this.handleOfficeSuppChange.bind(this)}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-2">Petty Cash</div>
              <div className="col-sm-3">
                <input
                  id="pettyCash"
                  name="pettyCash"
                  type="text"
                  className="form-control"
                  //value={this.state.pettyCash}
                  onChange={this.handlePettyCashChange.bind(this)}
                />
              </div>
              <div className="col-sm-2">Statutory SSS,PHIC,PAGIBIG</div>
              <div className="col-sm-3">
                <input
                  id="statutory"
                  name="statutory"
                  type="text"
                  className="form-control"
                  //value={this.state.statutory}
                  onChange={this.handleStatutoryChange.bind(this)}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-2">Revolving Fund</div>
              <div className="col-sm-3">
                <input
                  id="revFund"
                  name="revFund"
                  type="text"
                  className="form-control"
                  //value={this.state.revFund}
                  onChange={this.handleRevFundChange.bind(this)}
                />
              </div>
              <div className="col-sm-2">Expenses Tie-Up</div>
              <div className="col-sm-3">
                <input
                  id="expensesTieUp"
                  name="expensesTieUp"
                  type="text"
                  className="form-control"
                  //value={this.state.expensesTieUp}
                  onChange={this.handleExpensesTieUpChange.bind(this)}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-5">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={this.handleSaveBtn.bind(this)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={this.handleBackBtn.bind(this)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default MontlyExpensesAdd;
