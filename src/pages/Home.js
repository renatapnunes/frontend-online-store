import React, { Component } from 'react';
import SearchInput from '../components/SearchInput';
import CartButton from '../components/CartButton';
import Categories from '../components/Categories';
import Products from '../components/Products';
import * as api from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  handleChange({ target }) {
    this.setState({ value: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    this.fetchAPI('', value);
    this.setState({ value: '' });
  }

  async fetchAPI(id, query) {
    const data = await api.getProductsFromCategoryAndQuery(id, query);
    this.setState({
      data: data.results,
    });
  }

  render() {
    const { data, value } = this.state;
    return (
      <main>
        <SearchInput
          value={ value }
          handleChange={ this.handleChange }
          handleSubmit={ this.handleSubmit }
        />
        <CartButton />
        <Categories />
        <Products data={ data } />
      </main>
    );
  }
}

export default Home;
