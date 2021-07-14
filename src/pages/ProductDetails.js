import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductDetails extends Component {
  render() {
    const { location: { state: { product } } } = this.props;
    const { thumbnail, title, price, attributes } = product;

    return (
      <div>
        <img src={ thumbnail } alt={ title } />
        <h4 data-testid="product-detail-name">{ title }</h4>
        <span>{ `R$: ${price}` }</span>
        <ul>
          {
            attributes
              .map((atributte) => (
                <li key={ atributte.id }>
                  { `${atributte.name}: ${atributte.value_name}` }
                </li>))
          }
        </ul>
        <Link to="/">VOLTAR</Link>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default ProductDetails;
