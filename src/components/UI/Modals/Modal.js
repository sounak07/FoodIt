import React, { Component } from "react";

import classes from "./Model.css";
import BackDrop from "../BackDrop/BackDrop";
import Aux from "../../../hoc/Aux/Aux";

class Model extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <BackDrop shows={this.props.show} backD={this.props.backDropHandle} />
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Model;
