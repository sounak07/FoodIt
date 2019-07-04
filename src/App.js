import React, { Component } from "react";
import Layout from "./hoc/Layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./containers/Auth/Auth";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
