import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  render() {
    const { data } = this.props;
    return (
      <div data-testid="product">
        <img src={ data.thumbnail } alt={ data.title } />
        <h4>{ data.title }</h4>
        <span>{ `R$: ${data.price}` }</span>
      </div>
    );
  }
}
Product.propTypes = {
  data: PropTypes.objectOf(Object).isRequired,
};
export default Product;
