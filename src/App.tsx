import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/common/navigation";
import SiDrSearch from "./components/sales/siDrSearch";
import SiDrDetails from "./components/sales/siDrDetails";
import CollectionSearch from "./components/collection/collectionSearch";
import ProductSearch from "./components/product/productSearch";
import Home from "./components/common/home";
import ProductDetails from "./components/product/productDetails";
import SiDrItemDetails from "./components/sales/siDrItemDetails";
import EmployeeSearch from "./components/employee/employeeSearch";
import EmployeeDetails from "./components/employee/employeeDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            {/* Sales Invoice/Delivery Receipt */}
            <Route path="/siDrSearch" component={SiDrSearch}></Route>
            <Route path="/siDrAdd" component={SiDrDetails}></Route>
            <Route path="/siDrDetails/:id" component={SiDrDetails}></Route>
            <Route
              path="/siDrItemDetails/:srDrId"
              component={SiDrItemDetails}
            ></Route>
            <Route
              path="/siDrItemDetailsEdit/:srDrId/:siDrItemId"
              component={SiDrItemDetails}
            ></Route>

            {/* Collection */}
            <Route path="/collection" component={CollectionSearch}></Route>

            {/* Product */}
            <Route path="/productSearch" component={ProductSearch}></Route>
            <Route
              path="/productDetails/:id"
              component={ProductDetails}
            ></Route>
            <Route path="/productAdd" component={ProductDetails}></Route>

            {/* Employee */}
            <Route path="/employeeSearch" component={EmployeeSearch}></Route>
            <Route path="/employeeAdd" component={EmployeeDetails}></Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
