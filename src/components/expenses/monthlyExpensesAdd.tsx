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
    month: "",
    year: "",
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
    this.setState({ month: this.props.match.params.month });
    console.log(this.state.month);
    /*axios
      .post("http://localhost:8080/expenses/retrieveMonthlyExpenses", {
        month_: this.props.match.params.month,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          expensesId: res.data.expensesId,
          profit: res.data.profit,
          purchases: res.data.purchases,
          licenses: res.data.licenses,
          salary: res.data.salary,
          officeRental: res.data.officeRental,
          parking: res.data.parking,
          pldt: res.data.pldt,
          meralco: res.data.meralco,
          waterBill: res.data.waterBill,
          officeSupp: res.data.officeSupEquip,
          pettyCash: res.data.pettyCash,
          statutory: res.data.statutory,
          revFund: res.data.revFund,
          expensesTieUp: res.data.expensesTieup,
          total: res.data.total,
          month: res.data.month_,
        });
      });*/

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
        month_: this.props.match.params.month,
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

  handleYearChange(e: any) {
    this.setState({
      year: e.target.value,
    });
    //this.retrieveData();
  }

  handleMonthChange(e: any) {
    this.setState({
      month: e.target.value,
    });
    //this.retrieveData();
    axios
      .post("http://localhost:8080/expenses/retrieveMonthlyExpenses", {
        month_: e.target.value,
        year_: this.state.year,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          expensesId: res.data.expensesId,
          profit: res.data.profit,
          purchases: res.data.purchases,
          licenses: res.data.licenses,
          salary: res.data.salary,
          officeRental: res.data.officeRental,
          parking: res.data.parking,
          pldt: res.data.pldt,
          meralco: res.data.meralco,
          waterBill: res.data.waterBill,
          officeSupp: res.data.officeSupEquip,
          pettyCash: res.data.pettyCash,
          statutory: res.data.statutory,
          revFund: res.data.revFund,
          expensesTieUp: res.data.expensesTieup,
          total: res.data.total,
          month: res.data.month_,
        });
      });
  }

  retrieveData() {
    console.log("year: " + this.state.year);
    console.log("month: " + this.state.month);
    if (
      ((this.state.year !== "" ||
        this.state.year !== undefined ||
        this.state.year !== null) &&
        this.state.month !== "") ||
      this.state.month !== undefined ||
      this.state.month !== null
    ) {
      axios
        .post("http://localhost:8080/expenses/retrieveMonthlyExpenses", {
          month_: this.state.month,
          year_: this.state.year,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            expensesId: res.data.expensesId,
            profit: res.data.profit,
            purchases: res.data.purchases,
            licenses: res.data.licenses,
            salary: res.data.salary,
            officeRental: res.data.officeRental,
            parking: res.data.parking,
            pldt: res.data.pldt,
            meralco: res.data.meralco,
            waterBill: res.data.waterBill,
            officeSupp: res.data.officeSupEquip,
            pettyCash: res.data.pettyCash,
            statutory: res.data.statutory,
            revFund: res.data.revFund,
            expensesTieUp: res.data.expensesTieup,
            total: res.data.total,
            month: res.data.month_,
          });
        });
    }
  }

  render() {
    return (
      <div>
        <div className="header">Add Monthly Expenses</div>
        <br />
        <form id="form-element">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">Year</div>
              <div className="col-sm-3">
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
              <div className="col-sm-2">Month</div>
              <div className="col-sm-3">
                <select
                  //value={this.state.employeeType}
                  className="form-control"
                  onChange={this.handleMonthChange.bind(this)}
                  onBlur={this.handleMonthChange.bind(this)}
                >
                  <option></option>
                  <option key="January" value="1">
                    January
                  </option>
                  <option key="February" value="2">
                    February
                  </option>
                  <option key="March" value="3">
                    March
                  </option>
                  <option key="April" value="4">
                    April
                  </option>
                  <option key="May" value="5">
                    May
                  </option>
                  <option key="June" value="6">
                    June
                  </option>
                  <option key="July" value="7">
                    July
                  </option>
                  <option key="August" value="8">
                    February
                  </option>
                  <option key="September" value="9">
                    September
                  </option>
                  <option key="October" value="10">
                    October
                  </option>
                  <option key="November" value="11">
                    May
                  </option>
                  <option key="December" value="12">
                    June
                  </option>
                </select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-2">Profit</div>
              <div className="col-sm-3">
                <input
                  id="profit"
                  name="profit"
                  type="text"
                  className="form-control"
                  value={this.state.profit}
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
                  value={this.state.purchases}
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
                  value={this.state.licenses}
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
                  value={this.state.salary}
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
                  value={this.state.officeRental}
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
                  value={this.state.parking}
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
                  value={this.state.pldt}
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
                  value={this.state.meralco}
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
                  value={this.state.waterBill}
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
                  value={this.state.officeSupp}
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
                  value={this.state.pettyCash}
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
                  value={this.state.statutory}
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
                  value={this.state.revFund}
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
                  value={this.state.expensesTieUp}
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
