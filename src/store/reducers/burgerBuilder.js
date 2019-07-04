import * as actionTypes from "../actions/actionTypes";

const INGREDIENTS_PRICES = {
  salad: 0.3,
  becon: 0.4,
  cheese: 0.5,
  meat: 0.7
};

const initState = {
  ingredients: null,
  totalPrice: 2,
  error: false
};

const burgerBuilder = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
      };
    case actionTypes.INIT_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      };
    case actionTypes.ERROR:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default burgerBuilder;
