import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProductCard from './ProductCard';

class Products extends Component {
  render() {
    const { data, addToCart, order } = this.props;

    if (data.length === 0) return 'Nenhum produto foi encontrado';

    if (order === 'lowest') data.sort((a, b) => a.price - b.price);

    if (order === 'biggest') data.sort((a, b) => b.price - a.price);

    return (
      <section>
        { data.map((product) => (
          <ProductCard
            key={ product.id }
            addToCart={ addToCart }
            data={ product }
          />
        )) }
      </section>
    );
  }
}

Products.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  addToCart: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
};

export default Products;
