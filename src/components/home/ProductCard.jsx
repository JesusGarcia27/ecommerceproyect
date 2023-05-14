import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProdcutCart } from '../../store/slices/cart.slice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((store) => store.cart.products);
  const [showAlert, setShowAlert] = useState(false);

  const handleClickAddProduct = (e) => {
    e.preventDefault();
    const productInCart = cartProducts.find((item) => item.product.id === product.id);
    if (productInCart) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Ocultar la alerta después de 3 segundos
    } else {
      dispatch(addProdcutCart({ productId: product.id, quantity: 1 }));
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className='border-[1px] border-gray-300 rounded-lg hover:shadow-lg hover:shadow-blue-400 sm:max-w-[400px] sm:grid sm:mx-auto'
    >
      <div className='p-4 border-b-[1px] border-gray-300 h-[200px] overflow-hidden relative group'>
        <img
          className='h-full w-full object-contain group-hover:opacity-0 transition-opacity duration-300'
          src={product.images[0].url}
          alt=''
        />
        <img
          className='h-full w-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          src={product.images[1].url}
          alt=''
        />
      </div>
      <section className='p-4 relative'>
        <h4 className='text-gray-400 font-bold'>{product.brand}</h4>
        <h3 className='font-bold text-sm ml-2'>{product.title}</h3>
        <h4 className='text-gray-400 font-bold mt-4'>Price</h4>
        <span className='font-bold text-sm ml-2'>$ {product.price}</span>
        <button
          onClick={handleClickAddProduct}
          className='absolute right-4 bottom-4 bg-blue-700 p-2 text-white rounded-full w-[45px] aspect-square hover:bg-blue-400'
        >
          <i className='bx bx-cart-alt text-lg'></i>
        </button>
        <div className='mb-12'>
          {showAlert && <p className='text-red-500 text-xs mt-4'>This product is already in the cart.</p>}
        </div>
      </section>
    </Link>
  );
};

export default ProductCard;