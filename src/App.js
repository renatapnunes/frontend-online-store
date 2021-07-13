import React, { Component } from 'react';
import './App.css';
import * as api from './services/api';
import Products from './components/Products';
import SearchInput from './components/SearchInput';

class App extends Component {
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
      <div className="App">
        <SearchInput
          value={ value }
          handleChange={ this.handleChange }
          handleSubmit={ this.handleSubmit }
        />
        <Products data={ data } />
      </div>
    );
  }
}
export default App;
