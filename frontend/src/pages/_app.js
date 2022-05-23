import '../styles/style.scss';
import MainLayout from '../layout/MainLayout';
import React, { useState, useEffect, useContext } from 'react';
import FlashContextProvider, { flashContext } from '../context/FlashProvider';
import Toast from '../components/Toast/Toast';
export const CartContext = React.createContext();
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  const [cartItems, setcartItems] = useState([]);

  let totalPrice = 0;
  if (cartItems.length > 0) {
    totalPrice = cartItems.reduce((previousValue, currentValue) => {
      previousValue += currentValue.price * currentValue.quantity;
      return previousValue;
    }, 0);
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('cart')).length > 0) {
      setcartItems(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = product => {
    let newArray = [...cartItems];
    if (newArray.length > 0) {
      const index = newArray.findIndex(el => el.id === product.id);
      if (index !== -1) {
        if (!newArray[index].quantity) {
          newArray[i] = {
            ...newArray[i],
            quantity: 1,
          };
          return setcartItems(newArray);
        }
        newArray[index].quantity += 1;
        return setcartItems(newArray);
      } else {
        return setcartItems(prevState => [
          ...prevState,
          {
            ...product,
            quantity: 1,
          },
        ]);
      }
    } else {
      newArray = [
        ...newArray,
        {
          ...product,
          quantity: 1,
        },
      ];
      return setcartItems(newArray);
    }
  };

  const deleteItem = id => {
    const newList = cartItems.filter(item => item.id !== id);
    setcartItems(newList);
  };

  const addQuantity = id => {
    const newList = cartItems.map(item => {
      if (item.id == id) {
        item.quantity++;
      }
      return item;
    });
    setcartItems(newList);
  };

  const removeQuantity = id => {
    const newList = cartItems
      .filter(item => {
        if (item.quantity > 1) {
          return item;
        } else {
          alert(`Vous allez supprimer : ${item.title}`);
        }
      })
      .map(item => {
        if (item.id == id) {
          item.quantity--;
        }
        return item;
      });
    setcartItems(newList);
  };

  const flash = useContext(flashContext);

  return (
    <ApolloProvider client={client}>
      <CartContext.Provider
        value={{
          cartItems: cartItems,
          totalPrice: totalPrice,
          addToCart: addToCart,
          deleteItem: deleteItem,
          addQuantity: addQuantity,
          removeQuantity: removeQuantity,
        }}
      >
        <FlashContextProvider>
          {flash?.message && <Toast className='error'>{flash.message}</Toast>}
          <MainLayout>
            <Component {...pageProps} />
            <ToastContainer position='top-center' />
          </MainLayout>
        </FlashContextProvider>
      </CartContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
