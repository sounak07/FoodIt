import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";
import Spinner from "../../components/UI/Spinner/Spinner";
import Burger from "../../components/Burger/Burger";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it("should render BuildControl if there is ingredients", () => {
    wrapper.setProps({ ingredients: { salad: 1, meat: 1 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });

  it("should render OrderSummery if there is ingredients", () => {
    wrapper.setProps({
      ingredients: { salad: 1, meat: 1 },
      purchaseCancel: true,
      purchaseContinue: false
    });
    expect(wrapper.find(OrderSummery)).toHaveLength(1);
  });

  it("should show spinner if no ingredients", () => {
    wrapper.setProps({ ingredients: null });
    expect(wrapper.find(Spinner)).toHaveLength(2);
  });

  it("should show Burger no ingredients", () => {
    wrapper.setProps({ ingredients: { salad: 1, meat: 1 } });
    expect(wrapper.find(Burger)).toHaveLength(1);
  });
});
