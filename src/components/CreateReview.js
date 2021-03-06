import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Review from './Review';

class CreateReview extends Component {
  constructor(props) {
    super(props);

    const { id } = this.props;

    this.state = {
      email: '',
      rating: 0,
      comment: '',
      productId: id,
      reviews: [],
    };

    this.getReviews = this.getReviews.bind(this);
    this.newReview = this.newReview.bind(this);
    this.addReview = this.addReview.bind(this);
    this.saveReviews = this.saveReviews.bind(this);
    this.loadReviews = this.loadReviews.bind(this);
  }

  componentDidMount() {
    this.loadReviews();
  }

  getReviews() {
    const { id } = this.props;
    const { reviews } = this.state;
    let resp = '';

    if (!reviews) {
      resp = <p>Seja o primeiro a fazer uma avaliação deste produto.</p>;
    } else {
      resp = reviews
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

    const aux = (name === 'rating') ? Number(value) : value;

    this.setState({
      [name]: aux,
    });
  }

  async addReview() {
    const { productId, email, rating, comment } = this.state;
    const currentReview = {
      productId,
      email,
      rating,
      comment,
    };

    await this.setState((prevState) => ({
      reviews: [...prevState.reviews, currentReview],
      email: '',
      rating: 0,
      comment: '',
    }));

    await this.saveReviews();
    this.loadReviews();
  }

  saveReviews() {
    const { reviews } = this.state;
    localStorage.setItem('Reviews', JSON.stringify(reviews));
  }

  async loadReviews() {
    const stringReviews = await localStorage.getItem('Reviews');
    let allReviews = await JSON.parse(stringReviews);

    if (!allReviews) allReviews = [];

    this.setState({
      reviews: allReviews,
    });
  }

  render() {
    const { email, rating, comment } = this.state;
    const stars = 5;

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
          {/* Consultamos o seguinte vídeo para resolver esta parte:
              https://www.youtube.com/watch?v=eDw46GYAIDQ&ab_channel=EricMurphy */}
          <div>
            { [...Array(stars)].map((_star, index) => (
              <label
                key={ index }
                htmlFor={ `star-${index}` }
              >
                <input
                  className="star-input"
                  type="radio"
                  id={ `star-${index}` }
                  name="rating"
                  value={ index + 1 }
                  onClick={ this.newReview }
                />
                { index < rating
                  ? <span className="selected">★</span>
                  : <span className="unselected">★</span> }
              </label>
            ))}
          </div>
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
  id: PropTypes.string.isRequired,
};

export default CreateReview;
