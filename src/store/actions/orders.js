import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const orderSuccess = (id, orderData) => {
  return {
    type: actionTypes.ORDER_HANDLER,
    orderId: id,
    orderData: orderData
  };
};

export const loading = () => {
  return {
    type: actionTypes.LOADING
  };
};

export const orderFailure = e => {
  return {
    type: actionTypes.ORDER_FAILED,
    error: e
  };
};

export const orderInit = orderData => {
  return dispatch => {
    dispatch(loading());
    axios
      .post("/orders.json", orderData)
      .then(res => {
        // console.log(res.data.name);
        dispatch(orderSuccess(res.data.name, orderData));
        dispatch(loading());
      })
      .catch(e => {
        dispatch(orderFailure(e));
      });
  };
};

export const purchased = () => {
  return {
    type: actionTypes.PURCHASED
  };
};
