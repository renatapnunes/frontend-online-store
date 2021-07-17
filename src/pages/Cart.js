import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CartItem from '../components/CartItem';

class Cart extends Component {
  render() {
    const
      {
        handleDeleteItem,
        handleClickSum,
        handleClickSub,
        cartItems,
        totalValue,
        loadProductValue,
      } = this.props;

    if (cartItems.length === 0) {
      return (
        <div data-testid="shopping-cart-empty-message">
          <h2>Seu carrinho está vazio</h2>
          <button type="button"><Link to="/">VOLTAR</Link></button>
        </div>
      );
    }

    return (
      <section>
        <button type="button"><Link to="/">VOLTAR</Link></button>
        <ol className="ol-cart">
          { cartItems.map((item) => (
            <CartItem
              key={ item.id }
              product={ item }
              handleDeleteItem={ handleDeleteItem }
              handleClickSub={ handleClickSub }
              handleClickSum={ handleClickSum }
              loadProductValue={ loadProductValue }
            />
          )) }
        </ol>
        <span className="total-value">
          Valor Total:
          {' '}
          { totalValue }
        </span>
      </section>
    );
  }
}

Cart.propTypes = {
  handleDeleteItem: PropTypes.func.isRequired,
  handleClickSum: PropTypes.func.isRequired,
  handleClickSub: PropTypes.func.isRequired,
  loadProductValue: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Cart;
