import React, { Component } from 'react';
import '../styles/cart-item-list.css';
import PropTypes from 'prop-types';

class CartItem extends Component {
  render() {
    const
      {
        handleDeleteItem,
        handleClickSum,
        handleClickSub,
        loadProductValue,
        product,
      } = this.props;
    const { img, title, quantity, price, id } = product;
    return (
      <li className="cart-item-card">
        <button
          type="button"
          onClick={ () => handleDeleteItem(id) }
        >
          x
        </button>
        <img
          src={ img }
          alt={ title }
        />
        <span
          data-testid="shopping-cart-product-name"
        >
          { title }
        </span>
        <button
          type="button"
          onClick={ () => handleClickSub(id) }
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <span
          data-testid="shopping-cart-product-quantity"
        >
          { quantity }
        </span>
        <button
          type="button"
          onClick={ () => handleClickSum(id) }
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <span>
          {`Unit Price: ${Number(price).toFixed(2)}`}
        </span>
        <span>
          {loadProductValue(id)}
        </span>
      </li>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleClickSum: PropTypes.func.isRequired,
  handleClickSub: PropTypes.func.isRequired,
  loadProductValue: PropTypes.func.isRequired,
};

export default CartItem;
