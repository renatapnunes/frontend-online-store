/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
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
      categories: [],
      cartItems: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.saveToCart = this.saveCart.bind(this);
    this.loadCartItems = this.loadCartItems.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchProducts();
    this.loadCartItems();
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

  async addToCart(data) {
    const newCartItem = {
      id: data.id,
      price: data.price,
      img: data.thumbnail,
      title: data.title,
      quantity: 1,
    };

    const { cartItems } = this.state;
    const updatedItems = cartItems;

    const currentItem = cartItems
      .find((product) => product.id === data.id);
    if (currentItem) {
      currentItem.quantity += 1;
    } else {
      updatedItems.push(newCartItem);
    }

    await this.setState({
      cartItems: updatedItems,
    });

    await this.saveCart();
  }

  saveCart() {
    const { cartItems } = this.state;
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
  }

  loadCartItems() {
    let loadedCartItems = localStorage.getItem('CartItems');
    loadedCartItems = JSON.parse(loadedCartItems);

    if (loadedCartItems) {
      this.setState({
        cartItems: loadedCartItems,
      });
    }
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
        <ProductsList addToCart={ this.addToCart } data={ data } />
      </main>
    );
  }
}

export default Home;
