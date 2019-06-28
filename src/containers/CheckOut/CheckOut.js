import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckOutSummery/CheckOutSummery";

class CheckOut extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      becon: 0,
      meat: 0
    }
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const ingre = {};
    for (let i of params) {
      console.log(i);
      ingre[i[0]] = +i[1];
    }

    this.setState({ ingredients: ingre });
  }

  handleCheckoutContinue = () => {
    this.props.history.replace("/contact-form");
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
      </div>
    );
  }
}

export default CheckOut;
