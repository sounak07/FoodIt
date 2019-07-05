import React, { Component } from "react";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as logoutActions from "../../../store/actions/index";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    this.props.logoutHandle();
  }

  render() {
    return <div>{this.props.auth ? <Spinner /> : <Redirect to="/" />}</div>;
  }
}

const mapStoreToProps = state => {
  return {
    auth: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutHandle: () => dispatch(logoutActions.logoutHandler())
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Logout);
