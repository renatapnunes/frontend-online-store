import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CartButton from '../components/CartButton';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(data) {
    const { count } = this.state;
    this.setState({ count: count + 1 });

    localStorage.setItem(`AT0M1C-${data.id}`, JSON.stringify({
      id: data.id,
      howMuch: count,
      price: data.price,
      img: data.thumbnail,
      title: data.title }));
    return true;
  }

  render() {
    const { location: { state: { product } } } = this.props;
    const { thumbnail, title, price, attributes } = product;

    return (
      <div>
        <CartButton />
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
          onClick={ () => this.addToCart(product) }
        >
          Adicionar no Carrinho
        </button>
        <Link to="/">VOLTAR</Link>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default ProductDetails;
