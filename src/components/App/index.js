import React from 'react';
import { connect } from 'react-redux';

import { fetchFailedOrders } from '../../services/failedOrders/actions';
import { sendOrderSubmission } from '../../services/cart/actions';

import './App.css';

import Shelf from '../Shelf';
import Header from '../Header/Header';
import FailedOrders from '../FailedOrders';

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }

  }

  componentDidMount() {
    this.handleFetchFailedOrders();
  }

  handleFetchFailedOrders = () => {
    this.setState({ isLoading: true });
    this.props.fetchFailedOrders(() => {
        this.setState({ isLoading: false });
    });
  };

  state = {
    showFailedOrders: false
  };

  toggleFailedOrdersFlag = () => {
    this.setState({ showFailedOrders : !this.state.showFailedOrders });
  }

  addProduct = product => {
    const { cartProducts } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

  };

  removeProduct = product => {
    const { cartProducts } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
    }
  };

  submitOrder = () => {

    var min = 1;
    var max = 100000000;
    var rand = min + (Math.random() * (max - min));

    rand = rand.toFixed(0)

    const order = {
      order_id: rand,
      products: this.props.cartProducts,
      order_status: "Submitted",
      date: new Date().toLocaleString(),
      order_type: "Smartphone",
      operation_mode: "Online Order",
      profile: {
        userName: this.state.userName,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailId: this.state.emailId,
        zipCode: this.state.zipCode,
        password: this.state.password,
        address: this.state.address
      }
    }
    const element = document.createElement("a");

    const file = new Blob([JSON.stringify(order, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "Order-" + rand + ".json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    this.props.sendOrderSubmission(order);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
          <Shelf />
          <div className="submit-button">
            <button className="shelf-container-btn" onClick={(event) => this.submitOrder(event)} disabled={this.props.cartProducts.length===0} >Submit Order</button>
          </div>
          <div className="failedOrdersLinkContainer">{this.state.showFailedOrders ? <span className="failedOrdersLink" onClick={this.toggleFailedOrdersFlag}>Hide failed Orders</span> : <span className="failedOrdersLink" onClick={this.toggleFailedOrdersFlag}>Show failed Orders</span>}</div>
          { this.state.showFailedOrders ? <FailedOrders /> : undefined}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  failedOrders: state.failedOrders.orders
});

export default connect(
  mapStateToProps,
  { fetchFailedOrders, sendOrderSubmission }
)(App);
