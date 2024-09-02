import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewCategoryProducts } from "../../services/userApi";
import CategoryCards from "./CategoryCards";

const CategoryPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState([]);

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
    <section className="container py-4 py-8 mx-4 mx-auto font-bold">
      <h1 className="p-2 my-4 text-center">{name.toUpperCase()}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {products.map(product => (
          <CategoryCards key={product.id} product={product} />
        ))}
      </div>
      
      
    </section>
  );
};

export default CategoryPage;
