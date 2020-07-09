import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/common/navigation";
import SiDrSearch from "./components/sales/siDrSearch";
import SiDrDetails from "./components/sales/siDrDetails";
import CollectionSearch from "./components/collection/collectionSearch";
import CollectionDetails from "./components/collection/collectionDetails";
import ProductSearch from "./components/product/productSearch";
import Home from "./components/common/home";
import ProductDetails from "./components/product/productDetails";
import ProductItemDetails from "./components/product/productItemDetails";
import SiDrItemDetails from "./components/sales/siDrItemDetails";
import EmployeeSearch from "./components/employee/employeeSearch";
import EmployeeDetails from "./components/employee/employeeDetails";
import CollectionItemDetails from "./components/collection/collectionItemDetails";
import Sales from "./components/visual/sales";
import Collection from "./components/visual/collection";
import Product from "./components/visual/product";
import MonthlyExpensesAdd from "./components/expenses/monthlyExpensesAdd";

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
            <Route
              path="/collectionSearch"
              component={CollectionSearch}
            ></Route>
            <Route
              path="/collectionSearch/:collectionId"
              component={CollectionSearch}
            ></Route>
            <Route path="/collectionAdd" component={CollectionDetails}></Route>
            <Route
              path="/collectionDetails/:collectionId"
              component={CollectionDetails}
            ></Route>
            <Route
              path="/collectionItemDetails/:collectionId"
              component={CollectionItemDetails}
            ></Route>
            <Route
              path="/collectionItemDetailsEdit/:collectionId/:collectionItemId"
              component={CollectionItemDetails}
            ></Route>
            {/* Product */}
            <Route path="/productSearch" component={ProductSearch}></Route>
            <Route
              path="/productDetails/:id"
              component={ProductDetails}
            ></Route>
            <Route path="/productAdd" component={ProductDetails}></Route>
            <Route
              path="/productItemDetails/:productId"
              component={ProductItemDetails}
            ></Route>
            <Route
              path="/productItemDetailsEdit/:productId/:productItemId"
              component={ProductItemDetails}
            ></Route>
            {/* Employee */}
            <Route path="/employeeSearch" component={EmployeeSearch}></Route>
            <Route path="/employeeAdd" component={EmployeeDetails}></Route>
            <Route
              path="/employeeDetails/:employeeId"
              component={EmployeeDetails}
            ></Route>

            {/* Monthly Expenses */}
            <Route
              path="/monthlyExpensesAdd"
              component={MonthlyExpensesAdd}
            ></Route>
            <Route path="/employeeAdd" component={EmployeeDetails}></Route>
            <Route
              path="/employeeDetails/:employeeId"
              component={EmployeeDetails}
            ></Route>
            <Route path="/sales" component={Sales}></Route>
            <Route path="/collection" component={Collection}></Route>
            <Route path="/product" component={Product}></Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
