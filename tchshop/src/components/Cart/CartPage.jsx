import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaDollarSign, FaTrash } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import { useAuth } from "../authContext/AuthProvider";
import {
  handleQuantity,
  getCart,
  removeFromCart,
  clearCart
} from "../../services/userApi";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import ShowError from "../ShowError";
import { fetchCartItems } from "../../reducers/cartReducer";


const CartPage = ({}) => {
  const { user } = useAuth();
  const cart = useSelector((state) => state.cart.cart_details)

  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.user);
  const { cart_details, loading, error } = useSelector(state => state.cart);

  useEffect(() => {
    if (user !== null) {
      dispatch(fetchCartItems());
    }
  }, [user, dispatch]);

  // useEffect(() => {
  //   if (user !== null) {
  //     dispatch(fetchCartItems());
  //   }
  // }, [user, dispatch]);

  const subtotal = cart_details
    .reduce((acc, item) => acc + item.discounted_price * item.prod_quantity, 0)
    .toFixed(2);

  // const updateQuantity = (productId, newQuantity) => {
  //   setCart(
  //     cart.map(item =>
  //       item.id === productId ? { ...item, prod_quantity: newQuantity } : item
  //     )
  //   );
  // };

  const handleClearCart = () => {
    dispatch(clearCartAsync());
  };

  return error ? (
    <ShowError errorMessage={error} />
  ) : (
    <div className="container p-4 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <button
          onClick={clearCart} // Call the clearCart function when clicked
          className="flex items-center px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          <FaTrash className="mr-2" /> Clear Cart
        </button>
      </div>
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
            {cart_details.map(item => (
              <Cart
                key={item.id}
                productId={item.id}
                name={item.product_name}
                quantity={item.prod_quantity}
                price={item.discounted_price}
                image={item.product_image}
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
        <Link
          to={"/checkout"}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
