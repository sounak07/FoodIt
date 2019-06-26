import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Modals/Modal";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENTS_PRICES = {
  salad: 0.3,
  becon: 0.4,
  cheese: 0.5,
  meat: 0.7
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 2,
      purchasable: false,
      showModel: false,
      loading: false
    };
  }

  componentDidMount() {
    axios
      .get("https://burger-76104.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePurchasable = updated => {
    const sum = Object.keys(updated)
      .map(quantity => {
        return updated[quantity];
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

  purchaseCancel = () => {
    const status = false;
    this.setState({
      showModel: status
    });
  };

  purchaseContinue = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Max Schwarzmüller",
        address: {
          street: "Teststreet 1",
          zipCode: "41351",
          country: "Germany"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response.data);
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
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
        <Model show={this.state.showModel} backDropHandle={this.purchaseCancel}>
          {this.state.loading || !this.state.ingredients ? (
            <Spinner />
          ) : (
            <OrderSummery
              cancel={this.purchaseCancel}
              continue={this.purchaseContinue}
              ingredients={this.state.ingredients}
              tp={this.state.totalPrice}
            />
          )}
        </Model>
        {this.state.ingredients ? (
          <Aux>
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
        ) : (
          <Spinner />
        )}
      </Aux>
    );
  }
}

export default BurgerBuilder;
