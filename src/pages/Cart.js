import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: true,
      lista: '',
    };
    this.loadLocalStorage = this.loadLocalStorage.bind(this);
    this.loadTotalValue = this.loadTotalValue.bind(this);
  }

  componentDidMount() {
    this.loadLocalStorage();
  }

  loadLocalStorage() {
    const storage = Object.keys(localStorage);
    const LAST_CHAR_WORD = 6;
    const lista = storage.map((key) => {
      if (key.substring(0, LAST_CHAR_WORD) === 'AT0M1C') {
        return JSON.parse(localStorage.getItem(key));
      }
      return true;
    });
    if (lista.length > 0) {
      this.setState({ empty: false, lista });
    }
    return true;
  }

  loadTotalValue() {
    const { lista } = this.state;
    let aux = 0;
    lista.forEach((item) => {
      aux += (item.price * item.howMuch);
    });
    console.log(aux);
    return aux;
  }

  render() {
    const { empty, lista } = this.state;
    if (empty) {
      return (
        <div data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
          <button type="button"><Link to="/">HOME</Link></button>
        </div>
      );
    }
    return (
      <ol className="ol-cart">
        {lista.map((itemId) => <CartItem key={ itemId.id } lista={ itemId } />)}
        <p>
          Valor Total:
          <span className="total-value">{ () => this.loadTotalValue() }</span>
        </p>
        <button type="button"><Link to="/">HOME</Link></button>
      </ol>
    );
  }
}

export default ShoppingCart;
