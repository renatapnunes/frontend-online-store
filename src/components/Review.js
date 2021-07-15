import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Review extends Component {
  render() {
    const { reviews } = this.props;
    const { email, rating, comment = 0 } = reviews;
    const stars = 5;
    return (
      <div className="review">
        <p>{ email }</p>
        <div>
          { [...Array(stars)].map((star, index) => (
            index < rating
              ? <span className="selected">★</span>
              : <span className="unselected">★</span>
          ))}
        </div>
        <p>{ comment }</p>
      </div>
    );
  }
}

Review.propTypes = {
  reviews: PropTypes.shape({
    email: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

export default Review;
