import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDollarSign } from "react-icons/fa";
import { addToCart, viewProduct, viewReview } from "../../services/userApi";
import { useParams } from "react-router-dom";

// Carousel component
const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds interval
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSwipe = direction => {
    if (direction === "left") {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    } else if (direction === "right") {
      setCurrentIndex(
        prevIndex => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  return (
    <div className="relative overflow-hidden" style={{ height: "25vh" }}>
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 flex space-x-2 transform -translate-x-1/2 left-1/2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
      <button
        onClick={() => handleSwipe("right")}
        className="absolute left-0 px-2 py-1 text-white transform -translate-y-1/2 bg-black top-1/2"
      >
        &lt;
      </button>
      <button
        onClick={() => handleSwipe("left")}
        className="absolute right-0 px-2 py-1 text-white transform -translate-y-1/2 bg-black top-1/2"
      >
        &gt;
      </button>
    </div>
  );
};

// Product component
const ProductPro = () => {
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState([]);
  const [review, setReview] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const { id } = useParams();

  console.log(name);

  const { description, product_name, discounted_price } = product;

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await viewProduct(id);
      setProduct(data);
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchReview = async () => {
      const data = await viewReview(id);
      setReview(data);
    };

    fetchReview();
  }, []);

  useEffect(() => {
    const fetchShipping = async () => {
      const shipReq = await getShipping();
      setShippingMethods(shipReq);
    };

    fetchShipping();
  }, []);

  const handleAddToCart = () => {
    if (!color) {
      setError("Please select a color.");
      return;
    }
    setError("");
    // addToCart(id)
    setNotification("Product added to cart");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="p-4 md:p-8">
      {error && (
        <div className="fixed px-4 py-2 text-white transform -translate-x-1/2 bg-red-500 rounded-lg top-4 left-1/2">
          {error}
        </div>
      )}
      {notification && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed px-4 py-2 text-white bg-green-500 rounded-lg bottom-4 right-4"
        >
          {notification}
        </motion.div>
      )}
      <Carousel
        images={[
          "/path/to/image1.jpg",
          "/path/to/image2.jpg",
          "/path/to/image3.jpg",
          "/path/to/image4.jpg"
        ]}
      />
      <div className="my-4 text-center">
        <h1 className="text-2xl font-bold">{product_name}</h1>
        <p className="flex items-center justify-center text-lg font-medium">
          <FaDollarSign className="mr-1" /> {discounted_price}
        </p>
        <p className="text-sm">
          Brief product description goes here.{description}
        </p>
        <div className="my-4">
          <p className="mb-2 text-sm font-semibold">Color</p>
          <div className="flex justify-center space-x-2">
            {["Red", "Blue", "Green", "Yellow"].map(colorOption => (
              <label key={colorOption} className="inline-flex items-center">
                <input
                  type="radio"
                  name="color"
                  value={colorOption}
                  className="form-radio"
                  checked={color === colorOption}
                  onChange={() => setColor(colorOption)}
                />
                <span
                  className="block w-6 h-6 ml-2"
                  style={{ backgroundColor: colorOption.toLowerCase() }}
                ></span>
                <span className="ml-2">{colorOption}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center my-4 space-x-2">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-4 py-2 bg-gray-300"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={e =>
              setQuantity(Math.max(1, Math.min(27, Number(e.target.value))))
            }
            className="px-4 py-2 text-center border"
            min="1"
            max="27"
          />
          <button
            onClick={() => setQuantity(q => Math.min(27, q + 1))}
            className="px-4 py-2 bg-gray-300"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-6 py-2 text-white bg-blue-500 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
      <div className="text-center">
        <p className="inline-block px-4 py-2 my-4 text-center bg-gray-100 border border-black">
          Shipping is calculated at checkout
        </p>
        <section className="p-4 mb-8 border-2 border-black bg-light-brown-500/50">
          <h2 className="mb-2 text-xl font-semibold">Shipping Method</h2>
          {
            <div className="space-y-4">
              {shippingMethods.map(ship => (
                <label key={ship.method} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedShippingMethod === ship.method}
                    onChange={() => setSelectedShippingMethod(ship.method)}
                    className="mr-2 text-black form-checkbox border-ash-300"
                  />
                  <div>
                    <span className="font-semibold">{method.name}</span>
                    <div className="text-sm text-gray-600">
                      Delivery Time: {method.deliveryTime}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          }
        </section>
      </div>
      <div className="my-4 text-center">
        <p>Additional product details go here.</p>
        <img
          src="/path/to/placeholder-image.jpg"
          alt="Product Detail"
          className="w-full h-auto just"
        />
      </div>
    </div>
  );
};

export default ProductPro;
