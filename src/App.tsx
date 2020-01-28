import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/common/navigation";
import SiDrSearch from "./components/sales/siDrSearch";
import CollectionSearch from "./components/collection/collectionSearch";
import ProductSearch from "./components/product/productSearch";
import Home from "./components/common/home";
import ProductDetails from "./components/product/productDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/siDr" component={SiDrSearch}></Route>
            <Route path="/collection" component={CollectionSearch}></Route>
            <Route path="/productSearch" component={ProductSearch}></Route>
            <Route
              path="/productDetails/:id"
              component={ProductDetails}
            ></Route>
            <Route path="/productAdd" component={ProductDetails}></Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
