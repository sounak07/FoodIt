import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer from "./orders";
import * as actions from "../actions/index";
import * as actionTypes from "../actions/actionTypes";
import fetchMock from "fetch-mock";
import expect from "expect";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Orders reducer tests", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      orders: [],
      laoding: false,
      purchased: false
    });
  });

  it("should false laoding state", () => {
    expect(
      reducer(
        {
          orders: [],
          loading: true,
          purchased: false
        },
        {
          type: actionTypes.LOADING
        }
      )
    ).toEqual({
      orders: [],
      loading: false,
      purchased: false
    });
  });

  it("should run orderHandler", () => {
    expect(
      reducer(
        { orders: [], loading: false, purchased: false },
        {
          type: actionTypes.ORDER_HANDLER,
          orderId: "1",
          orderData: {
            ingredients: {
              becon: 1,
              cheese: 1,
              coffee: 1,
              coke: 1,
              meat: 1,
              salad: 1
            },
            orderData: {
              deliveryMethod: "",
              email: "",
              name: "",
              street: "",
              zipCode: ""
            },
            price: 10.899999999999999,
            userId: "XXAfmlAKJfZZPTocM21ONNwGQYv2"
          }
        }
      )
    ).toEqual({
      orders: {
        id: "1",
        ingredients: {
          becon: 1,
          cheese: 1,
          coffee: 1,
          coke: 1,
          meat: 1,
          salad: 1
        },
        orderData: {
          deliveryMethod: "",
          email: "",
          name: "",
          street: "",
          zipCode: ""
        },
        price: 10.899999999999999,
        userId: "XXAfmlAKJfZZPTocM21ONNwGQYv2"
      },
      loading: false,
      purchased: true
    });
  });

  //   it("should recieve data on call and fire order_success", () => {
  //     fetchMock.postOnce("/orders.json", {
  //       orderData: {
  //         ingredients: {
  //           becon: 1,
  //           cheese: 1,
  //           coffee: 1,
  //           coke: 1,
  //           meat: 1,
  //           salad: 1
  //         },
  //         orderData: {
  //           deliveryMethod: "",
  //           email: "",
  //           name: "",
  //           street: "",
  //           zipCode: ""
  //         },
  //         price: 10.899999999999999,
  //         userId: "XXAfmlAKJfZZPTocM21ONNwGQYv2"
  //       }
  //     });

  //     const expectedActions = [
  //       {
  //         type: actionTypes.LOADING
  //       },
  //       {
  //         type: actionTypes.ORDER_HANDLER,
  //         orderId: "-LjzMRorn2Lw50f9HjlVh",
  //         orderData: {
  //           ingredients: {
  //             becon: 1,
  //             cheese: 1,
  //             coffee: 1,
  //             coke: 1,
  //             meat: 1,
  //             salad: 1
  //           },
  //           orderData: {
  //             deliveryMethod: "",
  //             email: "",
  //             name: "",
  //             street: "",
  //             zipCode: ""
  //           },
  //           price: 10.899999999999999,
  //           userId: "XXAfmlAKJfZZPTocM21ONNwGQYv2"
  //         }
  //       },
  //       {
  //         type: actionTypes.LOADING
  //       }
  //     ];

  //     const store = mockStore({ orderData: null });

  //     const order = {
  //       ingredients: {
  //         becon: 1,
  //         cheese: 1,
  //         coffee: 1,
  //         coke: 1,
  //         meat: 1,
  //         salad: 1
  //       },
  //       orderData: {
  //         deliveryMethod: "",
  //         email: "",
  //         name: "",
  //         street: "",
  //         zipCode: ""
  //       },
  //       price: 10.899999999999999,
  //       userId: "XXAfmlAKJfZZPTocM21ONNwGQYv2"
  //     };

  //     return store
  //       .dispatch(
  //         actions.orderInit(
  //           order,
  //           "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwZTQxMjczMzMwYTg2ZmRjMjhlMjgzMDVhNDRkYzlhODgzZTI2YTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnVyZ2VyLTc2MTA0IiwiYXVkIjoiYnVyZ2VyLTc2MTA0IiwiYXV0aF90aW1lIjoxNTYzMzU1MzU5LCJ1c2VyX2lkIjoiWFhBZm1sQUtKZlpaUFRvY00yMU9OTndHUVl2MiIsInN1YiI6IlhYQWZtbEFLSmZaWlBUb2NNMjFPTk53R1FZdjIiLCJpYXQiOjE1NjMzNTUzNTksImV4cCI6MTU2MzM1ODk1OSwiZW1haWwiOiJzb3VuYWt1bWVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNvdW5ha3VtZUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.k3gXpZfcvUzU17dCZPPqX2sdFvRWjmJttrYXeG9nQfvCFma36m8fmb56SZfsATx2j06v5JqmWZtas1IKil9Uej7zxzNUVU1ls0-1ktrelpnmE8P6FvI5w6tTq62tHU1SEutLxK9tqL_FR8uYSjOgO06JFX7RCaeL2j_QvUFaZylUkqDBliLxql3_-KDxtzUzPpo6M3DSj8ijSjbjJ4-4RaOWEEIY87tRx-An-0QEgD1kPdZE1J1ET3ZcsZlG4l5pdSqUokjZ-0O8FUQRmOAJlv6dWBDIVi_MHd18kupka_PoE-6FW4LUDZQ3vlnqFzXXlA-nQw2eUOqap5uWiXBSDg"
  //         )
  //       )
  //       .then(() => {
  //         expect(store.getActions()).toEqual(expectedActions);
  //       });
  //   });
});
