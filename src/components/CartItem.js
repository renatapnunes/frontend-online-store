import React, { Component } from 'react';
import '../styles/cart-item-list.css';
import PropTypes from 'prop-types';

class CartItem extends Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    const { id, img, title, quantity, price } = product;
    this.state = {
      quantity,
      img,
      title,
      price,
      id,
      totalValue: quantity * price,
    };

    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleClickSub = this.handleClickSub.bind(this);
    this.handleClickSum = this.handleClickSum.bind(this);
  }

  handleDeleteItem(id) {
    const { loadCartItems } = this.props;
    const storageItems = JSON.parse(localStorage.getItem('CartItems2'));
    const itemFound = storageItems.find((item) => item.id === id);
    const index = storageItems.indexOf(itemFound);

    storageItems.splice(index, 1);
    localStorage.setItem('CartItems2', JSON.stringify(storageItems));

    loadCartItems();
  }

  handleClickSub(id) {
    const { quantity, price } = this.state;
    const subQuantity = quantity - 1;
    const subValue = price * subQuantity;

    const storageItems = JSON.parse(localStorage.getItem('CartItems2'));
    const itemFound = storageItems.find((item) => item.id === id);

    itemFound.quantity = subQuantity;
    localStorage.setItem('CartItems2', JSON.stringify(storageItems));

    if (subQuantity > 0) {
      this.setState({ quantity: subQuantity, totalValue: subValue });
    }
  }

  handleClickSum(id) {
    const { loadTotalValue } = this.props;
    const { quantity, price } = this.state;
    const sumQuantity = quantity + 1;
    const sumValue = price * sumQuantity;

    const storageItems = JSON.parse(localStorage.getItem('CartItems2'));
    const itemFound = storageItems.find((item) => item.id === id);

    itemFound.quantity = sumQuantity;
    localStorage.setItem('CartItems2', JSON.stringify(storageItems));

    this.setState({ quantity: sumQuantity, totalValue: sumValue });
    loadTotalValue();
  }

  render() {
    const { img, title, quantity, price, totalValue, id } = this.state;
    return (
      <li className="cart-item-card">
        <button
          type="button"
          onClick={ () => this.handleDeleteItem(id) }
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
          onClick={ () => this.handleClickSub(id) }
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
          onClick={ () => this.handleClickSum(id) }
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <span>
          {`Unit Price: ${Number(price).toFixed(2)}`}
        </span>
        <span>
          {(totalValue).toFixed(2)}
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
  loadCartItems: PropTypes.func.isRequired,
  loadTotalValue: PropTypes.func.isRequired,
};

export default CartItem;
