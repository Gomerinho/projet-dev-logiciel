import React, { useContext, useState } from 'react';
import axios from 'axios';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { useRouter } from 'next/router';

import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState(undefined);
  // const login = useContext(LoginContext);
  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
      })
      .then(response => {
        localStorage.setItem('token', response.data.jwt);
        toast.success('Vous êtes connecté');
        router.push('/shop');
      })
      .catch(error => {
        toast.error('Identifiants incorrects');
        setError(error.response.data.error.message);
      });
  };
  return (
    <div className='form__container'>
      <h4>Se connecter</h4>
      <Form onSubmit={handleSubmit} className='form'>
        <div className='form__group'>
          <label htmlFor='email'>Email</label>
          <Input
            name='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            type='text'
          />
        </div>
        <div className='form__group'>
          <label htmlFor='password'>Password</label>
          <Input
            type='password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <p>
          Pas encore de compte ?{' '}
          <Link href={'/register'}>
            <span
              style={{
                color: 'blue',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              S&rsquo;inscrire
            </span>
          </Link>
        </p>
        <Button type='submit' className='btn'>
          Se connecter
        </Button>
      </Form>
    </div>
  );
};

export default Login;
