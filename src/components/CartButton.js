import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import icon from '../icon/shopping-cart.png';
import '../styles/cart-button.css';

class CartButton extends Component {
  render() {
    return (
      <button
        type="button"
        className="btn-cart"
      >
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src={ icon } alt="shopping cart" />
        </Link>
      </button>
    );
  }
}

export default CartButton;
