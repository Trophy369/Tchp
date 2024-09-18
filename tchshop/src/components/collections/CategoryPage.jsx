import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewCategoryProducts } from "../../services/userApi";
import CategoryCards from "./CategoryCards";

const CategoryPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  // const loadMore = async () => {
  //   setLoading(true);
  //   try {
  //     const newOffset = offset + limit;
  //     const data = await listproducts(limit, newOffset);
  
  //     if (data.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       setProducts(prevProducts => [...prevProducts, ...data]);
  //       setOffset(newOffset);
  //     }
  //   } catch (error) {
  //     console.error("Error loading more products:", error);
  //     setError("Failed to load more products. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loadMoreButton = () => {
    return (
      <button
        onClick={loadMore}
        disabled={loading || !hasMore}
        className={`mx-auto flex justify-center mt-8 mb-44 md:max-w-[25vw] p-2 ${
          loading ? "bg-gray-500" : hasMore ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"
        } text-white font-semibold rounded `}
      >
        {loading ? "Loading..." : hasMore ? "Load More" : "No More Products"}
      </button>
    );
  };



  return (
    <section className="container p-2 mx-auto font-bold mt-11 mb-44">
      <h1 className="p-2 my-4 text-2xl text-center">{name.toUpperCase()}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {products.map(product => (
          <CategoryCards key={product.id} product={product} />
        ))}
      </div>
      
      {/* {loadMoreButton()} */}
      
    </section>
  );
};

export default CategoryPage;
