import React, { Component } from 'react';
import * as api from './services/api';

class App extends Component {
  componentDidMount() {
    api.getCategories()
      .then((promise) => console.log(promise));
    api.getProductsFromCategoryAndQuery('MLB5672')
      .then((categoria) => console.log(categoria));
  }

  render() {
    return (
      <div>
        <p>ola mundo!</p>
      </div>
    );
  }
}

export default App;
