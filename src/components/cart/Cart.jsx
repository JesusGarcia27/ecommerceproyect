import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeIsShowCart, getCartProducts, purchaseCart, resetNotificationCount } from '../../store/slices/cart.slice'
import CartProduct from './CartProduct'

const Cart = () => { 

  const {isShowCart, products} = useSelector(store => store.cart);
  const {token} = useSelector((store) => store.userInfo)
  const dispatch = useDispatch()

  const handleClickChangeShowCart = () => {
    dispatch(changeIsShowCart());
    dispatch(resetNotificationCount());
  };

  const totalPrice = products.reduce((acc, curr) => acc + curr.quantity * curr.product.price, 0);

  const handleClickCheckout = () => {
    dispatch(purchaseCart());
  }

  useEffect(() => {
    if(isShowCart){
      dispatch(getCartProducts());
    }
  }, [isShowCart]);

  return (
    <section className={`fixed top-[60px] bg-white shadow-xl h-screen w-[300px] py-4 ${isShowCart && token ? "right-0 " : "-right-full"} duration-200 p-2 grid grid-rows-[auto_1fr_auto] dark:bg-black rounded-lg`}>
        <h2 className='text-lg font-bold'>Cart</h2>
        <i onClick={handleClickChangeShowCart} className='bx bxs-x-square text-2xl absolute top-2 right-3 cursor-pointer hover:text-blue-600 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 hover:shadow-lg hover:shadow-blue-600/80'></i>

        {/* Productos del carrito */}
        <section className='overflow-y-auto grid gap-6 content-start'>
            {
              products.map(product => <CartProduct key={product.id} product={product} />)
            }
        </section>

        {/* Checkout */}
        <section className='grid grid-cols-2 py-10 border-t-[1px] border-gray-400 '>
            <span>Total</span>
            <h4 className='text-end'>$ {totalPrice} </h4>
            <button onClick={handleClickCheckout} className='w-full col-span-2 bg-blue-700 py-2 text-white hover:bg-blue-300 rounded-lg transition-colors mt-6 hover:shadow-lg hover:shadow-blue-600/80 mb-10'>Checkout</button>
        </section>
    </section>
  )
}

export default Cart