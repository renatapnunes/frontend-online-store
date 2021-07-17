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
      totalValue: 0,
    };
    this.addToCart = this.addToCart.bind(this);
    this.saveToCart = this.saveCart.bind(this);
    this.loadCartItems = this.loadCartItems.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleClickSub = this.handleClickSub.bind(this);
    this.handleClickSum = this.handleClickSum.bind(this);
    this.loadTotalValue = this.loadTotalValue.bind(this);
    this.loadProductValue = this.loadProductValue.bind(this);
  }

  componentDidMount() {
    this.loadCartItems();
  }

  async handleDeleteItem(id) {
    const storageItems = JSON.parse(localStorage.getItem('CartItems'));
    const itemFound = storageItems.find((item) => item.id === id);
    const index = storageItems.indexOf(itemFound);

    storageItems.splice(index, 1);
    localStorage.setItem('CartItems', JSON.stringify(storageItems));

    await this.loadCartItems();
    this.loadTotalValue();
  }

  async handleClickSum(id) {
    const { cartItems } = this.state;

    const currentItem = cartItems
      .find((product) => product.id === id);
    currentItem.quantity += 1;

    this.saveCart();
    this.loadCartItems();
    this.loadTotalValue();
  }

  async handleClickSub(id) {
    const { cartItems } = this.state;

    const currentItem = cartItems
      .find((product) => product.id === id);
    if (currentItem.quantity === 1) {
      await this.handleDeleteItem(id);
    } else {
      currentItem.quantity -= 1;
    }

    this.saveCart();
    this.loadCartItems();
    this.loadTotalValue();
  }

  loadTotalValue() {
    const { cartItems } = this.state;
    let totalValue = 0;

    cartItems.forEach((item) => {
      totalValue += item.price * item.quantity;
    });
    totalValue = totalValue.toFixed(2);

    this.setState({
      totalValue,
    });
  }

  loadProductValue(id) {
    const { cartItems } = this.state;

    let totalPrice = 0;
    const currentItem = cartItems
      .find((product) => product.id === id);
    totalPrice = (currentItem.price * currentItem.quantity).toFixed(2);
    return totalPrice;
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
    this.loadTotalValue();
  }

  saveCart() {
    const { cartItems } = this.state;
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
  }

  async loadCartItems() {
    let loadedCartItems = localStorage.getItem('CartItems');
    loadedCartItems = JSON.parse(loadedCartItems);

    if (loadedCartItems) {
      await this.setState({
        cartItems: loadedCartItems,
      });
    }
    this.loadTotalValue();
  }

  render() {
    const { cartItems, totalValue } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (routerProps) => (<Home
              { ...routerProps }
              addToCart={ this.addToCart }
              cartItems={ cartItems }
            />) }
          />
          <Route
            path="/cart"
            render={ (routerProps) => (<Cart
              { ...routerProps }
              handleDeleteItem={ this.handleDeleteItem }
              handleClickSub={ this.handleClickSub }
              handleClickSum={ this.handleClickSum }
              loadProductValue={ this.loadProductValue }
              cartItems={ cartItems }
              totalValue={ totalValue }
            />) }
          />
          <Route
            path="/product/:id"
            render={ (routerProps) => (<ProductDetails
              { ...routerProps }
              addToCart={ this.addToCart }
              cartItems={ cartItems }
            />) }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
