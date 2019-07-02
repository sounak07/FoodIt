import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckOutSummery/CheckOutSummery";
import ContactData from "../../containers/CheckOut/ContactData/ContactData";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

class CheckOut extends Component {
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
    return (
      <div>
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
    );
  }
}

const mapStoreToProps = state => {
  return {
    ingredients: state.ingredients,
    totprice: state.totalPrice
  };
};

export default connect(mapStoreToProps)(CheckOut);
