import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchInput from '../components/SearchInput';
import CartButton from '../components/CartButton';
import Categories from '../components/Categories';
import ProductsList from '../components/ProductsList';
import * as api from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      value: '',
      order: 'relevant',
      categories: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateSelect = this.updateSelect.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchProducts();
  }

  handleChange({ target }) {
    this.setState({ value: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    this.fetchProducts('', value);
    this.setState({ value: '' });
  }

  handleClick({ target }) {
    this.fetchProducts(target.id, '');
  }

  updateSelect({ target }) {
    this.setState({ order: target.value });
  }

  async fetchCategories() {
    try {
      const categories = await api.getCategories();
      this.setState({
        categories,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async fetchProducts(id, query) {
    try {
      const data = await api.getProductsFromCategoryAndQuery(id, query);
      this.setState({
        data: data.results,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { data, value, order, categories } = this.state;
    const { addToCart } = this.props;
    return (
      <main>
        <SearchInput
          value={ value }
          handleChange={ this.handleChange }
          handleSubmit={ this.handleSubmit }
        />
        <label htmlFor="select-order">
          Ordernar por:
          <select
            id="select-order"
            name="order"
            value={ order }
            onChange={ this.updateSelect }
          >
            <option value="relevant">mais relevante</option>
            <option value="lowest">menor preço</option>
            <option value="biggest">maior preço</option>
          </select>
        </label>
        <CartButton />
        <Categories categories={ categories } handleClick={ this.handleClick } />
        <ProductsList addToCart={ addToCart } data={ data } order={ order } />
      </main>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Home;
