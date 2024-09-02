import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { viewCategoryProducts } from "../../services/userApi";
import ProductCard from "../Products/ProductCard";

const CategoryPage = () => {
  const { name } = useParams()
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(16);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await viewCategoryProducts(name, limit, offset);

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
  }, [name, limit, offset]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const newOffset = offset + limit;
      const { data, error } = await viewCategoryProducts(name, limit, newOffset);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prevProducts => [...prevProducts, ...data]);
        setOffset(newOffset);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
      setError("Failed to load more products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreButton = () => {
    return (
      <button
        onClick={loadMore}
        disabled={loading}
        className={`mx-auto flex justify-center my-2 md:max-w-[25vw] p-2 ${
          loading ? "bg-gray-500" : "bg-blue-500"
        } text-white font-semibold rounded hover:bg-blue-600`}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    );
  };

  return (
    <section className="container px-4 py-8 mx-auto ">
      <h1 className='flex justify-center'>{name.toUpperCase()}</h1>
      <div className="grid grid-cols-2 gap-4 my-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            productId={product.id}
            product_image={product.product_image}
            name={product["Product name"]}
            description={product.description}
            quantity={product.quantity}
            price={product.discounted_price}
            regPrice={product.regular_price}
          />
        ))}
      </div>
      {hasMore && loadMoreButton()}
    </section>
  );
};

export default CategoryPage;
