// Categories.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { viewCategory } from '../../services/userApi';
import ProductCard from "../Products/ProductCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
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
    <div className="absolute z-20 hidden w-48 mt-1 transform -translate-x-1/2 bg-white rounded shadow-lg left-1/2 group-hover:block">
      {/* Dropdown content */}
      {categories.map(category => <Link key={category.id}
        to={`collections/${category.category_name}`}
        className="block px-4 py-2 text-sm text-center text-gray-700 transition duration-300 ease-in-out hover:bg-gray-100"
      >
        {category.category_name}
      </Link>)}
    </div>
    
  );
};

export default Categories;
