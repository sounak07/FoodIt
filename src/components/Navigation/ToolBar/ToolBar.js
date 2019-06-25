import React from "react";

import classes from "./ToolBar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../../Navigation/SideDrawer/DrawerToggle/DrawerToggle";

const toolBar = props => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.MobileOnly}>
        <DrawerToggle clickIn={props.clicked} />
      </div>
      <Logo height="80%" />
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolBar;
