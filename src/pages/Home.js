import React, { Component } from 'react';
import SearchInput from '../components/SearchInput';
import CartButton from '../components/CartButton';
import Categories from '../components/Categories';

class Home extends Component {
  render() {
    return (
      <main>
        <SearchInput />
        <CartButton />
        <Categories />
      </main>
    );
  }
}

export default Home;
