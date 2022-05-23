import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Loader from '../../components/Loader/Loader.jsx';
const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    router.replace('/shop');
  }, []);

  return <Loader />;
};

export default Logout;
