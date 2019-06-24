import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Modals/Modal";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";

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
    totalPrice: 2,
    purchasable: false,
    showModel: false
  };

  updatePurchasable = updated => {
    const sum = Object.keys(updated)
      .map(indi => {
        return updated[indi];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: sum > 0
    });
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
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredients = type => {
    const UpdatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = UpdatedCount;
    const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchasable(updatedIngredients);
  };

  showModelPop = () => {
    const status = true;
    this.setState({
      showModel: status
    });
  };

  backDropHandler = () => {
    const status = false;
    this.setState({
      showModel: status
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
        <Model
          show={this.state.showModel}
          backDropHandle={this.backDropHandler}
        >
          <OrderSummery ingredients={this.state.ingredients} />
        </Model>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngre={this.addIngredients}
          removeIngre={this.removeIngredients}
          disabled={disabledInfo}
          totPrice={this.state.totalPrice}
          purchase={this.state.purchasable}
          showM={this.showModelPop}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
