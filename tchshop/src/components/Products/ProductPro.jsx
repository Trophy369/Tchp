import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaDollarSign } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import { viewProduct } from "../../services/userApi";
import { addToCartAsync } from "../../reducers/cartReducer";
import ProductColors from "./ProductColors";
import Shipping from "./Shipping";
import Reviews from "./Reviews";
import ProductDescription from "./ProductDescription";
import ShowError from "../ShowError";

const ProductPro = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productError, setProductError] = useState(null);
  const [product, setProduct] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null); // Initialize as null
  const { id } = useParams();
  const [color, setColor] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await viewProduct(id);

        if (data instanceof Error) {
          throw data;
        }

        setProduct(data);
        setProductError(null);
      } catch (err) {
        console.error("Error fetching product:", err.message);
        setProductError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (productError) {
    return <ShowError errorMessage={productError} buttonText={"Reload"} />
  }

  const imageUrls = Array.isArray(product.product_image)
    ? product.product_image.map(img => `static/products/${img.image_name}`)
    : [];

  const { description, product_name, discounted_price } = product;

  const handleAddToCart = () => {
    if (!color) {
      setError("Please select a color.");
      return;
    }

    setLoading(true);
    setError(null);
    dispatch(addToCartAsync(id, quantity, selectedShippingMethod, color));
    setNotification("Product added to cart");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleChange = event => {
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= 28) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(q => Math.min(27, q + 1));
  };

  const decrementQuantity = () => {
    setQuantity(q => Math.max(1, q - 1));
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
      {/* <div className="flex flex-col items-center justify-center flex-1 p-2">
          <h2 className="mb-1 text-base font-normal text-center">{name}</h2>
          <p className="flex items-center mb-1 text-base font-medium">
            <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
            {price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
             {quantity} Sold |  {quantity} Left
          </p>
        </div> */}
      <div className="my-8 text-center">
        <h1 className="text-lg font-medium ">{product_name}</h1>
        <p className="flex items-center justify-center text-base font-medium">
          <FaDollarSign className="mr-1" /> {discounted_price} / Piece
        </p>
        <p className="my-4 text-sm">{description}</p>

        <hr className="w-[80vw] md:w-[60vw] mx-auto "/>
        
        <ProductColors id={id} color={color} setColor={setColor} />
        
        <hr className="w-[80vw] md:w-[60vw] mx-auto "/>

        <div className="my-8">
        <h3 className="text-center ">Quantity</h3>
        <div className="flex items-center justify-center my-4 space-x-2">
         
          <button onClick={decrementQuantity} className="px-4 py-2 bg-gray-300">
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleChange}
            className="px-4 py-2 text-center border"
            min="1"
            max="28"
          />
          <button onClick={incrementQuantity} className="px-4 py-2 bg-gray-300">
            +
          </button>
        </div>
        </div>
        
        <hr className="w-[80vw] md:w-[60vw] mx-auto "/>
      
        <Shipping
        selectedShippingMethod={selectedShippingMethod}
        setSelectedShippingMethod={setSelectedShippingMethod}
        />
     
       

        <button
          onClick={handleAddToCart}
          className="px-6 py-2 my-4 text-white bg-blue-500 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
      <hr />
      <hr />
      <div className="mt-8 text-center">
        <ProductDescription />
        <Reviews id={id} />
      </div>
     
    </div>
  );
};

export default ProductPro;
