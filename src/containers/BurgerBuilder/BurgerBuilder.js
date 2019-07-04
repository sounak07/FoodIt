import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Modals/Modal";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as burgerCreators from "../../store/actions/index.js";

// const INGREDIENTS_PRICES = {
//   salad: 0.3,
//   becon: 0.4,
//   cheese: 0.5,
//   meat: 0.7
// };

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ingredients: null,
      // totalPrice: 2,
      // purchasable: false,
      showModel: false
      // loading: false
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
    //   axios
    //     .get("https://burger-76104.firebaseio.com/ingredients.json")
    //     .then(res => {
    //       this.setState({ ingredients: res.data });
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
  }

  updatePurchasable = updated => {
    const sum = Object.keys(updated)
      .map(quantity => {
        return updated[quantity];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  // addIngredients = type => {
  //   const UpdatedCount = this.props.ingredients[type] + 1;
  //   const updatedIngredients = {
  //     ...this.props.ingredients
  //   };
  //   updatedIngredients[type] = UpdatedCount;
  //   const updatedPrice = INGREDIENTS_PRICES[type] + this.props.totalPrice;
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice
  //   });
  //   this.updatePurchasable(updatedIngredients);
  // };

  // removeIngredients = type => {
  //   const UpdatedCount = this.props.ingredients[type] - 1;
  //   const updatedIngredients = {
  //     ...this.props.ingredients
  //   };
  //   updatedIngredients[type] = UpdatedCount;
  //   const updatedPrice = this.props.totalPrice - INGREDIENTS_PRICES[type];
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice
  //   });
  //   this.updatePurchasable(updatedIngredients);
  // };

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
    // const queryParams = [];
    // for (let i in this.props.ingredients)
    //   queryParams.push(
    //     `${encodeURIComponent(i)}=${encodeURIComponent(
    //       this.props.ingredients[i]
    //     )}`
    //   );
    // queryParams.push(`price=${this.props.totalPrice.toFixed(2)}`);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: `?${queryString}`
    // });

    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Model show={this.state.showModel} backDropHandle={this.purchaseCancel}>
          {!this.props.ingredients ? (
            <Spinner />
          ) : (
            <OrderSummery
              cancel={this.purchaseCancel}
              continue={this.purchaseContinue}
              ingredients={this.props.ingredients}
              tp={this.props.totalPrice}
            />
          )}
        </Model>
        {this.props.ingredients ? (
          <Aux>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              addIngre={this.props.addIngredients}
              removeIngre={this.props.removeIngredients}
              disabled={disabledInfo}
              totPrice={this.props.totalPrice}
              purchase={this.updatePurchasable(this.props.ingredients)}
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

const mapStoreToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredients: type => dispatch(burgerCreators.addIngredients(type)),
    removeIngredients: type => dispatch(burgerCreators.removeIngredients(type)),
    onInitIngredients: () => dispatch(burgerCreators.fetchIngredients())
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(BurgerBuilder);
