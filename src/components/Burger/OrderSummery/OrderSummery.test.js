import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OrderSummery from "./OrderSummery";
import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Aux/Aux";

configure({ adapter: new Adapter() });

const setup = props => {
  const component = shallow(<OrderSummery {...props} />);
  return component;
};

describe("<OrderSummery />", () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      ingredients: { salad: 0, meat: 0, becon: 0, cheese: 0 },
      tp: 2.369
    };
    wrapper = setup(props);
  });

  it("should show orderSummery if ingredients", () => {
    // expect(wrapper.find(Aux)).toHaveLength(1);
    const comp = wrapper.find('[data-test="orderSummery"]');
    expect(comp).toHaveLength(1);
  });

  it("should render 2 buttons all the time", () => {
    expect(wrapper.find(Button)).toHaveLength(2);
  });
});
