import { useMutation } from '@apollo/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/Button/Button';
import { CREATE_ORDER } from '../../graphql/ordersQuery';
import IsLogged from '../../HOC/AuthHOC';
import { CartContext } from '../_app';

const Cart = () => {
  const router = useRouter();
  const cart = useContext(CartContext);
  const [userData, setUserData] = useState({});
  const [addOrder, { loading, error }] = useMutation(CREATE_ORDER);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      axios
        .get('http://localhost:1337/api/users/me', config)
        .then(response => setUserData(response.data))
        .catch(error => console.log('Erreur : ', error));
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }
  return (
    <div className='cart'>
      {cart.cartItems.length > 0 ? (
        cart.cartItems.map((item, index) => (
          <div key={index} className='cart__content'>
            <div className='cart__image'>
              <img
                src={`http://localhost:1337${item.image.data.attributes.url}`}
                alt={item.description}
              />
            </div>
            <div className='cart__body'>
              <div className='cart__title'>{item.title}</div>
              <div className='cart__quatity'>
                {item.quantity} x{' '}
                {item.price.toFixed(2).toString().replace('.', ',')} €
                <div>
                  <Button
                    className='btn btn-icon'
                    onClick={() => cart.addQuantity(item.id)}
                  >
                    +
                  </Button>
                  <Button
                    className='btn btn-icon'
                    onClick={() => cart.removeQuantity(item.id)}
                  >
                    -
                  </Button>
                </div>
              </div>
              <div className='cart__button'>
                <Button
                  className='btn btn-red'
                  onClick={() => cart.deleteItem(item.id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='cart__empty'>Pas de produit dans le panier</p>
      )}

      <div className='cart__divider'></div>
      <div className='cart__totale'>
        Total : {cart.totalPrice.toFixed(2).toString().replace('.', ',')} €{' '}
      </div>
      {userData && cart.cartItems.length >= 1 && (
        <div className='cart__button'>
          <Button
            className='btn'
            onClick={() => {
              if (localStorage.getItem('token') && cart.cartItems.length >= 1) {
                addOrder({
                  variables: {
                    data: {
                      products: [...cart.cartItems.map(item => item.id - 1)],
                      user: userData.id,
                      total: parseInt(cart.totalPrice),
                    },
                  },
                }).then(res => {
                  cart.resetCart();
                  toast.success('Commande passée avec succès');
                  router.push('/profil');
                });
              }
            }}
          >
            Commander
          </Button>
        </div>
      )}
    </div>
  );
};

export default IsLogged(Cart);
