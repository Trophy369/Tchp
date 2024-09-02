import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import { viewCategoryProducts } from "../../services/userApi";

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
    <div>
      <h1>{name}</h1>
      <p>this category data {JSON.stringify(products)}</p>
    </div>
  );
};

export default CategoryPage;
