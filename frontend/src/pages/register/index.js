import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';
import axios from 'axios';
import { useRouter } from 'next/router';
import Toast from '../../components/Toast/Toast';
import { toast } from 'react-toastify';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);
  const router = useRouter();

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:1337/api/auth/local/register', {
        username: username,
        email: email,
        password: password,
      })
      .then(response => {
        localStorage.setItem('token', response.data.jwt);
        toast.success('Vous êtes inscrit');
        router.push('/shop');
      })
      .catch(error => {
        toast.error('Une erreur est survenue');
        setError(error.response.data.error.message);
      });
  };

  return (
    <div className='form__container'>
      {error && <Toast className='error'>{error}</Toast>}
      <h4>S&apos;Inscrire</h4>
      <Form className='form' onSubmit={handleSubmit}>
        <div className='form__group'>
          <label htmlFor='username'>Nom d&apos;utilisateur</label>
          <Input
            name={username}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='form__group'>
          <label htmlFor='email'>Email</label>
          <Input
            name={email}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form__group'>
          <label htmlFor='password'>Mot de passe</label>
          <Input
            name={password}
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Button className='btn'>S&apos;inscrire</Button>
      </Form>
    </div>
  );
};

export default Register;
