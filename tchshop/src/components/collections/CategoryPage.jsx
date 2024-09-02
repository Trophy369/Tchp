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
    // <div className="container p-4 mx-auto">
    //   <h1>{name}</h1>
    //   <p>this category data {JSON.stringify(products)}</p>
    //   {products.map(product => <CategoryCards product={product}/>)}
    // </div>
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{name}</h1>
      <p className="text-gray-700 mb-6">
        This category data: {JSON.stringify(products)}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <CategoryCards key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
