import * as actionTypes from "../actions/actionTypes";

const INGREDIENTS_PRICES = {
  salad: 0.3,
  becon: 0.4,
  cheese: 0.5,
  meat: 0.7,
  coke: 4,
  coffee: 3
};

const initState = {
  ingredients: null,
  totalPrice: null,
  error: false,
  building: false
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
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
        building: true
      };
    case actionTypes.INIT_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 2,
        error: false,
        building: false
      };
    case actionTypes.ERROR:
      return {
        ...state,
        error: true
      };
    // case actionTypes.PRICE_FETCH:
    //   return {
    //     ...state,
    //     totalPrice: action.price.price
    //   };
    default:
      return state;
  }
};

export default burgerBuilder;
