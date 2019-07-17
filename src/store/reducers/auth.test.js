import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";
import fetchMock from "fetch-mock";
import expect from "expect";
import * as actions from "../actions/index";
import mockStorage from "../../utils/mockLocalStorage";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockStorage;

describe("auth reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

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

  // it("should login signup user depending upon conditions", () => {
  //   fetchMock.postOnce("/auth", {
  //     data: {
  //       kind: "identitytoolkit#SignInWithPasswordResponse",
  //       localId: "XXAfmlAKJfZZPTocM21ONNwGQYv2",
  //       email: "sounakume@gmail.com",
  //       displayName: "",
  //       idToken:
  //         "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwZTQxMjczMzMwYTg2ZmRjMjhlMjgzMDVhNDRkYzlhODgzZTI2YTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnVyZ2VyLTc2MTA0IiwiYXVkIjoiYnVyZ2VyLTc2MTA0IiwiYXV0aF90aW1lIjoxNTYzMzYwOTgwLCJ1c2VyX2lkIjoiWFhBZm1sQUtKZlpaUFRvY00yMU9OTndHUVl2MiIsInN1YiI6IlhYQWZtbEFLSmZaWlBUb2NNMjFPTk53R1FZdjIiLCJpYXQiOjE1NjMzNjA5ODAsImV4cCI6MTU2MzM2NDU4MCwiZW1haWwiOiJzb3VuYWt1bWVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNvdW5ha3VtZUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.JZdio0K9sOR_8SEpyvUFR7q6j6hkwELceZu9hqBHdjX_orfQmjBbXQTLKGi05yuvZ7F0TPsukYio1FBoZOF3SxkFEZLW3yMjSHiQQRhaiqWicr5Dp6tZAF_KogVKmCyb23wwFAykhMuX8pAtfCbkh-yisZrT67llCYKNSbo3ZeaxrnWDCA5m_mWwAfO_S_l1OsC7uX39A8Bq2Xr4icxs8WMxTWCzvRmfNWxufKY4g6sLcJpo7qEDVYep5Uwn1DmXRiiX8iyHwcUfSERacFN7OzGy3JyaRu2eZUj0A22a7pAUzW_5Ki7c8rqEuoalQsbOC25nr7xjQzR26hJM8Kwzeg",
  //       registered: true,
  //       refreshToken:
  //         "AEu4IL09-kFvv_ChWMwMY5Yr0o6AG1fIk5WYwpD09VcOEi9cVGeraEbGuxELAFpM_jyfZwYNQJfY1qLWxwtfJI1-q1F-2OpTWtJ699KZAqP5cCHaOzeoGbgcztxNhs7_lBcm4v8qRPmFu_ronSWwaj8zOVSdVo4pkUyaZKp6mzUUIdmCzQE0r8VzDaJbZQUn9p7SAYe9Kppzm-uz4ysJoOOIMgXC4waoBg",
  //       expiresIn: "3600"
  //     }
  //   });

  //   const expectedActions = [
  //     { type: actionTypes.AUTH_START },
  //     {
  //       type: actionTypes.AUTH_SUCCESS,
  //       idToken:
  //         "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwZTQxMjczMzMwYTg2ZmRjMjhlMjgzMDVhNDRkYzlhODgzZTI2YTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnVyZ2VyLTc2MTA0IiwiYXVkIjoiYnVyZ2VyLTc2MTA0IiwiYXV0aF90aW1lIjoxNTYzMzYwOTgwLCJ1c2VyX2lkIjoiWFhBZm1sQUtKZlpaUFRvY00yMU9OTndHUVl2MiIsInN1YiI6IlhYQWZtbEFLSmZaWlBUb2NNMjFPTk53R1FZdjIiLCJpYXQiOjE1NjMzNjA5ODAsImV4cCI6MTU2MzM2NDU4MCwiZW1haWwiOiJzb3VuYWt1bWVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNvdW5ha3VtZUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.JZdio0K9sOR_8SEpyvUFR7q6j6hkwELceZu9hqBHdjX_orfQmjBbXQTLKGi05yuvZ7F0TPsukYio1FBoZOF3SxkFEZLW3yMjSHiQQRhaiqWicr5Dp6tZAF_KogVKmCyb23wwFAykhMuX8pAtfCbkh-yisZrT67llCYKNSbo3ZeaxrnWDCA5m_mWwAfO_S_l1OsC7uX39A8Bq2Xr4icxs8WMxTWCzvRmfNWxufKY4g6sLcJpo7qEDVYep5Uwn1DmXRiiX8iyHwcUfSERacFN7OzGy3JyaRu2eZUj0A22a7pAUzW_5Ki7c8rqEuoalQsbOC25nr7xjQzR26hJM8Kwzeg",
  //       localId: "XXAfmlAKJfZZPTocM21ONNwGQYv2"
  //     }
  //   ];

  //   const store = mockStore({ res: {} });
  //   return store
  //     .dispatch(actions.auth_process("sounakume@gmail.com", "123456", false))
  //     .then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  // });
});
