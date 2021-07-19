import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SliderCartItem from './SliderCartItem';
import icon from '../icon/shopping-cart.png';

class CartButton extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };

    this.showCart = this.showCart.bind(this);
    this.getSliderCartItem = this.getSliderCartItem.bind(this);
    this.quantityOfItems = this.quantityOfItems.bind(this);
  }

  getSliderCartItem() {
    const { cartItems } = this.props;

    if (cartItems.length === 0) return <h2>Seu carrinho está vazio</h2>;

    return cartItems.map((item) => <SliderCartItem key={ item.id } product={ item } />);
  }

  quantityOfItems() {
    const { cartItems } = this.props;

    if (cartItems.length === 0) return 0;

    return cartItems.reduce((acc, { quantity }) => acc + quantity, 0);
  }

  showCart(status) {
    let value = true;

    if (!status) value = false;

    this.setState({
      show: value,
    });
  }

  render() {
    const { show } = this.state;
    let classButton = '';
    let classSlider = '';

    if (show) {
      classButton = 'cart-button';
      classSlider = 'cart-slider';
    } else {
      classButton = 'cart-button-slider-hidden';
      classSlider = 'cart-slider-hidden';
    }

    return (
      <button
        className={ classButton }
        type="button"
        onMouseEnter={ () => this.showCart(true) }
        onMouseLeave={ () => this.showCart(false) }
      >
        <div className="container">
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <img src={ icon } alt="shopping cart" className="cart-btn-icon" />
          </Link>
          <span data-testid="shopping-cart-size" className="cart-btn-quantity">
            { this.quantityOfItems() }
          </span>
        </div>
        <ul className={ classSlider }>
          { this.getSliderCartItem() }
        </ul>
      </button>
    );
  }
}

CartButton.propTypes = {
  cartItems: PropTypes.arrayOf(Object).isRequired,
};

export default CartButton;
