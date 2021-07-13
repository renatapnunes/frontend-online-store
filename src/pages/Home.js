import React, { Component } from 'react';
import SearchInput from '../components/SearchInput';
import CartButton from '../components/CartButton';

class Home extends Component {
  render() {
    return (
      <main>
        <SearchInput />
        <CartButton />
      </main>
    );
  }
}

export default Home;
