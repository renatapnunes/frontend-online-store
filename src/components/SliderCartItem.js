import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SliderCartItem extends Component {
  render() {
    const { product } = this.props;
    const { img, title, quantity, price } = product;
    return (
      <li className="cart-slider-item">
        <img src={ img } alt={ title } className="cart-slider-img-item" />
        <div className="cart-slider-infos-item">
          <p>{ title }</p>
          <p>{ `R$${price.toFixed(2)}` }</p>
          <p>{`Quantidade: ${quantity}`}</p>
        </div>
      </li>
    );
  }
}

SliderCartItem.propTypes = {
  product: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

export default SliderCartItem;
