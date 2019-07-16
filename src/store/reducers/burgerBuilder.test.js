import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer from "./burgerBuilder";
import * as actionTypes from "../actions/actionTypes";
import fetchMock from "fetch-mock";
import expect from "expect";
import * as actions from "../actions/index";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("BurgerBuilder", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      ingredients: null,
      totalPrice: null,
      error: false,
      building: false
    });
  });

  it("should init 0 and ingredients name", () => {
    expect(
      reducer(
        {
          ingredients: null,
          totalPrice: null,
          error: false,
          building: false
        },
        {
          type: actionTypes.INIT_INGREDIENT,
          ingredients: {
            salad: 0,
            cheese: 0,
            becon: 0,
            meat: 0,
            coke: 0,
            coffee: 0
          }
        }
      )
    ).toEqual({
      ingredients: {
        salad: 0,
        cheese: 0,
        becon: 0,
        meat: 0,
        coke: 0,
        coffee: 0
      },
      totalPrice: 2,
      error: false,
      building: false
    });
  });

  it("should add ingredients to state-store", () => {
    expect(
      reducer(
        {
          ingredients: {
            salad: 0,
            cheese: 0,
            becon: 0,
            meat: 0,
            coke: 0,
            coffee: 0
          },
          totalPrice: 2,
          error: false,
          building: false
        },
        {
          type: actionTypes.ADD_INGREDIENT,
          ingredientName: "salad"
        }
      )
    ).toEqual({
      ingredients: {
        salad: 1,
        cheese: 0,
        becon: 0,
        meat: 0,
        coke: 0,
        coffee: 0
      },
      totalPrice: 2.3,
      error: false,
      building: true
    });
  });

  it("should remove ingredients to state-store", () => {
    expect(
      reducer(
        {
          ingredients: {
            salad: 0,
            cheese: 0,
            becon: 1,
            meat: 0,
            coke: 0,
            coffee: 0
          },
          totalPrice: 2.4,
          error: false,
          building: false
        },
        {
          type: actionTypes.REMOVE_INGREDIENT,
          ingredientName: "becon"
        }
      )
    ).toEqual({
      ingredients: {
        salad: 0,
        cheese: 0,
        becon: 0,
        meat: 0,
        coke: 0,
        coffee: 0
      },
      totalPrice: 2,
      error: false,
      building: true
    });
  });

  it("calls initIngrdients when call has been done", () => {
    fetchMock.getOnce("/ingredients", {
      body: {
        ingredients: {
          salad: 0,
          cheese: 0,
          becon: 0,
          meat: 0,
          coke: 0,
          coffee: 0
        }
      },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      {
        type: actionTypes.INIT_INGREDIENT,

        ingredients: {
          salad: 0,
          cheese: 0,
          becon: 0,
          meat: 0,
          coke: 0,
          coffee: 0
        }
      }
    ];
    const store = mockStore({ ingredients: null });

    return store.dispatch(actions.fetchIngredients()).then(data => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
