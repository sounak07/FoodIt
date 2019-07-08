import React from "react";
import classes from "./NavigationItems.css";
import Aux from "../../../hoc/Aux/Aux";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger
      </NavigationItem>
      {props.isAuth ? (
        <Aux>
          <NavigationItem link="/orders">Orders</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </Aux>
      ) : (
        <NavigationItem link="/auth">Auth!</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
