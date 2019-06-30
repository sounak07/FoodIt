import React, { Component } from "react";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totprice,
      customer: {
        name: "Max Schwarzmüller",
        address: {
          street: "Teststreet 1",
          zipCode: "41351",
          country: "Germany"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(res => {
        // console.log(res);
        this.setState({ loading: false });
        alert("Order Placed! THANK YOU");
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div>
        <h4 className={classes.Heading}>Enter your info!</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler} className={classes.ContactData}>
            <input
              className={classes.Input}
              type="text"
              name="name"
              placeholder="Your name.."
            />
            <input
              className={classes.Input}
              type="text"
              name="email"
              placeholder="Your email.."
            />
            <input
              className={classes.Input}
              type="text"
              name="street"
              placeholder="Your street name.."
            />
            <input
              className={classes.Input}
              type="text"
              name="postal"
              placeholder="Your Postal code"
            />
            <Button btnType="Success">Order</Button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
