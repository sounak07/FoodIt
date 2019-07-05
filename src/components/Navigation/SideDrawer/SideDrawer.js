import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from "../../../hoc/Aux/Aux";
import BackDrop from "../../UI/BackDrop/BackDrop";

const sideDrawer = props => {
  let attachedClass = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClass = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <BackDrop shows={props.open} backD={props.showDrop} />
      <div className={attachedClass.join(" ")}>
        <Logo height="11%" />
        <nav>
          <NavigationItems isAuth={props.auth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
