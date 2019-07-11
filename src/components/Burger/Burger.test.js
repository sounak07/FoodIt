import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Burger from "../Burger/Burger";
import BurgerIngredients from "../Burger/BurgerIngredients/BurgerIngredients";

configure({ adapter: new Adapter() });

// const setUp = (props = {}) => {
//   const component = shallow(<Burger {...props} />);
//   return component;
// };

// describe("<Burger/>", () => {
//   let wrapper;
//   beforeEach(() => {
//     const props = {
//       ingredients: { salad: 0, meat: 0, becon: 0, cheese: 0 }
//     };
//     wrapper = setUp(props);
//   });

//   it("should show 2 ingredients if no props", () => {
//     expect(wrapper.find(BurgerIngredients)).toHaveLength(2);
//   });
// });

const setUp = props => {
  const component = shallow(<Burger {...props} />);
  return component;
};

describe("<Burger/>", () => {
  describe("With 0 ingre", () => {
    let wrapper;
    beforeEach(() => {
      const props = { ingredients: { salad: 0, meat: 0, becon: 0, cheese: 0 } };
      wrapper = setUp(props);
    });

    it("should show top and bottom bread i.e., 2 ingre if no props", () => {
      expect(wrapper.find(BurgerIngredients)).toHaveLength(2);
    });
  });

  describe("With 2 , 3 oe more then 0 ingredients", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        ingredients: {
          salad: 2,
          meat: 1,
          becon: 1,
          cheese: 1,
          coke: 0,
          coffee: 1
        }
      };
      wrapper = setUp(props);
    });

    it("should show more than 2 ingre acc to props", () => {
      expect(wrapper.find(BurgerIngredients)).toHaveLength(8);
    });
  });
});
