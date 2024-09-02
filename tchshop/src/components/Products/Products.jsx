import { useEffect, useState } from "react";
import { listproducts } from "../../services";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(16);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await listproducts(limit, offset);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    try {
      const newOffset = offset + limit;
      const data = await listproducts(limit, newOffset);
  
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
        className={`mx-auto flex justify-center my-8 md:max-w-[25vw] p-2 ${
          loading ? "bg-gray-500" : "bg-blue-500"
        } text-white font-semibold rounded hover:bg-blue-600`}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    );
  };

  return (
    <section className="container px-4 py-8 mx-auto">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
      {loadMoreButton()}
    </section>
  );
};

export default Products;
