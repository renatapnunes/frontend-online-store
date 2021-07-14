import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Review from './Review';

class CreateReview extends Component {
  constructor(props) {
    super(props);

    const { id } = this.props;

    this.state = {
      email: '',
      comment: '',
      productId: id,
      reviews: [],
    };

    this.newReview = this.newReview.bind(this);
    this.addReview = this.addReview.bind(this);
    this.saveReviews = this.saveReviews.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  getReviews() {
    const { allReviews, id } = this.props;
    let resp = '';
    if (!allReviews) {
      resp = <p>Seja o primeiro a fazer uma avaliação deste produto.</p>;
    } else {
      resp = allReviews
        .filter(({ productId }) => productId === id)
        .map((productReview, index) => (
          <Review
            key={ index }
            reviews={ productReview }
          />
        ));
    }
    return resp;
  }

  newReview({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async addReview() {
    const { productId, email, comment } = this.state;
    const { loadReviews } = this.props;
    const currentReview = {
      productId,
      email,
      comment,
    };

    await this.setState((prevState) => ({
      reviews: [...prevState.reviews, currentReview],
      email: '',
      comment: '',
    }));

    await this.saveReviews();
    loadReviews();
  }

  saveReviews() {
    const { reviews } = this.state;
    localStorage.setItem('Reviews', JSON.stringify(reviews));
  }

  // getReviews(productReviews) {
  //   productReviews.map((productReview, index) => (
  //     <Review
  //       key={ index }
  //       reviews={ productReview }
  //     />));
  // }

  render() {
    const { email, comment } = this.state;

    return (
      <section>
        <form className="form-review">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            required
            onChange={ this.newReview }
          />
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="O que você achou do produto? (opcional)"
            name="comment"
            value={ comment }
            onChange={ this.newReview }
          />
          <button type="button" onClick={ this.addReview }>
            Avaliar
          </button>
        </form>
        <div>
          { this.getReviews() }
        </div>
      </section>
    );
  }
}

CreateReview.propTypes = {
  loadReviews: PropTypes.func.isRequired,
  allReviews: PropTypes.arrayOf(Object).isRequired,
  id: PropTypes.string.isRequired,
};

export default CreateReview;
