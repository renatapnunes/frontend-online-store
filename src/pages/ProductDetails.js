import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CreateReview from '../components/CreateReview';
import '../styles/reviews.css';

class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      reviews: [],
    };

    this.loadReviews = this.loadReviews.bind(this);
  }

  componentDidMount() {
    this.loadReviews();
  }

  async loadReviews() {
    const stringReviews = await localStorage.getItem('Reviews');
    const allReviews = await JSON.parse(stringReviews);
    console.log(allReviews);

    this.setState({
      reviews: allReviews,
    });
  }

  render() {
    const { location: { state: { product } } } = this.props;
    const { thumbnail, title, price, attributes, id } = product;
    const { reviews } = this.state;

    return (
      <div>
        <section>
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
        </section>
        <section className="reviews">
          <CreateReview
            loadReviews={ this.loadReviews }
            allReviews={ reviews }
            id={ id }
          />
        </section>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default ProductDetails;
