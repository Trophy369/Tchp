import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { listproducts } from "../../services";
// import { getProduct } from "../store/products";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await listproducts();
      setProducts(data)
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
              product_image={product.product_image}
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
