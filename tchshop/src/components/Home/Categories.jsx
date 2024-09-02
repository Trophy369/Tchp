import { useState, useEffect } from "react";
import { viewCategory } from "../../services/userApi";
import {Link} from "react-router-dom"

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await viewCategory();

        if (error) {
          setError(error);
          setCategories([]);
        } else {
          setCategories(data);
          setError(null); 
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Failed to fetch reviews. Please try again later.");
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="absolute hidden w-48 mt-1 bg-black rounded shadow-lg group-hover:block">
      {/* Dropdown content */}
      {categories.map(category => <Link key={category.id}
        to={`collections/${category.category_name}`}
        className="block px-4 py-2 text-sm text-center hover:bg-gray-600"
      >
        {category.category_name}
      </Link>)}
    </div>
  );
};

export default Categories;
