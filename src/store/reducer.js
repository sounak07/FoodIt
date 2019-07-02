import * as actionTypes from "./actions";

const INGREDIENTS_PRICES = {
  salad: 0.3,
  becon: 0.4,
  cheese: 0.5,
  meat: 0.7
};

const initState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    becon: 0,
    meat: 0
  },
  totalPrice: 2
};

const reducer = (state = initState, action) => {
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
    default:
      return state;
  }
};

export default reducer;
