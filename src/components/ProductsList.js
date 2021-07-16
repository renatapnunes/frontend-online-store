import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProductCard from './ProductCard';

class Products extends Component {
  render() {
    const { data, addToCart } = this.props;

    if (data.length === 0) {
      return 'Nenhum produto foi encontrado';
    }

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
};

export default Products;
