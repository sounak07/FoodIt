import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NoOrder from "../../components/UI/noOrders/noOrders";

export class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    const query = `?auth=${this.props.auth}&orderBy="userId"&equalTo="${
      this.props.userId
    }"`;

    axios.get(`/orders.json${query}`).then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      this.setState({ orders: fetchedOrders, loading: false });
      console.log(fetchedOrders);
    });
  }

  render() {
    return (
      <div>
        {this.props.auth ? null : <Redirect to="/" />}
        {this.state.orders === null ? (
          <NoOrder />
        ) : this.state.loading ? (
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

const mapStoreToProps = state => {
  return {
    auth: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(mapStoreToProps)(Orders);
