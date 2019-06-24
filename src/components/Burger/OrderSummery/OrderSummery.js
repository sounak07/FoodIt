import React from "react";
import Aux from "./../../../hoc/Aux";

const orderSummery = props => {
  const summery = Object.keys(props.ingredients).map(igkey => {
    return (
      <li key={igkey}>
        <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
        {props.ingredients[igkey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order Summery</h3>
      <p>You have the following ingredients</p>
      <ul>{summery}</ul>
      <button>Checkout!</button>
    </Aux>
  );
};

export default orderSummery;
