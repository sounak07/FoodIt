import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios.get(`/orders.json?auth=${this.props.auth}`).then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
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
        {this.props.auth ? null : <Redirect to="/" />}
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

const mapStoreToProps = state => {
  return {
    auth: state.auth.token
  };
};

export default connect(mapStoreToProps)(Orders);
