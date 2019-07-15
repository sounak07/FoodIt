import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirect: "/"
    });
  });

  it("should store token and userId", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
          authRedirect: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "123=123",
          localId: "123=123"
        }
      )
    ).toEqual({
      token: "123=123",
      userId: "123=123",
      loading: false,
      error: null,
      authRedirect: "/"
    });
  });

  it("should delete token and userid", () => {
    expect(
      reducer(
        {
          token: "djwhdjhwdhwi",
          userId: "swhdiwhdwhidwhid",
          loading: false,
          error: null,
          authRedirect: "/"
        },
        {
          type: actionTypes.LOGOUT
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirect: "/"
    });
  });

  it("should redirect according to set path", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
          authRedirect: "/"
        },
        {
          type: actionTypes.SET_REDIRECT,
          path: "/checkout"
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirect: "/checkout"
    });
  });
});
