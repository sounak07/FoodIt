import React from "react";
import Aux from "./../../../hoc/Aux";
import Button from "../../UI/Button/Button";

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
      <p>
        <strong>Total Amount: {props.tp.toFixed(2)}</strong>
      </p>
      <Button clicked={props.continue} btnType="Success">
        CheckOut!
      </Button>
      <Button clicked={props.cancel} btnType="Danger">
        Cancel
      </Button>
    </Aux>
  );
};

export default orderSummery;
