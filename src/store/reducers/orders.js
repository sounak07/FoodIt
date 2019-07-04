import * as actionTypes from "../actions/actionTypes";

const order = {
  orders: [],
  laoding: false,
  purchased: false
};

const OrderReducer = (state = order, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case actionTypes.ORDER_HANDLER:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        orders: newOrder,
        purchased: true
      };
    case actionTypes.PURCHASED:
      return {
        ...state,
        purchased: false
      };
    default:
      return state;
  }
};

export default OrderReducer;
