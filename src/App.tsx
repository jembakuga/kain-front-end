import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/common/navigation";
import SiDrSearch from "./components/sales/siDrSearch";
import CollectionSearch from "./components/collection/collectionSearch";
import ProductSearch from "./components/product/productSearch";
import Home from "./components/common/home";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/siDr" component={SiDrSearch}></Route>
            <Route path="/collection" component={CollectionSearch}></Route>
            <Route path="/product" component={ProductSearch}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
