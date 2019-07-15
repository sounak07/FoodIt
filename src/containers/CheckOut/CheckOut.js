import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckOutSummery/CheckOutSummery";
import ContactData from "../../containers/CheckOut/ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export class CheckOut extends Component {
  // state = {
  //   ingredients: null,
  //   totprice: 0
  // };

  // componentWillMount() {
  //   const params = new URLSearchParams(this.props.location.search);
  //   const ingre = {};
  //   let price = 0;
  //   for (let i of params) {
  //     // console.log(i);
  //     if (i[0] === "price") price = +i[1];
  //     else ingre[i[0]] = +i[1];
  //   }

  //   this.setState({ ingredients: ingre, totprice: price });
  // }

  handleCheckoutContinue = () => {
    this.props.history.replace("/checkout/contact-form");
  };

  handleCheckoutCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const redirect = this.props.purchased ? <Redirect to="/" /> : null;

    return (
      <div>
        {this.props.ingredients ? (
          <div>
            {redirect}
            <CheckoutSummary
              checkOutCancel={this.handleCheckoutCancel}
              checkOutContinue={this.handleCheckoutContinue}
              ingredients={this.props.ingredients}
            />
            <Route
              path={this.props.match.path + "/contact-form"}
              component={ContactData}
            />
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totprice: state.burger.totalPrice,
    purchased: state.odr.purchased
  };
};

export default connect(mapStoreToProps)(CheckOut);
