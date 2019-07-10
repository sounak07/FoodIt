import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Modals/Modal";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as burgerCreators from "../../store/actions/index.js";

export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
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

  showModelPop = () => {
    const status = true;
    if (this.props.auth) {
      this.setState({
        showModel: status
      });
    } else {
      this.props.setCheckOutPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancel = () => {
    const status = false;
    this.setState({
      showModel: status
    });
  };

  purchaseContinue = () => {
    this.props.onPurchased();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const limitInfo = {
      ...this.props.ingredients
    };

    for (let key in limitInfo) {
      limitInfo[key] = limitInfo[key] >= 3;
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
              limitInfo={limitInfo}
              totPrice={this.props.totalPrice}
              purchase={this.updatePurchasable(this.props.ingredients)}
              showM={this.showModelPop}
              isAuth={this.props.auth}
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
    error: state.burger.error,
    auth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredients: type => dispatch(burgerCreators.addIngredients(type)),
    removeIngredients: type => dispatch(burgerCreators.removeIngredients(type)),
    onInitIngredients: () => dispatch(burgerCreators.fetchIngredients()),
    onPurchased: () => dispatch(burgerCreators.purchased()),
    setCheckOutPath: path => dispatch(burgerCreators.setRedirect(path))
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(BurgerBuilder);
