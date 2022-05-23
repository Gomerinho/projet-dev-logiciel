import { useQuery } from '@apollo/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GET_USER_WISH } from '../../graphql/productsQuery';

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [wishItems, setWishItems] = useState();
  useEffect(() => {
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

  console.log(userData);

  const { data, refetch, loading } = useQuery(GET_USER_WISH);

  useEffect(() => {
    refetch({ id: 6 });
    setWishItems(data);
    console.log(wishItems);
  }, [data]);

  return (
    <div style={{ margin: '3rem 2rem' }} className='profile'>
      <h3 className='profile__title'>Mon profil</h3>
      <div className='username'>
        Nom d&#39;utilisateur :{' '}
        <span style={{ fontWeight: '500' }}>{userData.username}</span>
      </div>
      {loading ? <p>Chargement...</p> : <div>Favoris :</div>}
    </div>
  );
};

export default Profile;
