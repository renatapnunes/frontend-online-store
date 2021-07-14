import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Product extends Component {
  render() {
    const { data } = this.props;
    const { id, thumbnail, title, price } = data;
    const location = {
      pathname: `product/${id}`,
      state: { product: data },
    };

    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <h4>{ title }</h4>
        <span>{ `R$: ${price}` }</span>
        <Link
          data-testid="product-detail-link"
          to={ location }
        >
          VER DETALHES
        </Link>
      </div>
    );
  }
}

Product.propTypes = {
  data: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
