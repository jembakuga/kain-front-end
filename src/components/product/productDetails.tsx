import React from "react";
import BaseComponent from "../common/baseComponent";
import axios from "axios";
// import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
// import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DialogUtility } from "@syncfusion/ej2-popups";
import { HashRouter, Link } from "react-router-dom";
import * as ReactDOM from "react-dom";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  // Page,
  // Sort,
  Inject,
  CommandModel,
  Edit,
  EditSettingsModel,
  CommandColumn
  // CommandClickEventArgs
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";

class ProductDetails extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  state: {
    prodCode: "";
    prodDesc: "";
    prodId: "";
  };
  constructor(props: any) {
    super(props);
    this.state = {
      prodCode: "",
      prodDesc: "",
      prodId: ""
    };
  }

  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/product/findProductItemsByProduct",
    adaptor: new UrlAdaptor()
  });

  public editOptions: EditSettingsModel = {
    allowEditing: true,
    allowDeleting: true
  };

  handlProdCodeChange(e: any) {
    this.setState({
      prodCode: e.target.value
    });
  }

  handlProdDescChange(e: any) {
    this.setState({
      prodDesc: e.target.value
    });
  }

  handleBackBtn() {
    this.props.history.push("/productSearch");
  }

  handleAddToInventoryButton() {
    console.log(this.state);
    this.props.history.push("/productItemDetails/" + this.state.prodId);
  }

  private dialogInstance: any;

  handleSaveBtn() {
    axios
      .post("http://localhost:8080/product/saveProduct", {
        productId: this.props.match.params.id
          ? this.props.match.params.id
          : this.state.prodId,
        productCode: this.state.prodCode,
        productDesc: this.state.prodDesc
      })
      .then(res => {
        console.log(res);
        this.setState({
          prodCode: res.data.productCode,
          prodDesc: res.data.productDesc,
          prodId: res.data.productId
        });
        if (this.state.prodId) {
          DialogUtility.alert({
            animationSettings: { effect: "Zoom" },
            closeOnEscape: true,
            content: "Product " + this.state.prodCode + " created",
            showCloseIcon: true,
            title: "Product Created"
          });
          this.props.history.push("/productSearch");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params.id);
    if (this.props.match.params.id) {
      axios
        .post("http://localhost:8080/product/findProduct", {
          productId: this.props.match.params.id
        })
        .then(res => {
          console.log(res);
          this.setState({
            prodCode: res.data.productCode,
            prodDesc: res.data.productDesc,
            prodId: res.data.productId
          });
        });

      if (this.grid) {
        this.grid.dataSource = this.dataManager;
        this.query = new Query().addParams(
          "productId",
          this.props.match.params.id
        );
        this.grid.query = this.query;
      }
    }
  }

  handleProductCodeHyperlink(args: any) {
    console.log(args.data);
    if (args.column.field === "batchNo") {
      ReactDOM.render(
        <HashRouter>
          <Link
            to={
              "/productItemDetailsEdit/" +
              this.props.match.params.id +
              "/" +
              args.data.productItemId
            }
          >
            {" "}
            {args.data.batchNo}
          </Link>
        </HashRouter>,
        args.cell
      );
    }
  }

  public commands: CommandModel[] = [
    {
      buttonOption: {
        content: "Remove",
        cssClass: "e-flat"
      }
    }
  ];

  render() {
    return (
      <div>
        <div className="header">Product Create</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">Product Code: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={this.state.prodCode}
                onChange={this.handlProdCodeChange.bind(this)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Product Description: </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={this.state.prodDesc}
                onChange={this.handlProdDescChange.bind(this)}
              />
            </div>
          </div>
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
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={this.handleAddToInventoryButton.bind(this)}
              >
                Add To Inventory
              </button>
            </div>
          </div>
          <br />
          <br />
          <div>
            <GridComponent
              editSettings={this.editOptions}
              // commandClick={this.commandClick}
              gridLines={"Both"}
              rowHeight={40}
              allowPaging={true}
              pageSettings={{ pageCount: 5, pageSize: 10 }}
              style={{ width: "100%" }}
              allowSorting={true}
              ref={g => (this.grid = g)}
              queryCellInfo={this.handleProductCodeHyperlink.bind(this)}
            >
              <ColumnsDirective>
                <ColumnDirective headerText="Batch No" field="batchNo" />
                <ColumnDirective
                  headerText="Retail Price"
                  field="retailPrice"
                />
                <ColumnDirective headerText="Expiry Date" field="expiryDate" />
                <ColumnDirective
                  headerText="Arrival Date"
                  field="arrivalDate"
                />
                <ColumnDirective
                  headerText="Action"
                  width="120"
                  commands={this.commands}
                />
              </ColumnsDirective>
              <Inject services={[Edit, CommandColumn]} />
            </GridComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
