import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Review extends Component {
  render() {
    const { reviews } = this.props;
    const { email, comment = 0 } = reviews;
    return (
      <div className="review">
        <p>{ email }</p>
        <p>★ ★ ★ ★ ★</p>
        <p>{ comment }</p>
      </div>
    );
  }
}

Review.propTypes = {
  reviews: PropTypes.shape({
    email: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

export default Review;
