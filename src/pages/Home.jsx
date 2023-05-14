import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/home/ProductCard";
import { axiosEcommerce } from "../utils/configAxios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [currentCategory, setCurrentCategory] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductName = e.target.productName.value;
    setProductName(newProductName);
  };

  const productsByName = useMemo(() => {
      return products.filter((product) =>
      product.title.toLowerCase().includes(productName.toLowerCase())
    );
  }, [productName, products]);

  const handleClickCategory = (e) => {
    setCurrentCategory(Number(e.target.dataset.category))
  }

  useEffect(() => {
    axiosEcommerce
      .get("categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if(currentCategory === 0){
      axiosEcommerce
        .get("products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));

    }
  }, [currentCategory]);

  useEffect(() => {
    if(currentCategory !== 0){
      axiosEcommerce
      .get(`products?categoryId=${currentCategory}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));

    }
  }, [currentCategory]);

  return (
    <main className="px-2 ">
      <form className="text-center mt-4" onSubmit={handleSubmit}>
        <div className="">
          <input
            id="productName"
            type="text"
            placeholder="what are you looking for.."
            className="border-[1px] mt-8 p-3  text-xs truncate px-2 rounded-s dark:bg-black/50 outline-none"
          />
          <button className=".
          text-center bg-blue-700 text-white hover:bg-blue-300 p-2 rounded-e ">
            <i className="bx bx-search mb-2 "></i>
          </button>
        </div>

        <ul className="cursor-pointer mt-6 px-4 py-2 my-2 grid justify-center " >
          <li className="hover:bg-blue-600/60 my-2 border-[1px] border-gray-200 rounded-lg px-4 hover:shadow-lg hover:shadow-blue-400 hover:bg-blue-600 hover:text-white " onClick={handleClickCategory} data-category={0} >All</li>
          {categories.map((category) => (
            <li className="hover:bg-blue-600/60 my-2 border-[1px] border-gray-200 rounded-lg px-4 hover:shadow-lg hover:shadow-blue-400 hover:bg-blue-600 hover:text-white " onClick={handleClickCategory} data-category={category.id} key={category.id}>{category.name} </li>
          ))}
        </ul>
      </form>
              
      <section className="grid gap-8 py-6 px-4  sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:max-w-[645px] lg:max-w-[1024px] mx-auto ">
        {productsByName.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Home;
