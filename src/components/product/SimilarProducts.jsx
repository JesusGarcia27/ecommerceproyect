import React, { useEffect, useState } from "react";
import { axiosEcommerce } from "../../utils/configAxios";
import ProductCard from "../home/ProductCard";

const SimilarProducts = ({ categoryId, productId }) => {
  const [similarProducts, setSimilarProducts] = useState([])

  useEffect(() => {
    if(categoryId){
        axiosEcommerce
          .get(`products?categoryId=${categoryId}`)
          .then((res) => {
            const otherProducts = res.data.filter(product => product.id !== productId)
            setSimilarProducts(otherProducts)
          })
          .catch((err) => console.log(err));

    }
  }, [categoryId, productId]);

  return (
    <section className="px-2  max-w-[300px] sm:max-w-[645px] lg:max-w-[1024px] mx-auto">
      <h2 className="text-blue-700 font-bold text-lg mb-6 text-center">Discover similar items</h2>

      <section className="grid gap-6 py-4 sm:grid-cols-2 lg:grid-cols-3 ">
        {
            similarProducts.map(product => <ProductCard key={product.id} product={product} />)
        }
      </section>
    </section>
  );
};

export default SimilarProducts;
