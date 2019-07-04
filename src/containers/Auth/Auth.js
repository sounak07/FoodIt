import React, { Component } from "react";
import classes from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import * as authCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    formControls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 15
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== "" && isValid;

    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    return isValid;
  };

  inputChangedHandler = (event, key) => {
    const updatedForm = {
      ...this.state.formControls
    };

    const updatedFormInput = {
      ...updatedForm[key]
    };

    updatedFormInput.value = event.target.value;
    updatedFormInput.valid = this.checkValidity(
      event.target.value,
      updatedFormInput.validation
    );
    updatedFormInput.touched = true;
    updatedForm[key] = updatedFormInput;
    this.setState({ formControls: updatedForm });
  };

  authHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      this.state.isSignUp
    );
  };

  switchHandler = event => {
    event.preventDefault();
    const current = this.state.isSignUp;
    this.setState({
      isSignUp: !current
    });
  };

  render() {
    let form = Object.keys(this.state.formControls).map(key => {
      return (
        <Input
          key={key}
          elementType={this.state.formControls[key].elementType}
          elementConfig={this.state.formControls[key].elementConfig}
          value={this.state.formControls[key].value}
          changed={event => this.inputChangedHandler(event, key)}
          invalid={!this.state.formControls[key].valid}
          shouldValidate={this.state.formControls[key].validation}
          touched={this.state.formControls[key].touched}
        />
      );
    });

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p className={classes.Error}>{this.props.error.message}</p>
      );
    }
    return (
      <div>
        <h4 className={classes.Heading}>
          {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
        </h4>
        {errorMessage}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form className={classes.Auth}>
            {form}
            <Button clicked={this.authHandler} btnType="Success">
              {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
            </Button>
            <Button clicked={this.switchHandler} btnType="Danger">
              SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(authCreators.auth_process(email, password, isSignUp))
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Auth);
