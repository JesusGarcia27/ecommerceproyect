import React, { useEffect, useState } from "react";
import { axiosEcommerce } from "../../utils/configAxios";
import SimilarProducts from "./SimilarProducts";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProdcutCart } from "../../store/slices/cart.slice";

const stylePositionImages = {
    "0" : "-ml-[0%] ",
    "1" : "-ml-[100%] ",
    "2" : "-ml-[200%] "
}

const ProductDetail = ({ productId }) => {
  const [productData, setProductData] = useState();
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const [image, setImage] = useState(0)

  const handleClickPlus = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
  };

  const handleClickLess = () => {
    const newCounter = counter - 1;
    if (newCounter >= 0) {
      setCounter(newCounter);
    }
  };

  const handleClickAddToCart = () => {
    dispatch(addProdcutCart({ quantity: counter, productId: productData.id }));
    setCounter(1);
  };

  const nextImage = () => {
    const newImagePosition = image + 1
    if(newImagePosition <= 2){
        setImage(newImagePosition)
    }else{
        setImage(0)
    }
  }

  const previusImage = () => {
    const newImagePosition = image - 1
    if(newImagePosition >= 0){
        setImage(newImagePosition)
    }else{
        setImage(2);
    }
  }
 
  useEffect(() => {
    axiosEcommerce
      .get(`products/${productId}`)
      .then((res) => setProductData(res.data))
      .catch((err) => console.log(err));
  }, [productId]);

  return (
    <>
      <section className="flex gap-2 items-center px-4 mt-14 lg:justify-center lg:text-lg ">
        <Link to="/">Product Detail</Link>
        <div className="h-[7px] aspect-square bg-blue-700 rounded-full "></div>
        <span className="font-bold">{productData?.title} </span>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 sm:items-center max-w-[1000px] mx-auto ">


        {/* Slider */}
        <section className="overflow-hidden relative">
          <section className={`flex w-[300%] ${stylePositionImages[image]} duration-200 `}>
            <div className="h-[300px] p-2 w-[calc(100%_/_3)] ">
              <img
                className="h-full w-full object-contain"
                src={productData?.images[0].url}
                alt=""
              />
            </div>
            <div className="h-[300px] p-2 w-[calc(100%_/_3)] ">
              <img
                className="h-full w-full object-contain"
                src={productData?.images[1].url}
                alt=""
              />
            </div>
            <div className="h-[300px] p-2 w-[calc(100%_/_3)] ">
              <img
                className="h-full w-full object-contain"
                src={productData?.images[2].url}
                alt=""
              />
            </div>
          </section>
          <i onClick={nextImage} className='bx bxs-right-arrow text-3xl absolute top-1/2 -translate-y-1/2 right-2 text-blue-600  cursor-pointer hover:rounded-full hover:bg-blue-400 hover:text-white'></i>
          <i onClick={previusImage} className='bx bxs-left-arrow text-3xl absolute top-1/2 -translate-y-1/2 left-2 text-blue-600  cursor-pointer hover:rounded-full hover:bg-blue-400 hover:text-white'></i>
        </section>

        <section className="">
          <h4 className="text-gray-400 font-bold p-2 mt-8">
            {productData?.brand}{" "}
          </h4>
          <h3 className="font-bold text-lg ml-2 p-2">{productData?.title} </h3>

          <section className="grid grid-cols-2 mt-6">
            <article>
              <h4 className="text-gray-400 font-bold ml-2 mb-3">Price</h4>
              <span className="font-bold text-lg ml-2 p-2">
                ${productData?.price}{" "}
              </span>
            </article>

            <article>
              <h4 className="text-gray-400 font-bold mb-2">Quantity</h4>
              <div className="flex items-center">
                <button
                  onClick={handleClickLess}
                  className="border-[1px] p-1 px-4 hover:bg-blue-700 hover:text-white transition-colors "
                >
                  -
                </button>
                <span className="border-[1px] p-1 px-4 border-x-0 ">
                  {counter}{" "}
                </span>
                <button
                  onClick={handleClickPlus}
                  className="border-[1px] p-1 px-4 hover:bg-blue-700 hover:text-white transition-colors "
                >
                  +
                </button>
              </div>
            </article>
          </section>

          <button
            onClick={handleClickAddToCart}
            className="w-full  bg-blue-700 py-2 text-white hover:bg-blue-300 rounded-lg transition-colors mt-6"
          >
            Add to cart <i className="bx bx-cart"></i>
          </button>

          <p className="text-sm my-6 font-semibold text-gray-600">
            {productData?.description}{" "}
          </p>
        </section>
      </section>
      <SimilarProducts
        productId={productData?.id}
        categoryId={productData?.categoryId}
      />
    </>
  );
};

export default ProductDetail;
