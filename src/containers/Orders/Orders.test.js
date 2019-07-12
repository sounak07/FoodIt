import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Orders from "./Orders.js";
import Order from "../../components/Order/Order";

configure({ adapter: new Adapter() });

// const setup = props => {
//   const component = shallow(<Orders {...props} />);
//   const componentInstance = component.instance();
//   componentInstance.componentDidMount();
//   return component;
// };

describe("<Orders />", () => {
  // let wrapper;
  // beforeEach(() => {
  //   const props = { auth: "sjdshgdhgsdhgXyyafd" };
  //   wrapper = setup(props);
  // });

  it("should show orderSummery if ingredients", () => {
    // wrapper.setState = {
    //   "-LjGOrUGTV8f0-Uqen2H": {
    //     ingredients: {
    //       becon: 1,
    //       cheese: 1,
    //       coffee: 1,
    //       coke: 1,
    //       meat: 1,
    //       salad: 1
    //     },
    //     orderData: {
    //       deliveryMethod: "cheapest",
    //       email: "sounak@gmail.com",
    //       name: "Sounak",
    //       street: "12365",
    //       zipCode: "123456"
    //     },
    //     price: 10.899999999999999,
    //     userId: "XXAfmlAKJfZZPTocM21ONNwGQYv2"
    //   },
    //   "-LjGNizJdVFUFpRvIDa4": {
    //     ingredients: {
    //       becon: 0,
    //       cheese: 0,
    //       coffee: 0,
    //       coke: 0,
    //       meat: 0,
    //       salad: 1
    //     },
    //     orderData: {
    //       deliveryMethod: "cheapest",
    //       email: "dwdw@gmail.com",
    //       name: "dsds",
    //       street: "546svs",
    //       zipCode: "sshghs"
    //     },
    //     price: 2.3,
    //     userId: "XXAfmlAKJfZZPTocM21ONNwGQYv2"
    //   }
    // };
    // expect(wrapper.find(Order)).toHaveLength(1);
  });
});
