import React, { Component } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showDrawer: false
  };

  drawerHandler = () => {
    const update = !this.state.showDrawer;
    this.setState({
      showDrawer: update
    });
  };

  render(props) {
    return (
      <Aux>
        <Toolbar clicked={this.drawerHandler} />
        <SideDrawer
          open={this.state.showDrawer}
          showDrop={this.drawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
