import * as actionType from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.idToken,
        userId: action.localId
      };
    case actionType.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionType.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };
    default:
      return state;
  }
};

export default authReducer;
