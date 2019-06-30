import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckOutSummery.css";

const CheckOutSummery = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope you like it!</h1>
      <div style={{ width: "100%", height: "300px", margin: "0 auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Success" clicked={props.checkOutContinue}>
        CheckOut
      </Button>
      <Button btnType="Danger" clicked={props.checkOutCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default CheckOutSummery;
