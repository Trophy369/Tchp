import { useEffect, useState } from "react";
import { listproducts } from "../../services";
import ProductCard from "./ProductCard";
import Skele from "./Skele";

const Products = ({ searchResult, loading, setLoading }) => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(18);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const data = await listproducts(limit, offset);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchResult === null) {
      setProducts(null);
    } else {
      setProducts(searchResult)
    }
  }, [searchResult]);

  if(!loading && !products) {
    return (
      <div className="flex items-center justify-center my-16 ">
        <div className="w-[80vw] h-[35vh] md:w-[50vw] md:h-[50vh] flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
          <h1 className="mb-4 text-2xl font-bold text-red-400">Product Not Found</h1>
          <a href="/" className="text-lg text-blue-500 underline">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

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
        disabled={loading || !hasMore}
        className={`mx-auto flex justify-center mt-8 mb-44 md:max-w-[25vw] p-2 ${
          loading
            ? "bg-gray-500"
            : hasMore
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-500"
        } text-white font-semibold rounded `}
      >
        {loading
          ? "Loading..."
          : hasMore
          ? "Load More"
          : "No More Products to display"}
      </button>
    );
  };

  return (
    <section className="container mx-auto ">
      <div className="grid grid-cols-2 gap-4 py-2 mx-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {loading
          ? Array.from({ length: limit }).map((_, index) => (
              <Skele key={index} />
            ))
          : products.map(product => (
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
      <div className="mb-33"></div>
    </section>
  );
};

export default Products;
