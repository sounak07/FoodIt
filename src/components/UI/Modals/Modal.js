import React from "react";
import classes from "./Model.css";
import BackDrop from "../BackDrop/BackDrop";
import Aux from "../../../hoc/Aux";

const model = props => {
  return (
    <Aux>
      <BackDrop shows={props.show} backD={props.backDropHandle} />
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
        className={classes.Modal}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default model;
