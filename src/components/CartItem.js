import React, { Component } from 'react';
import '../styles/cart-item-list.css';
import PropTypes from 'prop-types';

class CartItem extends Component {
  constructor(props) {
    super(props);
    const { lista } = this.props;
    const { img, title, howMuch, price } = lista;
    this.state = {
      howMuch,
      img,
      title,
      price,

    };

    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleDeleteItem() {

  }

  render() {
    const { img, title, howMuch, price } = this.state;
    const NUM_MAX_CARACTER = 20;
    return (
      <li className="cart-item-card">
        <button type="button">x</button>
        <img src={ img } alt={ title } />
        <span data-testid="shopping-cart-product-name">
          {`${title.substring(0, NUM_MAX_CARACTER)}...`}
        </span>
        <button type="button">-</button>
        <span data-testid="shopping-cart-product-quantity">{howMuch}</span>
        <button type="button">+</button>
        <span>{`Unit Price: ${price}`}</span>
        <span>{price * howMuch}</span>
      </li>
    );
  }
}

CartItem.propTypes = {
  lista: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string,
    howMuch: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

export default CartItem;
