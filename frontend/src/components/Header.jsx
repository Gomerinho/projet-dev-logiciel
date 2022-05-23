/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { CartContext } from '../pages/_app';

const Header = () => {
  const cart = useContext(CartContext);
  const token = false;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  return (
    <header className='header'>
      <div className='header__navigation'>
        <div className='header__logo'>
          <img
            src='https://cdn.shopify.com/s/files/1/2358/2817/files/wethenew-logotype-01_410x.png?v=1647853339'
            alt='logo wethenew'
          />
        </div>
        <nav className='header__nav'>
          <ul>
            <li>
              <Link href='/'>Accueil</Link>
            </li>
            <li className='dropdown'>
              <div className='link'>
                <Link href={'/shop'}>Sneakers</Link>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-chevron-down'
                >
                  <polyline points='6 9 12 15 18 9'></polyline>
                </svg>
              </div>

              <ul className='dropdown__content'>
                <li>
                  <Link href={'/collection/1'}>Nike</Link>
                </li>
                <li>
                  <Link href={'/collection/4'}>Adidas</Link>
                </li>
                <li>
                  <Link href={'/collection/2'}>Jordan</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className='header__icons'>
        {token ? (
          <Link href={'/profil'} passHref>
            <div className='icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-user'
              >
                <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                <circle cx='12' cy='7' r='4'></circle>
              </svg>
            </div>
          </Link>
        ) : (
          <Link href='/login' passHref>
            <div className='icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-user'
              >
                <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                <circle cx='12' cy='7' r='4'></circle>
              </svg>
            </div>
          </Link>
        )}

        <div className='icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
          </svg>
        </div>
        <Link href={'/cart'} passHref>
          <div className='icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-shopping-bag'
            >
              <path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'></path>
              <line x1='3' y1='6' x2='21' y2='6'></line>
              <path d='M16 10a4 4 0 0 1-8 0'></path>
            </svg>
            <span className='icon__label'>{cart.cartItems.length}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
