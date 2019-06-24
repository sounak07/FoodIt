import React from "react";
import classes from "./BackDrop.css";

const backDrop = props => {
  return props.shows ? (
    <div onClick={props.backD} className={classes.Backdrop} />
  ) : null;
};

export default backDrop;
