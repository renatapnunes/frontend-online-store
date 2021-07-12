import React, { Component } from 'react';
import * as api from '../services/api';

class Categories extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };

    this.fetchAPI = this.fetchAPI.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const categories = await api.getCategories();

    this.setState({
      categories,
    });
  }

  render() {
    const { categories } = this.state;

    return (
      <div>
        <ul>
          { categories.map((category) => (
            <li
              data-testid="category"
              key={ category.id }
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Categories;
