import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Product from './Product';

class Products extends Component {
  render() {
    const { data } = this.props;

    if (data.length === 0) {
      return 'Nenhum produto foi encontrado';
    }

    return (
      <section>
        { data.map((product) => <Product key={ product.id } data={ product } />) }
      </section>
    );
  }
}

Products.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};

export default Products;
