import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Product extends Component {
  render() {
    const { data, addToCart } = this.props;
    const { id, thumbnail, title, price, shipping } = data;
    const location = {
      pathname: `product/${id}`,
      state: { product: data },
    };

    return (
      <div data-testid="product">
        { shipping.free_shipping
          ? <span data-testid="free-shipping">FRETE GRÁTIS</span>
          : '' }
        <img src={ thumbnail } alt={ title } />
        <h4>{ title }</h4>
        <span>{ `R$: ${price.toFixed(2)}` }</span>
        <button type="button">
          <Link
            data-testid="product-detail-link"
            to={ location }
          >
            VER DETALHES
          </Link>
        </button>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => addToCart(data) }
        >
          Adicionar no Carrinho
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  addToCart: PropTypes.func.isRequired,
  data: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
  }).isRequired,
};

export default Product;
