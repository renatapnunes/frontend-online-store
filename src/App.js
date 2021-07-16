import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
    };
    this.addToCart = this.addToCart.bind(this);
    this.saveToCart = this.saveCart.bind(this);
    this.loadCartItems = this.loadCartItems.bind(this);
  }

  componentDidMount() {
    this.loadCartItems();
  }

  addToCart(data) {
    const newCartItem = {
      id: data.id,
      price: data.price,
      img: data.thumbnail,
      title: data.title,
      quantity: 1,
    };

    const { cartItems } = this.state;
    const updatedItems = cartItems;

    const currentItem = cartItems
      .find((product) => product.id === data.id);
    if (currentItem) {
      currentItem.quantity += 1;
    } else {
      updatedItems.push(newCartItem);
    }

    this.setState({
      cartItems: updatedItems,
    });

    this.saveCart();
  }

  saveCart() {
    const { cartItems } = this.state;
    localStorage.setItem('CartItems2', JSON.stringify(cartItems));
  }

  loadCartItems() {
    let loadedCartItems = localStorage.getItem('CartItems2');
    loadedCartItems = JSON.parse(loadedCartItems);

    if (loadedCartItems) {
      this.setState({
        cartItems: loadedCartItems,
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (routerProps) => (<Home
              { ...routerProps }
              addToCart={ this.addToCart }
            />) }
          />
          <Route path="/cart" component={ Cart } />
          <Route
            path="/product/:id"
            render={ (routerProps) => (<ProductDetails
              { ...routerProps }
              addToCart={ this.addToCart }
            />) }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
