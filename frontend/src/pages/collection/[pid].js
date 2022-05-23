import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import ProductsCard from '../../components/Shop/ProductsCard';
import ProductsGrid from '../../components/Shop/ProductsGrid';
import { GET_COLLECTION_BY_ID } from '../../graphql/collectionsQuery';

const Collection = () => {
  const [productsState, setProductsState] = useState([]);
  const [priceRange, setPriceRange] = useState(500);

  const router = useRouter();
  const { pid } = router.query;

  const { loading, data, refetch, error } = useQuery(GET_COLLECTION_BY_ID, {
    variables: {
      collectionId: pid,
    },
  });
  useEffect(() => {
    if (data) {
      setProductsState(data.collection.data.attributes.products.data);
    } else {
      console.log(error);
    }
  }, [data, error]);
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
                    eq: 'man',
                  },
                },
              },
            })
          }
        >
          {' '}
          Man
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
      {loading && <Loader />}

      <h1 className='collection__title'>
        {data?.collection.data.attributes?.name}
      </h1>

      {!loading && productsState.length > 1 ? (
        <ProductsGrid>
          {productsState.map(product => (
            <ProductsCard
              product={product.attributes}
              key={product.id}
              id={product.id}
            />
          ))}
        </ProductsGrid>
      ) : (
        <div>
          <h1 className='noproduct'>Aucun produits disponible</h1>
        </div>
      )}
    </>
  );
};

export default Collection;
