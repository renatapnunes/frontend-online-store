import React, { Component } from 'react';
import '../styles/cart-item-list.css';
import PropTypes from 'prop-types';

class CartItem extends Component {
  constructor(props) {
    super(props);
    const { lista } = this.props;
    const { id, img, title, howMuch, price } = lista;
    this.state = {
      howMuch,
      img,
      title,
      price,
      id,
    };

    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleDeleteItem() {
    const { loadStorage } = this.props;
    const { id } = this.state;
    localStorage.removeItem(`AT0M1C-${id}`);
    loadStorage();
  }

  render() {
    const { img, title, howMuch, price } = this.state;
    const NUM_MAX_CARACTER = 20;
    return (
      <li className="cart-item-card">
        <button type="button" onClick={ this.handleDeleteItem }>x</button>
        <img src={ img } alt={ title } />
        <span data-testid="shopping-cart-product-name">
          {`${title.substring(0, NUM_MAX_CARACTER)}...`}
        </span>
        <button type="button">-</button>
        <span data-testid="shopping-cart-product-quantity">{howMuch}</span>
        <button type="button">+</button>
        <span>{`Unit Price: ${price.toFixed(2)}`}</span>
        <span>{(price * howMuch).toFixed(2)}</span>
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
    id: PropTypes.string,
  }).isRequired,
};

export default CartItem;
