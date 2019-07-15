import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { CheckOut } from "./CheckOut";
import CheckoutSummary from "../../components/Order/CheckOutSummery/CheckOutSummery";

configure({ adapter: new Adapter() });

const setUp = props => {
  const component = shallow(<CheckOut {...props} />);
  return component;
};

describe("<Checkout/>", () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      ingredients: {
        salad: 1,
        meat: 1,
        becon: 1,
        cheese: 1,
        coke: 1,
        coffee: 1
      },
      purchased: false,
      totprice: 10.369,
      match: { path: "/" }
    };
    wrapper = setUp(props);
  });

  it("should render checkoutsummery if ingre present", () => {
    expect(wrapper.find(CheckoutSummary)).toHaveLength(1);
  });
});
