import React, { Component } from "react";
import classes from "./BurgerIngredients.css";
import PropTypes from "prop-types";

class BurgerIngredients extends Component {
  render(props) {
    let ingredient = null;

    switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom} />;
        break;
      case "bread-top":
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;
      case "meat":
        ingredient = <div className={classes.Meat} />;
        break;
      case "cheese":
        ingredient = <div className={classes.Cheese} />;
        break;
      case "salad":
        ingredient = <div className={classes.Salad} />;
        break;
      case "becon":
        ingredient = <div className={classes.Bacon} />;
        break;
      default:
        ingredient = null;
        break;
    }

    return ingredient;
  }
}

BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredients;
