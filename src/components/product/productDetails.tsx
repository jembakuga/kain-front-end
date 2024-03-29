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
  ColumnModel,
  // Page,
  // Sort,
  Inject,
  CommandModel,
  Edit,
  EditSettingsModel,
  CommandColumn,
  CommandClickEventArgs,
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";

class ProductDetails extends BaseComponent {
  private grid: GridComponent | null;
  private query: Query;
  state: {
    prodCode: "";
    prodDesc: "";
    prodId: "";
    prodCat:"";
    availProdCount: 0;
    productItemData: [];
  };
  constructor(props: any) {
    super(props);
    this.state = {
      prodCode: "",
      prodDesc: "",
      prodId: "",
      prodCat: "",
      availProdCount: 0,
      productItemData: [],
    };
  }

  private dataManager: DataManager = new DataManager({
    url: "http://localhost:8080/product/findProductItemsByProduct",
    adaptor: new UrlAdaptor(),
  });

  public editOptions: EditSettingsModel = {
    allowEditing: true,
    allowDeleting: true,
  };

  handlProdCodeChange(e: any) {
    this.setState({
      prodCode: e.target.value,
    });
  }

  handlProdCatChange(e: any) {
    this.setState({
      prodCat: e.target.value,
    });
  }

  handlProdDescChange(e: any) {
    this.setState({
      prodDesc: e.target.value,
    });
  }

  handlAvailProdCountChange(e: any) {
    this.setState({
      availProdCount: e.target.value,
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
    console.log("asdf");
    axios
      .post("http://localhost:8080/product/saveProduct", {
        productId: this.props.match.params.id
          ? this.props.match.params.id
          : this.state.prodId,
        productCode: this.state.prodCode,
        productDesc: this.state.prodDesc,
        productCat: this.state.prodCat
      })
      .then((res) => {
        console.log(res);
        if(res.data.success){
          this.setState({
            prodCode: res.data.data.productCode,
            prodDesc: res.data.data.productDesc,
            prodId: res.data.data.productId,
          });
          if (this.state.prodId) {
            DialogUtility.alert({
              animationSettings: { effect: "Zoom" },
              closeOnEscape: true,
              content: "Product " + this.state.prodCode + " created",
              showCloseIcon: true,
              title: "Product Created",
            });
            this.props.history.push("/productSearch");
          }
        }else{
          DialogUtility.alert({
            animationSettings: { effect: "Zoom" },
            closeOnEscape: true,
            content: res.data.message,
            showCloseIcon: true,
            title: "Product Created",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params.id);
    if (this.props.match.params.id) {
      axios
        .post("http://localhost:8080/product/findProduct", {
          productId: this.props.match.params.id,
        })
        .then((res) => {
          console.log(res);
          this.setState({
            prodCode: res.data.productCode,
            prodDesc: res.data.productDesc,
            prodId: res.data.productId,
            availProdCount: res.data.availProdCount,
            prodCat: res.data.productCat,
            productItemData: res.data.productItemBeanList,
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
    //console.log(args.data);
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
        cssClass: "e-flat",
      },
    },
  ];

  public commandClick(args: CommandClickEventArgs): void {
    if (this.grid) {
      let data = JSON.parse(JSON.stringify(args.rowData));
      console.log(data);
      axios
        .post("http://localhost:8080/product/deleteProductItemById", {
          productItemId: data.productItemId,
        })
        .then((res) => {
          // console.log(res.data.salesOrderNo);
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
            issueDate: res.data.issueDate,
            date: res.data.date,
            dueDate: res.data.dueDate,
          });
        });
      this.grid.dataSource = this.dataManager;
      this.query = new Query().addParams(
        "productId",
        this.props.match.params.id
      );
      // console.log("asdfsda");
      this.grid.query = this.query;
      this.grid.refresh();
    }
  }

  render() {
    this.commandClick = this.commandClick.bind(this);
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
          <br />
          <div className="row">
            <div className="col-sm-3">Product Category: </div>
            <div className="col-sm-4">
            <select
                  id="checkedBy"
                  name="checkedBy"
                  value={this.state.prodCat}
                  className="form-control"
                  onChange={this.handlProdCatChange.bind(this)}
                  onBlur={this.handlProdCatChange.bind(this)}
                >
                  <option></option>
                  <option key="1" value="Open">
                    Open
                  </option>
                  <option key="2" value="Exclusive">
                    Exclusive
                  </option>
                </select>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">Available Product Count: </div>
            <div className="col-sm-4">
              <input
                type="text"
                readOnly
                className="form-control"
                value={this.state.availProdCount}
                onChange={this.handlAvailProdCountChange.bind(this)}
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
              commandClick={this.commandClick}
              gridLines={"Both"}
              rowHeight={40}
              allowPaging={true}
              pageSettings={{ pageCount: 5, pageSize: 10 }}
              style={{ width: "100%" }}
              allowSorting={true}
              ref={(g) => (this.grid = g)}
              queryCellInfo={this.handleProductCodeHyperlink.bind(this)}
              dataSource={this.state.productItemData}
            >
              <ColumnsDirective>
                <ColumnDirective headerText="Batch No" field="batchNo" />
                <ColumnDirective headerText="Base Price" field="basePrice" />
                <ColumnDirective headerText="Quantity" field="quantity" />
                <ColumnDirective
                  headerText="Expiry Date"
                  field="expiryDate"
                  format="MM/dd/yyyy"
                  type="date"
                />
                <ColumnDirective
                  headerText="Arrival Date"
                  field="arrivalDate"
                  format="MM/dd/yyyy"
                  type="datetime"
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
