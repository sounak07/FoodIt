import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummery extends Component {
  render() {
    const summery = Object.keys(this.props.ingredients).map(igkey => {
      return (
        <li key={igkey}>
          <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
          {this.props.ingredients[igkey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order Summery</h3>
        <p>You have the following ingredients</p>
        <ul>{summery}</ul>
        <p>
          <strong>Total Amount: {this.props.tp.toFixed(2)}</strong>
        </p>
        <Button clicked={this.props.continue} btnType="Success">
          CheckOut!
        </Button>
        <Button clicked={this.props.cancel} btnType="Danger">
          Cancel
        </Button>
      </Aux>
    );
  }
}

export default OrderSummery;
