import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import { viewCategoryProducts } from "../../services/userApi";
import ProductCard from "../Products/ProductCard";



const CategoryPage = () => {
  const {name} = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await viewCategoryProducts(name);

        if (error) {
          setError(error);
          setProducts([]);
        } else {
          setProducts(data);
          setError(null); 
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Failed to fetch reviews. Please try again later.");
        setProducts([]);
      }
    };

    fetchCategories();
  }, [name]);

  return (
    <section className="container px-4 py-4 mx-auto">
      <h1>{name}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {products.map(products => (
            <ProductCard
              key={product.id}
              productId={product.id}
              product_image={products.product_image}
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

export default CategoryPage;
