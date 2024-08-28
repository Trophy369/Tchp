import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import PhoneInput from "react-phone-number-input";
import { useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import {
  getShipping,
  proceed,
  checkout,
  addShippingDetails,
  useCoupon,
  getShippingAddress
} from "../../services/userApi";
import Shipping from "./Shipping"
import Order from "./Order"

const dummyShippingMethods = [
  { id: 1, name: "Standard Shipping", deliveryTime: "5-7 days", cost: 5.99 },
  { id: 2, name: "Express Shipping", deliveryTime: "2-3 days", cost: 12.99 },
  { id: 3, name: "Overnight Shipping", deliveryTime: "1 day", cost: 24.99 }
];

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [error, setError] = useState(null);
  const [checkoutRes, setCheckoutRes] = useState(null);

  useEffect(() => {
    const fetchShippingAddress = async () => {
      const { data, error } = await getShippingAddress();
      if (data.error) {
        setShippingAddress(null);
      } else {
        setShippingAddress(data);
      }
    };

    fetchShippingAddress();
  }, []);

  useEffect(() => {
    if (shippingAddress) {
      const fetchCheckout = async () => {
        try {
          const { data, error } = await checkout();
          console.log(data)
          if (error) {
            console.error("Error fetching checkout data:", error);
          } else {
            setCheckoutRes(data);
          }
        } catch (error) {
          console.error("Error fetching checkout data:", error);
        }
      };

      fetchCheckout();
    }
  }, [shippingAddress]);


  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-black">
        Checkout
      </h1>
      
      {shippingAddress ? <Order shippingAddress={shippingAddress} checkoutRes={checkoutRes} /> : <Shipping />}
      

      {/* Pay Now Button */}
      <div className="mt-8 text-center">
        <a
          href="/payment"
          className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          Pay Now
        </a>
      </div>
    </div>
  );
};

export default Checkout;
