import React, { useContext } from 'react';
import Button from '../../components/Button/Button';
import IsLogged from '../../HOC/AuthHOC';
import { CartContext } from '../_app';

const Cart = () => {
  const cart = useContext(CartContext);
  return (
    <div className='cart'>
      {cart.cartItems.length > 0 ? (
        cart.cartItems.map((item, index) => (
          <div key={index} className='cart__content'>
            <div className='cart__image'>
              <img
                src={`http://localhost:1337${item.image.data.attributes.url}`}
                alt={item.description}
              />
            </div>
            <div className='cart__body'>
              <div className='cart__title'>{item.title}</div>
              <div className='cart__quatity'>
                {item.quantity} x{' '}
                {item.price.toFixed(2).toString().replace('.', ',')} €
                <div>
                  <Button
                    className='btn btn-icon'
                    onClick={() => cart.addQuantity(item.id)}
                  >
                    +
                  </Button>
                  <Button
                    className='btn btn-icon'
                    onClick={() => cart.removeQuantity(item.id)}
                  >
                    -
                  </Button>
                </div>
              </div>
              <div className='cart__button'>
                <Button
                  className='btn btn-red'
                  onClick={() => cart.deleteItem(item.id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='cart__empty'>Pas de produit dans le panier</p>
      )}

      <div className='cart__divider'></div>
      <div className='cart__totale'>
        Total : {cart.totalPrice.toFixed(2).toString().replace('.', ',')} €{' '}
      </div>
    </div>
  );
};

export default IsLogged(Cart);
