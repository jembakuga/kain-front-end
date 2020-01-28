import React, { Component } from "react";
import { Link } from "react-router-dom";
import { enableRipple } from "@syncfusion/ej2-base";
import { MenuComponent } from "@syncfusion/ej2-react-navigations";
import * as ReactDom from "react-dom";
enableRipple(true);

class Navigation extends Component {
  menuItems: (
    | { items: { text: string; url: string }[]; text: string; url?: undefined }
    | { text: string; url: string; items?: undefined }
  )[];
  constructor() {
    super({});
    // Menu items definition
    this.menuItems = [
      {
        items: [
          {
            text: "Search Product",
            url: "http://localhost:3000/#/productSearch"
          },
          {
            text: "Create Product",
            url: "/productSearch"
          }
        ],
        text: "Product"
      },
      {
        items: [
          {
            text: "Headphones",
            url: "https://www.google.com/search?q=headphones"
          },
          {
            text: "Memory Cards",
            url: "https://www.google.com/search?q=memory+cards"
          },
          {
            text: "Power Banks",
            url: "https://www.google.com/search?q=power+banks"
          }
        ],
        text: "Mobile"
      },
      {
        items: [
          {
            text: "Televisions",
            url: "https://www.google.com/search?q=televisions"
          },
          {
            text: "Home Theatres",
            url: "https://www.google.com/search?q=home+theatres"
          },
          {
            text: "Gaming Laptops",
            url: "https://www.google.com/search?q=gaming+laptops"
          }
        ],
        text: "Entertainment"
      },
      { text: "Fashion", url: "https://www.google.com/search?q=fashion" },
      { text: "Offers", url: "https://www.google.com/search?q=offers" }
    ];
  }
  beforeItemRender(args: any) {
    if (args.item.url) {
      args.element
        .getElementsByTagName("a")[0]
        .setAttribute("target", "_blank");
    }
  }
  render() {
    return (
      <MenuComponent
        items={this.menuItems}
        beforeItemRender={this.beforeItemRender}
      />
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
