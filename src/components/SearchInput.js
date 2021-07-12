import React, { Component } from 'react';

class SearchInput extends Component {
  constructor() {
    super();

    this.state = {
      value: ' ',
    };
  }

  render() {
    const { value } = this.state;
    return (
      <label
        htmlFor="search-input"
        data-testid="home-initial-message"
      >
        <input
          id="serach-input"
          type="text"
          value={ value }
        />
        Digite algum termo de pesquisa ou escolha uma categoria.
      </label>
    );
  }
}

export default SearchInput;
