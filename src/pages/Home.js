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
      categories: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick({ target }) {
    this.fetchAPI(target.id, '');
  }

  async fetchAPI(id, query) {
    const categories = await api.getCategories();
    const data = await api.getProductsFromCategoryAndQuery(id, query);
    this.setState({
      data: data.results,
      categories,
    });
  }

  render() {
    const { data, value, categories } = this.state;
    return (
      <main>
        <SearchInput
          value={ value }
          handleChange={ this.handleChange }
          handleSubmit={ this.handleSubmit }
        />
        <CartButton />
        <Categories categories={ categories } handleClick={ this.handleClick } />
        <Products data={ data } />
      </main>
    );
  }
}

export default Home;
