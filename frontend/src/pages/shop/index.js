import Link from 'next/link';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader.jsx';
import ProductsCard from '../../components/Shop/ProductsCard.jsx';
import ProductsGrid from '../../components/Shop/ProductsGrid.jsx';
import TitlePage from '../../components/TitlePage.jsx';
import productService from '../../services/product.service.js';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/productsQuery.js';

const Shop = () => {
  const [productsState, setProductsState] = useState([]);
  const [priceRange, setPriceRange] = useState(500);

  const { loading, data, refetch } = useQuery(GET_PRODUCTS);
  useEffect(() => {
    if (data) {
      setProductsState(data.products.data);
    }
  }, [data]);

  return (
    <>
      <div className='categories__container'>
        <div
          className='container'
          style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
        >
          <label htmlFor='priceRange'>{priceRange} €</label>
          <input
            name='priceRange'
            type='range'
            min={0}
            max={2000}
            step={25}
            value={priceRange}
            onChange={e => {
              setPriceRange(parseInt(e.target.value));
              refetch({
                filters: {
                  price: {
                    lte: priceRange,
                  },
                },
              });
            }}
          />
        </div>
        <button
          className='btn'
          onClick={() =>
            refetch({
              filters: {},
            })
          }
        >
          {' '}
          All
        </button>
        <button
          className='btn'
          onClick={() =>
            refetch({
              filters: {
                categories: {
                  name: {
                    eq: 'woman',
                  },
                },
              },
            })
          }
        >
          {' '}
          Woman
        </button>
        <button
          className='btn'
          onClick={() =>
            refetch({
              filters: {
                categories: {
                  name: {
                    eq: 'football',
                  },
                },
              },
            })
          }
        >
          {' '}
          FootBall
        </button>
        <button
          className='btn'
          onClick={() =>
            refetch({
              filters: {
                categories: {
                  name: {
                    eq: 'lifestyle',
                  },
                },
              },
            })
          }
        >
          {' '}
          LifeStyle
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ProductsGrid>
          {productsState.map(product => (
            <ProductsCard
              product={product.attributes}
              key={product.id}
              id={product.id}
            />
          ))}
        </ProductsGrid>
      )}
    </>
  );
};

export default Shop;
