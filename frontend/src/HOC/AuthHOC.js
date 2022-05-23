/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const IsLogged = WrappedComponent => {
  const AuthHOC = () => {
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Vous devez être connecté pour accéder à cette page');
          router.push('/login');
        }
      }
    }, []);

    return <WrappedComponent />;
  };

  return AuthHOC;
};

export default IsLogged;
