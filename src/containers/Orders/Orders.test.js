import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Orders } from "./Orders.js";
import Order from "../../components/Order/Order";

configure({ adapter: new Adapter() });

const setup = (props, state) => {
  const component = shallow(<Orders {...props} {...state} />);
  return component;
};

describe("<Orders />", () => {
  let wrapper;
  beforeEach(() => {
    const props = { auth: "sjdshgdhgsdhgXyyafd" };
    const state = { orders: [], loading: true };
    wrapper = setup(props, state);
  });

  it("should show orderSummery if ingredients", () => {
    const fetchorder = [
      {
        ingredients: {
          becon: 1,
          cheese: 1,
          coffee: 1,
          coke: 1,
          meat: 1,
          salad: 1
        },
        orderData: {
          deliveryMethod: "cheapest",
          email: "sounak@gmail.com",
          name: "Sounak",
          street: "12365",
          zipCode: "123456"
        },
        price: 10.899999999999999,
        userId: "XXAfmlAKJfZZPTocM21ONNwGQYv2"
      },
      {
        ingredients: {
          becon: 1,
          cheese: 1,
          coffee: 1,
          coke: 1,
          meat: 1,
          salad: 1
        },
        orderData: {
          deliveryMethod: "cheapest",
          email: "sounak@gmail.com",
          name: "Sounak",
          street: "12365",
          zipCode: "123456"
        },
        price: 10.899999999999999,
        userId: "XXAfmlAKJfZZPTocM21ONNwGQYv2"
      }
    ];
    wrapper.setState({ orders: fetchorder, loading: false });
    wrapper.instance().componentDidMount();
    expect(wrapper.find(Order)).toHaveLength(2);
  });
});
