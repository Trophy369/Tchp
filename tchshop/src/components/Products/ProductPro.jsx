import React, { useState, useEffect, useRef } from "react";
import config from "../../config";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaDollarSign } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import {
  addToCart,
  viewProduct,
  viewProductDescription,
  viewProductColors,
  getShipping
} from "../../services/userApi";
import { addToCartAsync } from "../../reducers/cartReducer";

import { useAuth } from "../authContext/AuthProvider";
import Reviews from "./Reviews";

const baseURL = config.baseUrl;

// Product component
const ProductPro = props => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const { id } = useParams();
  const [lilQuantity, setLilQuantity] = useState(quantity);
  const [productDesc, setProductDesc] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await viewProduct(id);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchProductDesc = async () => {
      const data = await viewProductDescription(id);
      setProductDesc(data);
    };

    fetchProductDesc();
  }, [id]);

  useEffect(() => {
    const fetchProductColors = async () => {
      const data = await viewProductColors(id);
      setColors(data.colors_available);
    };

    fetchProductColors();
  }, [id]);

  console.log(colors);

  useEffect(() => {
    const fetchShipping = async () => {
      const shipReq = await getShipping();
      setShippingMethods(shipReq);
    };

    fetchShipping();
  }, []);

  const imageUrls = Array.isArray(product.product_image)
    ? product.product_image.map(
        img => `${baseURL}/static/products/${img.image_name}`
      )
    : [];

  const descImageUrls = Array.isArray(productDesc.images)
    ? productDesc.images.map(
        img => `${baseURL}/static/descriptions/${img.image_name}`
      )
    : [];

  const { description, product_name, discounted_price } = product;

  const handleAddToCart = () => {
    if (!color) {
      setError("Please select a color.");
      return;
    }
    setError("");
    dispatch(addToCartAsync(id, quantity, selectedShippingMethod, color));
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
      <Carousel images={imageUrls} />
      <div className="my-4 text-center">
        <h1 className="text-2xl font-bold">{product_name}</h1>
        <p className="flex items-center justify-center text-lg font-medium">
          <FaDollarSign className="mr-1" /> {discounted_price}
        </p>
        <p className="text-sm">{description}</p>
        <div className="flex justify-center space-x-2">
          {colors.map(colorOpt => (
            <label key={colorOpt.color} className="inline-flex items-center">
              <input
                type="radio"
                name="color"
                value={colorOpt.color}
                className="form-radio"
                checked={color === colorOpt.color}
                onChange={() => setColor(colorOpt.color)}
              />
              <span
                className="block w-6 h-6 ml-2"
                style={{ backgroundColor: colorOpt.color.toLowerCase() }}
              ></span>
              <span className="ml-2">{colorOpt.color}</span>
            </label>
          ))}
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
            value={lilQuantity}
            // onChange={handleChange}
            className="px-4 py-2 text-center border"
            min="1"
            max="28"
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
                <label key={ship.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedShippingMethod === ship.id}
                    onChange={() => setSelectedShippingMethod(ship.id)}
                    className="mr-2 text-black form-checkbox border-ash-300"
                  />
                  <div>
                    <span className="font-semibold">{ship.name}</span>
                    <div className="text-sm text-gray-600">
                      Delivery Time: {ship.deliveryTime}
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
        <Reviews />
      </div>
    </div>
  );
};

export default ProductPro;
