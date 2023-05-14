import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProductCart } from "../../store/slices/cart.slice";

const CartProduct = ({ product }) => {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity)

  const handleClickDelete = () => {
    dispatch(deleteProductCart(product.id));
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if(quantity > 1){
      setQuantity(quantity - 1);
    }
  } 
  
  return (
    <article>
      <section className="grid grid-cols-[auto_1fr_auto] gap-1">
        <div className="h-[90px] aspect-square row-span-2 p-2 ">
          <img className="w-full h-full object-contain " src={product.product.images[2].url} alt="" />
        </div>
        <h4>{product.product.title} </h4>
        <i onClick={handleClickDelete} className="bx bxs-trash text-blue-600 cursor-pointer transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 hover:"></i>
      <div className="flex items-center">
        <button className="border-[1px] p-1 px-2 hover:bg-blue-700 hover:text-white transition-colors rounded-tl rounded-s " onClick={handleDecrement}>
          -
        </button>
        <span className="border-[1px] p-1 px-4 border-x-0 ">{product.quantity} </span>
        <button className="border-[1px] p-1 px-2 hover:bg-blue-700 hover:text-white transition-colors rounded-r " onClick={handleIncrement}>
          +
        </button>
      </div>
      </section>
      <h4 className="mt-2 text-end">Total: <span className="font-bold">$ {(product.quantity * product.product.price).toFixed(1)} </span> </h4>
      
    </article>
  );
};

export default CartProduct;
