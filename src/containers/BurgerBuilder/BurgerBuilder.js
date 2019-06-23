import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENTS_PRICES = {
  salad: 0.3,
  becon: 0.4,
  cheese: 0.5,
  meat: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      becon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredients = type => {
    const UpdatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = UpdatedCount;
    const updatedPrice = INGREDIENTS_PRICES[type] + this.state.totalPrice;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
  };

  removeIngredients = type => {
    const UpdatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = UpdatedCount;
    const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
    if (UpdatedCount >= 0)
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngre={this.addIngredients}
          removeIngre={this.removeIngredients}
          disabled={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
