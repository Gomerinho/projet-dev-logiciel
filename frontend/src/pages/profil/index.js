import { useQuery } from '@apollo/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
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
      </div>
    </div>
  );
};

export default Profile;
