import * as actionTypes from "./actionTypes";
import axios from "axios";

export const auth_start = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const auth_success = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    localId: localId
  };
};

export const auth_failure = e => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: e
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkAuthValidity = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth_process = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(auth_start());
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let type;

    isSignUp ? (type = "signupNewUser") : (type = "verifyPassword");
    axios
      .post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${type}?key=AIzaSyDiHq94Hx7oZIyPgf-8CEsY-UO6u_S7bB8`,
        data
      )
      .then(res => {
        dispatch(auth_success(res.data.idToken, res.data.localId));
        dispatch(checkAuthValidity(res.data.expiresIn));
      })
      .catch(error => {
        dispatch(auth_failure(error.response.data.error));
      });
  };
};

export const logoutHandler = () => {
  return dispatch => {
    dispatch(logout());
  };
};

export const setRedirect = path => {
  return {
    type: actionTypes.SET_REDIRECT,
    path: path
  };
};
