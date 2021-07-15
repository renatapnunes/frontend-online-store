import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Product extends Component {
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
    localStorage.setItem(`AT0M1C-${data.id}`, JSON.stringify({ id: data.id,
      howMuch: count,
      price: data.price,
      img: data.thumbnail,
      title: data.title }));
    return true;
  }

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
          onClick={ () => this.addToCart(data) }
        >
          Adicionar no Carrinho
        </button>
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
