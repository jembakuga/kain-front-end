import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { enableRipple } from "@syncfusion/ej2-base";
import {
  // ItemDirective,
  // ItemsDirective,
  MenuComponent,
  // ToolbarComponent
} from "@syncfusion/ej2-react-navigations";
// import * as ReactDom from "react-dom";
enableRipple(true);

class Navigation extends Component {
  private tbObj: any;
  private menuComponent: MenuComponent;
  menuItems: (
    | { items: { text: string; url: string }[]; text: string; url?: undefined }
    | { text: string; url: string; items?: undefined }
  )[];
  constructor(props: any) {
    super(props);
    // Menu items definition
    this.menuItems = [
      {
        items: [
          {
            text: "Search Product",
            url: "#/productSearch",
          },
          {
            text: "Create Product",
            url: "#/productAdd",
          },
        ],
        text: "Product",
      },
      {
        items: [
          {
            text: "Search Sales Invoice/Delivery Receipt",
            url: "#/siDrSearch",
          },
          {
            text: "Create Sales Invoice/Delivery Receipt",
            url: "#/siDrAdd",
          },
        ],
        text: "Sales",
      },
      {
        items: [
          {
            text: "Search Collection",
            url: "#/collectionSearch",
          },
          {
            text: "Create Collection",
            url: "#/collectionAdd",
          },
        ],
        text: "Collection",
      },
      {
        items: [
          {
            text: "Search Employee",
            url: "#/employeeSearch",
          },
          {
            text: "Create Employee",
            url: "#/employeeAdd",
          },
        ],
        text: "Employee",
      },
      {
        items: [
          {
            text: "Create Expense",
            url: "#/monthlyExpensesAdd/1",
          },
          {
            text: "Generate Expense Report",
            url: "#/monthlyExpensesSearch",
          },
          /*{
            text: "February",
            url: "#/monthlyExpensesAdd/2",
          },
          {
            text: "March",
            url: "#/monthlyExpensesAdd/3",
          },
          {
            text: "April",
            url: "#/monthlyExpensesAdd/4",
          },
          {
            text: "May",
            url: "#/monthlyExpensesAdd/5",
          },
          {
            text: "June",
            url: "#/monthlyExpensesAdd/6",
          },
          {
            text: "July",
            url: "#/monthlyExpensesAdd/7",
          },
          {
            text: "August",
            url: "#/monthlyExpensesAdd/8",
          },
          {
            text: "September",
            url: "#/monthlyExpensesAdd/9",
          },
          {
            text: "October",
            url: "#/monthlyExpensesAdd/10",
          },
          {
            text: "November",
            url: "#/monthlyExpensesAdd/11",
          },
          {
            text: "Decemvber",
            url: "#/monthlyExpensesAdd/12", 
          },*/
          //{
          //text: "Report 2",
          //url: "#/employeeAdd",
          //},
        ],
        text: "Expenses",
      },
      /*{
        items: [
          {
            text: "Search Employee",
            url: "#/employeeSearch",
          },
          {
            text: "Add Employee",
            url: "#/employeeAdd",
          },
        ],
        text: "Employee",
      },*/
      {
        items: [
          {
            text: "Search Client",
            url: "#/clientSearch",
          }
        ],
        text: "Client",
      },
      {
        items: [
          {
            text: "Product",
            url: "#/product",
          },
          {
            text: "Si/DR",
            url: "#/sales",
          },
          {
            text: "Collection",
            url: "#/collection",
          },
        ],
        text: "Visuals",
      },
    ];
    this.menuComponent = new MenuComponent({ items: this.menuItems });
  }

  render() {
    return (
      // <div className="toolbar-menu-control">
      //   <ToolbarComponent
      //     id="toolbar"
      //     created={this.onCreated}
      //     ref={scope => {
      //       this.tbObj = scope;
      //     }}
      //   >
      //     <ItemsDirective>
      //       <ItemDirective template={this.menuComponent} />
      //       <ItemDirective
      //         prefixIcon="em-icons e-shopping-cart"
      //         align="Right"
      //       />
      //     </ItemsDirective>
      //   </ToolbarComponent>
      // </div>
      <MenuComponent items={this.menuItems} />
    );
  }
  // state = {};
  // render() {
  //   return (
  //     <div>
  //       <ul>
  //         <Link to="/">
  //           <li>Home</li>
  //         </Link>
  //         <Link to="/siDr">
  //           <li>Sales Invoice/Delivery Receipt</li>
  //         </Link>
  //         <Link to="/collection">
  //           <li>Collection</li>
  //         </Link>
  //         <Link to="/productSearch">
  //           <li>Product</li>
  //         </Link>
  //       </ul>
  //     </div>
  //   );
  // }
}

export default Navigation;
