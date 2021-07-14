import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { categories, handleClick } = this.props;

    return (
      <form>
        { categories.map((category) => (
          <div key={ category.id } data-testid="category">
            <input
              type="radio"
              id={ category.id }
              name="category"
              value={ category.id }
              onClick={ handleClick }
            />
            <label
              htmlFor={ category.id }
            >
              { category.name }
            </label>
          </div>
        ))}
      </form>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(Object).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Categories;
