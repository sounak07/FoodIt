import React, { Component } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

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
        <Toolbar auth={this.props.auth} clicked={this.drawerHandler} />
        <SideDrawer
          auth={this.props.auth}
          open={this.state.showDrawer}
          showDrop={this.drawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStoreToProps = state => {
  return {
    auth: state.auth.token !== null
  };
};

export default connect(mapStoreToProps)(Layout);
