import { useQuery } from '@apollo/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GET_ORDERs_BY_USER } from '../../graphql/ordersQuery';

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});

  const { data, refetch } = useQuery(GET_ORDERs_BY_USER, {
    variables: {
      filters: {
        user: {
          id: {
            eq: router.query.id,
          },
        },
      },
    },
  });
  useEffect(() => {
    refetch();
    if (localStorage.getItem('token')) {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      axios
        .get('http://localhost:1337/api/users/me', config)
        .then(response => setUserData(response.data))
        .catch(error => console.log('Erreur : ', error));
    } else {
      router.replace('/login');
    }
  }, []);

  return (
    <div style={{ margin: '3rem 2rem' }} className='profile'>
      <div className='user'>
        <h3 className='profile__title'>Mes infos</h3>
        <div className='username'>
          Nom d&#39;utilisateur :{' '}
          <span style={{ fontWeight: '500' }}>{userData.username}</span>
        </div>
        <div className='username'>
          Email : <span style={{ fontWeight: '500' }}>{userData.email}</span>
        </div>
      </div>
      <div className='orders'>
        <h3 className='profile__title'>Mes commandes</h3>
        <div className='orders__list'>
          {data &&
            data.orders.data.map(order => (
              <div className='order' key={order.id}>
                <div className='order__header'>
                  <div className='order__info'>
                    <div className='order__id'>
                      <span>Commande n°{order.id}</span>
                    </div>
                    <div className='order__date'>
                      <span>
                        {new Date(
                          order.attributes.createdAt
                        ).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  <div className='order__total'>
                    <span>Total : {order.attributes.total} €</span>
                  </div>
                </div>
                <div className='order__products'>
                  {order.attributes.products.data.map(product => (
                    <Link href={`/shop/${product.id}`} key={product.id}>
                      <div className='order__product'>
                        <div className='order__product__image'>
                          <img
                            src={
                              'http://localhost:1337' +
                              product.attributes.image.data.attributes.url
                            }
                            alt='product'
                          />
                        </div>

                        <div className='order__product__title'>
                          <span>{product.attributes.title}</span>
                        </div>

                        <div className='order__product__price'>
                          <span>{product.attributes.price}€</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
