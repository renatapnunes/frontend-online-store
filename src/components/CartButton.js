import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SliderCartItem from './SliderCartItem';
import icon from '../icon/shopping-cart.png';
import '../styles/cart-button.css';

class CartButton extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };

    this.showCart = this.showCart.bind(this);
    this.getSliderCartItem = this.getSliderCartItem.bind(this);
  }

  getSliderCartItem() {
    const { cartItems } = this.props;

    if (cartItems.length === 0) return <h2>Seu carrinho está vazio</h2>;

    return cartItems.map((item) => <SliderCartItem key={ item.id } product={ item } />);
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
    let classSlider = '';

    if (show) {
      classSlider = 'slider-cart';
    } else {
      classSlider = 'slider-cart-hidden';
    }

    return (
      <button
        type="button"
        className="btn-cart"
        onMouseEnter={ () => this.showCart(true) }
        onMouseLeave={ () => this.showCart(false) }
      >
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src={ icon } alt="shopping cart" />
        </Link>
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
