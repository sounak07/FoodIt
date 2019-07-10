import React from "react";
import classes from "./BuildControl.css";

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        disabled={props.disabled}
        onClick={props.removed}
        className={classes.Less}
      >
        Less
      </button>
      <button
        disabled={props.limitInfo}
        onClick={props.added}
        className={classes.More}
      >
        More
      </button>
    </div>
  );
};

export default buildControl;
