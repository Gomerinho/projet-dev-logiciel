import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../_app';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import productService from '../../services/product.service';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(pid);
    productService
      .getProduct(pid)
      .then(response => {
        setProduct(response.data.attributes);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [pid]);

  const cart = useContext(CartContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='product'>
          <div className='product__image'>
            {product.image && (
              <img
                src={`http://localhost:1337${product.image.data.attributes.url}`}
                alt=''
              />
            )}
          </div>
          <div className='product__details'>
            <h6 className='product__collection'>
              {product.collection?.data?.attributes?.name}
            </h6>
            <h5 className='product__title'>{product.title}</h5>
            <p className='product__price'>{`${product.price} €`}</p>
            <p className='product__desc'>{product.description}</p>
            <Button
              className='btn'
              onClick={() => {
                cart.addToCart({ ...product, id: parseInt(pid) + 1 });
                toast.success('Produit ajouté au panier');
              }}
            >
              Ajouter au panier
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
