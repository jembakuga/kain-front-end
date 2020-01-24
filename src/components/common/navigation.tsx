import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <div>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/siDr">
            <li>Sales Invoice/Delivery Receipt</li>
          </Link>
          <Link to="/collection">
            <li>Collection</li>
          </Link>
          <Link to="/product">
            <li>Product</li>
          </Link>
        </ul>
      </div>
    );
  }
}

export default Navigation;
