import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CartItem from '../components/CartItem';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
    };

    this.loadCartItems = this.loadCartItems.bind(this);
    this.loadTotalValue = this.loadTotalValue.bind(this);
  }

  componentDidMount() {
    this.loadCartItems();
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

  loadTotalValue() {
    const { cartItems } = this.state;
    let total = 0;

    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });

    total = total.toFixed(2);

    return <span className="total-value">{ total }</span>;
  }

  render() {
    const { cartItems } = this.state;

    if (cartItems.length === 0) {
      return (
        <div data-testid="shopping-cart-empty-message">
          <h2>Seu carrinho está vazio</h2>
          <button type="button"><Link to="/">VOLTAR</Link></button>
        </div>
      );
    }

    return (
      <section>
        <button type="button"><Link to="/">VOLTAR</Link></button>
        <ol className="ol-cart">
          { cartItems.map((item) => (
            <CartItem
              key={ item.id }
              product={ item }
              loadCartItems={ this.loadCartItems }
              loadTotalValue={ this.loadTotalValue }
            />
          )) }
        </ol>
        <p>
          Valor Total:
          <span className="total-value">{ this.loadTotalValue() }</span>
        </p>
      </section>
    );
  }
}

export default ShoppingCart;
