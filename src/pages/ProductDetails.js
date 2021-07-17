import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CartButton from '../components/CartButton';
import CreateReview from '../components/CreateReview';
import '../styles/reviews.css';

class ProductDetails extends Component {
  render() {
    const { addToCart, location: { state: { product } }, cartItems } = this.props;
    const { thumbnail, title, price, attributes, id, shipping } = product;

    return (
      <div>
        <section>
          <Link to="/">VOLTAR</Link>
          <CartButton cartItems={ cartItems } />
          <div>
            { shipping.free_shipping
              ? <span data-testid="free-shipping">FRETE GRÁTIS</span>
              : '' }
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
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              onClick={ () => addToCart(product) }
            >
              Adicionar no Carrinho
            </button>
          </div>
        </section>
        <section className="reviews">
          <CreateReview id={ id } />
        </section>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
  addToCart: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(Object).isRequired,
};

export default ProductDetails;
