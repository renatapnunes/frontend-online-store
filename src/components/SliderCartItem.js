import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SliderCartItem extends Component {
  render() {
    const { product } = this.props;
    const { img, title, quantity, price } = product;
    return (
      <li className="item-slider-cart">
        <img src={ img } alt={ title } className="img-slider" />
        <div className="slider-infos">
          <p className="slider-title">{ title }</p>
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
