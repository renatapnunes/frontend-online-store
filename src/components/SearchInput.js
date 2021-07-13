import React, { Component } from 'react';

class SearchInput extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { value, handleChange, handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <label
          htmlFor="search-input"
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input
            id="search-input"
            data-testid="query-input"
            type="text"
            value={ value }
            onChange={ handleChange }
          />
        </label>
        <input
          data-testid="query-button"
          type="submit"
          value="Search"
        />
      </form>
    );
  }
}
export default SearchInput;
