/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Product from './Product';

class Products extends Component {
  render() {
    const { data } = this.props;

    return (
      <section>
        { data.map((product) => <Product key={ product.id } data={ product } />) }
      </section>
    );
  }
}

export default Products;
