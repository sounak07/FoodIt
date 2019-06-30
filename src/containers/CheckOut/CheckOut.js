import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckOutSummery/CheckOutSummery";
import ContactData from "../../containers/CheckOut/ContactData/ContactData";
import { Route } from "react-router-dom";

class CheckOut extends Component {
  state = {
    ingredients: null,
    totprice: 0
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    const ingre = {};
    let price = 0;
    for (let i of params) {
      // console.log(i);
      if (i[0] === "price") price = +i[1];
      else ingre[i[0]] = +i[1];
    }

    this.setState({ ingredients: ingre, totprice: price });
  }

  handleCheckoutContinue = () => {
    this.props.history.replace("/checkout/contact-form");
  };

  handleCheckoutCancel = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkOutCancel={this.handleCheckoutCancel}
          checkOutContinue={this.handleCheckoutContinue}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-form"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              totprice={this.state.totprice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default CheckOut;
