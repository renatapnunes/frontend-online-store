import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from '../icon/shopping-cart.png';
import '../styles/cart-button.css';

class CartButton extends Component {
  constructor() {
    super();

    this.quantityOfItems = this.quantityOfItems.bind(this);
  }

  quantityOfItems() {
    const { cartItems } = this.props;

    if (cartItems.length === 0) return 0;

    return cartItems.reduce((acc, { quantity }) => acc + quantity, 0);
  }

  render() {
    return (
      <div className="cart-button">
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
          className="cart-link"
        >
          <img src={ icon } alt="shopping cart" className="cart-icon" />
        </Link>
        <span className="cart-quantity" data-testid="shopping-cart-size">
          { this.quantityOfItems() }
        </span>
      </div>
    );
  }
}

CartButton.propTypes = {
  cartItems: PropTypes.arrayOf(Object).isRequired,
};

export default CartButton;
