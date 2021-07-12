import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import icon from '../icon/shopping-cart.png';
import '../styles/CartButton.css';

class CartButton extends Component {
  constructor(props) {
    super(props);
    this.myfunction = this.myfunction.bind(this);
  }

  myfunction() {
    return true;
  }

  render() {
    return (
      <button
        type="button"
        className="btn-cart"
        onClick={ () => this.myfunction() }
      >
        <Link to="/Cart" data-testid="shopping-cart-button">
          <img src={ icon } alt="shopping cart" />
        </Link>
      </button>
    );
  }
}

export default CartButton;
