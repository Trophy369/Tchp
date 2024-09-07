import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import "react-phone-number-input/style.css";
import { checkout, getShippingAddress } from "../../services/userApi";
import Shipping from "./Shipping";
import Order from "./Order";

const dummyShippingMethods = [
  { id: 1, name: "Standard Shipping", deliveryTime: "5-7 days", cost: 5.99 },
  { id: 2, name: "Express Shipping", deliveryTime: "2-3 days", cost: 12.99 },
  { id: 3, name: "Overnight Shipping", deliveryTime: "1 day", cost: 24.99 }
];

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [error, setError] = useState(null);
  const [checkoutRes, setCheckoutRes] = useState(null);
  const [shipData, setShipData] = useState(false)

  useEffect(() => {
    const fetchShippingAddress = async () => {
      const { data, error } = await getShippingAddress();
      if (data.error) {
        setShippingAddress(null);
      } else {
        setShippingAddress(data.shipping_address);
        setShipData(true)        
      }
    };

    fetchShippingAddress();
  }, [shipData]);

  useEffect(() => {
    if (shippingAddress) {
      const fetchCheckout = async () => {
        try {
          const { data, error } = await checkout();
          console.log(data);
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
    <section className="flex items-center justify-center px-4 py-4 my-8 bg-gray-50 sm:px-6 lg:px-8" >
      <div className="w-full max-w-md space-y-8">

      {shipData ? (
        <Order shippingAddress={shippingAddress} checkoutRes={checkoutRes} />
      ) : (
        <Shipping setShipData={setShipData} />
      )}
    </div>
    </section>
    
  );
};

export default Checkout;
