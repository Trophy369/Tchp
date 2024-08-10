import React, { useState, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import { useAuth } from "../components/authContext/AuthProvider";
import { handleQuantity, getCart, removeFromCart  } from "../services/userApi";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";

const CartPage = ({}) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getCart(user.id);
      setCart(data[1]);
    };

    fetchProducts();
  }, []);

  const addOneToCart = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.prod_quantity + 1;
        handleQuantity(productId, newQuantity); // Call the update function to update the server
        return { ...item, prod_quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const minusOneToCart = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId && item.prod_quantity > 0) {
        const newQuantity = item.prod_quantity - 1;
        handleQuantity(productId, newQuantity); // Call the update function to update the server
        return { ...item, prod_quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    removeFromCart(productId)
  };

  const subtotal = cart
    .reduce((acc, item) => acc + item.discounted_price * item.prod_quantity, 0)
    .toFixed(2);

  const updateQuantity = (productId, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, prod_quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">Your Cart</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-2 w-7/10 md:w-1/2">Product</th>
              <th className="hidden pb-2 w-2/10 md:table-cell">Quantity</th>
              <th className="pb-2 w-2/10 md:w-1/5">Price</th>
              <th className="pb-2 w-1/10">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <Cart
                key={item.id}
                productId={item.id}
                name={item.product_name}
                quantity={item.prod_quantity}
                price={item.discounted_price}
                updateQuantity={updateQuantity}
                addOneToCart={addOneToCart}
                minusOneToCart={minusOneToCart}
                removeItem={removeItem}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <p className="mb-2">
          Subtotal: <FaDollarSign className="inline-block" /> {subtotal}
        </p>
        <p className="mb-4">Taxes and Shipping calculated at checkout</p>
        <Link to={'/checkout'} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
