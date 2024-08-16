import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { listproducts } from "../../services";
// import { getProduct } from "../store/products";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts, setImageUrls] = useState([])
  // const dispatch = useDispatch();
  // const products = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await listproducts();
      const image = await
      setProducts(data)
      // dispatch(getProduct(data));


    };
    const fetchImages = async () => {
      fetch
    };

    fetchProducts();
  }, []);

  return (
    <section className="container px-4 py-8 mx-auto">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              product_images={product.images}
              name={product["Product name"]}
              description={product.description}
              quantity={product.quantity}
              price={product.discounted_price}
              regPrice={product.regular_price}
            />
          ))}
        </div>
    </section>
  );
};

export default Products;
