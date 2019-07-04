import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredients = type => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: type
  };
};

export const removeIngredients = type => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: type
  };
};

export const initIngredients = res => {
  return {
    type: actionTypes.INIT_INGREDIENT,
    ingredients: res
  };
};

export const error = () => {
  return {
    type: actionTypes.ERROR
  };
};

export const fetchIngredients = () => {
  return dispatch => {
    axios
      .get("https://burger-76104.firebaseio.com/ingredients.json")
      .then(res => {
        // console.log(res.data);
        dispatch(initIngredients(res.data));
      })
      .catch(e => {
        dispatch(error());
      });
  };
};
