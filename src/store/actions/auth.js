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
  localStorage.removeItem("token");
  localStorage.removeItem("expireTime");
  localStorage.removeItem("userId");
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
    return axios
      .post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${type}?key=AIzaSyDiHq94Hx7oZIyPgf-8CEsY-UO6u_S7bB8`,
        data
      )
      .then(res => {
        const time = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        dispatch(auth_success(res.data.idToken, res.data.localId));
        dispatch(checkAuthValidity(res.data.expiresIn));
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expireTime", time);
        localStorage.setItem("userId", res.data.localId);
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

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userId");
    const time = new Date(localStorage.getItem("expireTime"));
    if (token) {
      if (time >= new Date()) {
        dispatch(auth_success(token, userID));
        dispatch(
          checkAuthValidity((time.getTime() - new Date().getTime()) / 1000)
        );
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  };
};
