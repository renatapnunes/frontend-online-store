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
      totalValue: howMuch * price,
    };

    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleClickSub = this.handleClickSub.bind(this);
    this.handleClickSum = this.handleClickSum.bind(this);
  }

  handleDeleteItem() {
    const { loadStorage } = this.props;
    const { id } = this.state;
    localStorage.removeItem(`AT0M1C-${id}`);
    loadStorage();
  }

  handleClickSub() {
    const { howMuch, price } = this.state;
    if (howMuch <= 1) this.handleDeleteItem();
    this.setState({ howMuch: howMuch - 1, totalValue: price * howMuch });
  }

  handleClickSum() {
    const { howMuch, price } = this.state;
    this.setState({ howMuch: howMuch + 1, totalValue: price * howMuch });
  }

  render() {
    const { img, title, howMuch, price, totalValue } = this.state;
    return (
      <li className="cart-item-card">
        <button
          type="button"
          onClick={ this.handleDeleteItem }
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
          {title}
        </span>
        <button
          type="button"
          onClick={ this.handleClickSub }
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <span
          data-testid="shopping-cart-product-quantity"
        >
          {howMuch}
        </span>
        <button
          type="button"
          onClick={ this.handleClickSum }
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <span>
          {`Unit Price: ${price.toFixed(2)}`}
        </span>
        <span>
          {(totalValue).toFixed(2)}
        </span>
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
  loadStorage: PropTypes.func.isRequired,
};

export default CartItem;
