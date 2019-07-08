import React, { Component } from "react";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderCreators from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    order: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your ZipCode"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "", displayValue: "Select Delivery Method" },
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        validation: {
          required: true
        },
        value: "",
        valid: true
      }
    },
    formIsValid: false
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== "" && isValid;

    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    return isValid;
  };

  inputChangedHandler = (event, key) => {
    const updatedOrderForm = {
      ...this.state.order
    };
    const updatedFormElement = {
      ...updatedOrderForm[key]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[key] = updatedFormElement;

    let formValid = true;
    for (let key in updatedOrderForm) {
      formValid = updatedOrderForm[key].valid && formValid;
    }

    this.setState({ order: updatedOrderForm, formIsValid: formValid });
  };

  orderHandler = event => {
    event.preventDefault();
    let formData = {};

    for (let i in this.state.order) {
      formData[i] = this.state.order[i].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    };

    // console.log(this.props.userId);
    this.props.initOrder(order, this.props.token);

    // axios
    //   .post("/orders.json", order)
    //   .then(res => {
    //     // console.log(res);
    //     this.setState({ loading: false });
    //     alert("Order Placed! THANK YOU");
    //     this.props.history.replace("/");
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });
  };

  render() {
    let form = Object.keys(this.state.order).map(key => {
      // return console.log(key.elementConfig.type);
      return (
        <Input
          key={key}
          elementType={this.state.order[key].elementType}
          elementConfig={this.state.order[key].elementConfig}
          value={this.state.order[key].value}
          changed={event => this.inputChangedHandler(event, key)}
          invalid={!this.state.order[key].valid}
          shouldValidate={this.state.order[key].validation}
          touched={this.state.order[key].touched}
        />
      );
    });

    return (
      <div>
        <h4 className={classes.Heading}>Enter your info!</h4>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler} className={classes.ContactData}>
            {form}
            <Button disabled={!this.state.formIsValid} btnType="Success">
              Order
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.odr.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initOrder: (orderData, token, userId) =>
      dispatch(orderCreators.orderInit(orderData, token, userId))
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(ContactData);
