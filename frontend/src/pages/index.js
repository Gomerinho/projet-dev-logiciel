import { useQuery } from '@apollo/client';
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Loader from '../components/Loader/Loader';
import ProductsGrid from '../components/Shop/ProductsGrid';
import ProductsCard from '../components/Shop/ProductsCard';
import { flashContext } from '../context/FlashProvider';
import { GET_LATEST_PRODUCTS } from '../graphql/productsQuery';

export default function Home() {
  const flash = useContext(flashContext);

  const { data, loading, error } = useQuery(GET_LATEST_PRODUCTS, {
    variables: {
      pagination: {
        limit: 4,
      },
    },
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data.products.data);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='page__home'>
      <div className='hero'>
        <div className='hero__image'>
          <img
            src='https://cdn.shopify.com/s/files/1/2358/2817/files/air-jordan-4-military-black-desktop-fr_5eac0879-c37d-44d1-ab96-9bf893d8408d_3000x.jpg?v=1653063913'
            alt='hero image'
          />
        </div>
      </div>
      <section className='product__section'>
        <div className='product__collection'>
          <div className='product__collection__title'>
            <h2>Nouveautés</h2>
          </div>

          <div className='product__collection__items'>
            <ProductsGrid>
              {products.map(product => (
                <ProductsCard
                  product={product.attributes}
                  key={product.id}
                  id={product.id}
                />
              ))}
            </ProductsGrid>
          </div>
        </div>
      </section>
      <section className='quality'>
        <div className='quality__img'>
          <img
            src='https://cdn.shopify.com/s/files/1/2358/2817/files/Turbo-Green-AJ1_02abb900-9c4b-49fa-95b5-5a80a60c6ebc_1400x.jpg?v=1650386761'
            alt='quality'
          />
        </div>
        <div className='quality__content'>
          <h3>Des produits neufs et authentiques</h3>
          <p>
            Tous les produits que nous envoyons sont accompagnés d'une carte
            d'authenticité ainsi que d'un scellé certifiant la qualité et
            l'authenticité du produit. Avant d'arriver entre vos mains, ils sont
            contrôlés par nos experts qui s'assurent de leur authenticité.
          </p>
        </div>
      </section>
    </div>
  );
}
