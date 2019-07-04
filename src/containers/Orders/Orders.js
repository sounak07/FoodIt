import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios.get("/orders.json").then(res => {
      //   console.log(res.data);
      const fetchedOrders = [];
      for (let key in res.data) {
        // console.log(res.data[key]);
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      this.setState({ orders: fetchedOrders, loading: false });
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Spinner />
        ) : (
          this.state.orders.map(order => {
            return (
              <Order
                ingredients={order.ingredients}
                price={order.price.toFixed(2)}
                key={order.id}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default Orders;
