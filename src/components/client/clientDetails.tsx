import * as React from "react";
import { Component } from "react";
import BaseComponent from "../common/baseComponent";
import axios from "axios";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject,
} from "@syncfusion/ej2-react-grids";

class ClientDetails extends BaseComponent {

  private grid: GridComponent | null;

  state: {
    clientName: "";
    siDr : [] ;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      clientName: "",
      siDr : [] 
    };
  }

  handlclientNameChange(e: any) {
    this.setState({
      clientName: e.target.value,
    });
  }

  handleBackBtn() {
    this.props.history.push("/clientSearch/");
  }

  componentDidMount() {
     console.log("componentDidMount", this.props.match.params);
    // this.handleProductChange(this);
    if (this.props.match.params.clientName) {
      axios
        .post("http://localhost:8080/salesOrder/findSiDrs", {
          soldTo: this.props.match.params.clientName,
        })
        .then((res) => {
          console.log(res.data.result);
          this.setState({ siDr: res.data.result });
          
        });
    }
  }

  render() {
    return (
      <div>
        <div className="header">Client Details</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Client Name: </div>
            <div className="col-sm-4">
              <input
                type="text"
                value={this.props.match.params.clientName}
                className="form-control"
                onChange={this.handlclientNameChange.bind(this)}
                readOnly
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-12">Sales Invoice/Delivery Receipt</div>
          </div>
          <div className="row">
          <div className="col-sm-12">
          <GridComponent
            dataSource={this.state.siDr}
            gridLines={"Both"}
            rowHeight={40}
            allowPaging={true}
            pageSettings={{ pageCount: 5, pageSize: 10 }}
            style={{ width: "100%" }}
            allowSorting={true}
            ref={(g) => (this.grid = g)}
            //queryCellInfo={this.handleRenderSalesOrderNoHyperlink.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText="Sales Order No"
                field="salesOrderNo"
              />              
              <ColumnDirective headerText="Address" field="address" />
              <ColumnDirective
                headerText="Date"
                field="date"
                format="MM/dd/yyyy"
                type="date"
              />
              <ColumnDirective headerText="PO No" field="poNo" />
              <ColumnDirective headerText="TIN" field="tin" />
              <ColumnDirective headerText="Terms" field="terms" />
            </ColumnsDirective>
            <Inject services={[Page, Sort]} />
          </GridComponent>
          </div>
          </div>
          <br />         
          <div className="row">
            <div className="col-sm-5">
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

export default ClientDetails;
