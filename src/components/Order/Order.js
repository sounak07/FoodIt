import React from "react";
import classes from "./Order.css";

const order = props => {
  // console.log(props.ingredients);

  const orderList = Object.keys(props.ingredients).map(key => {
    return (
      <span key={key}>
        {" "}
        {key} <strong>({props.ingredients[key]})</strong> |
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <strong>Ingredients: </strong>
      {orderList}

      <p>
        Price: $ <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
