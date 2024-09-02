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
    <div className="absolute z-20 hidden w-48 mt-1 bg-black rounded shadow-lg group-hover:block">
      {/* Dropdown content */}
      {categories.map(category => <Link key={category.id}
        to={`collections/${category.category_name}`}
        className="block px-4 py-2 text-sm text-center transition duration-300 ease-in-out hover:bg-gray-600"
      >
        {category.category_name}
      </Link>)}
    </div>
    // <section className="container px-4 py-8 mx-auto">
    //   <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    //     {products.map(product => (
    //       <ProductCard
    //         key={product.id}
    //         productId={product.id}
    //         product_image={product.product_image}
    //         name={product["Product name"]}
    //         description={product.description}
    //         quantity={product.quantity}
    //         price={product.discounted_price}
    //         regPrice={product.regular_price}
    //       />
    //     ))}
    //   </div>
    //   {loadMoreButton()}
    // </section>
  );
};

export default Categories;
