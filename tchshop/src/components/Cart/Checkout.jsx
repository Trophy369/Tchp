import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import "react-phone-number-input/style.css";
import { pay, checkout, getShippingAddress } from "../../services/userApi";
import Shipping from "./Shipping";
import Order from "./Order";
import Skele from "./Skele";

const dummyShippingMethods = [
  { id: 1, name: "Standard Shipping", deliveryTime: "5-7 days", cost: 5.99 },
  { id: 2, name: "Express Shipping", deliveryTime: "2-3 days", cost: 12.99 },
  { id: 3, name: "Overnight Shipping", deliveryTime: "1 day", cost: 24.99 }
];

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [error, setError] = useState(null);
  const [checkoutRes, setCheckoutRes] = useState(null);
  const [payInfo, setPayInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shipData, setShipData] = useState(false);
  const [priceUpdate, setPriceUpdate] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchShippingAddress = async () => {
      const { data, error } = await getShippingAddress();
      if (data.error) {
        setShippingAddress(null);
        setLoading(false)
      } else {
        setShippingAddress(data.shipping_address);
        setShipData(true);
        setLoading(false)
      }
    };

    fetchShippingAddress();
  }, [shipData]);

  useEffect(() => {
    if (shippingAddress) {
      setLoading(true);
      const fetchPay = async () => {
        const { data, error } = await pay();
        if (data) {
          setPayInfo(data);
        }
        setLoading(false)
      };

      fetchPay();
    }
  }, [shippingAddress, priceUpdate]);

  useEffect(() => {
    if (shippingAddress) {
      const fetchCheckout = async () => {
        try {
          const { data, error } = await checkout();
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

  const loadOrders = () => {
    if (loading) {
      return <Skele />;
    } else {
      return (
        <Order
          shippingAddress={shippingAddress}
          payInfo={payInfo}
          checkoutRes={checkoutRes}
          setPriceUpdate={setPriceUpdate}
        />
      );
    }
  };

  const shipForm = () => {
    if (loading) {
      return <Skele />;
    } else {
      return <Shipping setShipData={setShipData} />;
    }
  };

  return (
    <section className="flex items-center justify-center px-4 py-4 my-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {shipData ? loadOrders() : shipForm()}
      </div>
    </section>
  );
};

export default Checkout;
