import * as React from "react";
import { Component } from "react";
import BaseComponent from "../common/baseComponent";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import { DialogUtility } from "@syncfusion/ej2-popups";

class EmployeeDetails extends BaseComponent {
  state: {
    employeeId: 0;
    employeeName: "";
    role: 0;
    employeeType: 0;
    joinedDate: Date;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      employeeId: 0,
      employeeName: "",
      role: 0,
      employeeType: 0,
      joinedDate: new Date(),
    };
  }

  handlEmployeeNameChange(e: any) {
    this.setState({
      employeeName: e.target.value,
    });
  }

  handleEmployeeTypeChange(e: any) {
    console.log(e.target.value);
    this.setState({
      employeeType: e.target.value,
    });
  }

  handlJoinedDateChange(e: any) {
    this.setState({
      joinedDate: e.value,
    });
  }

  handleSaveBtn() {
    axios
      .post("http://localhost:8080/employee/saveEmployee", {
        siDrId: this.props.match.params.employeeId,
        employeeId: this.state.employeeId,
        employeeName: this.state.employeeName,
        role: this.state.role,
        employeeType: this.state.employeeType,
        joinedDate: this.state.joinedDate,
      })
      .then((res) => {
        console.log(res);
        // if (this.state.productId) {
        DialogUtility.alert({
          animationSettings: { effect: "Zoom" },
          closeOnEscape: true,
          content: "Employee " + this.state.employeeName + " created",
          showCloseIcon: true,
          title: "Employee added",
        });
        this.props.history.push("/employeeSearch/");
      })
      .catch(function (error) {
        DialogUtility.alert({
          animationSettings: { effect: "Zoom" },
          closeOnEscape: true,
          content:
            "There was an error creating the user, please contact administrator",
          showCloseIcon: true,
          title: "Employee Creation Error",
        });
      });
  }

  handleBackBtn() {
    this.props.history.push("/employeeSearch/");
  }

  componentDidMount() {
    // console.log("componentDidMount", this.props.match.params);
    // this.handleProductChange(this);
    if (this.props.match.params.employeeId) {
      axios
        .post("http://localhost:8080/employee/findEmployeeById", {
          employeeId: this.props.match.params.employeeId,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            employeeId: res.data.employeeId,
            employeeName: res.data.employeeName,
            role: res.data.role,
            employeeType: res.data.employeeType,
            joinedDate: res.data.joinedDate,
          });
        });
    }
  }

  render() {
    return (
      <div>
        <div className="header">Employee Add</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Employee Name: </div>
            <div className="col-sm-4">
              <input
                type="text"
                value={this.state.employeeName}
                className="form-control"
                onChange={this.handlEmployeeNameChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Employee Type: </div>
            <div className="col-sm-4">
              <select
                value={this.state.employeeType}
                className="form-control"
                onChange={this.handleEmployeeTypeChange.bind(this)}
                onBlur={this.handleEmployeeTypeChange.bind(this)}
              >
                <option></option>
                <option key="1" value="1">
                  Medical Representative
                </option>
                <option key="2" value="2">
                  Checker
                </option>
              </select>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Join Date: </div>
            <div className="col-sm-4">
              <DatePickerComponent
                id="dueDate"
                value={this.state.joinedDate}
                change={this.handlJoinedDateChange.bind(this)}
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
          <br />
        </div>
      </div>
    );
  }
}

export default EmployeeDetails;
