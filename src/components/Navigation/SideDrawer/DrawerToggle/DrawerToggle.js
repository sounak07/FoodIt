import React from "react";
import classes from "./DrawerToggle.css";

const menu = props => {
  const apply = [classes.container, classes.MobileOnly];
  return (
    <div onClick={props.clickIn} className={apply.join(" ")}>
      <div className={classes.HamBurger} />
      <div className={classes.HamBurger} />
      <div className={classes.HamBurger} />
    </div>
  );
};

export default menu;
