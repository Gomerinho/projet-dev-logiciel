import React from 'react';
import Link from 'next/link';

const ProductsCard = ({ product, id }) => {
  return (
    <Link href={`/shop/${id}`} passHref>
      <div className='product__card'>
        <div className='card__image'>
          <img
            src={`http://localhost:1337${product.image.data.attributes.url}`}
            alt=''
          />
        </div>
        <div className='card__content'>
          <h6>{product.collection.data?.attributes?.name || ''}</h6>
          <h4>{product.title}</h4>
          <p className='card__price'>{`${product.price} €`} </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductsCard;
