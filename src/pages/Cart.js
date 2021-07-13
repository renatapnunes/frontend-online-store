import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  render() {
    return (
      <div data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
        <button type="button"><Link to="/">HOME</Link></button>
      </div>
    );
  }
}

export default ShoppingCart;
