import React, { Component } from "react";
import Layout from "./hoc/Layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={CheckOut} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
