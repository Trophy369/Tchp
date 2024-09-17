import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import "react-phone-number-input/style.css";
import { pay, checkout, getShippingAddress } from "../../services/userApi";
import Shipping from "./Shipping";
import Order from "./Order";
import Skele from "./Skele";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [error, setError] = useState(null);
  const [checkoutRes, setCheckoutRes] = useState(null);
  const [payInfo, setPayInfo] = useState([]);
  const [loading, setLoading] = useState(true); // Start in a loading state
  const [priceUpdate, setPriceUpdate] = useState(null);

  // Fetch Shipping Address
  useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const { data, error } = await getShippingAddress();
        if (error) {
          setError("Failed to fetch shipping address.");
        } else {
          setShippingAddress(data.shipping_address);
        }
      } catch (err) {
        setError("An error occurred while fetching the shipping address.");
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchShippingAddress();
  }, []);

  useEffect(() => {
    if (shippingAddress) {
      const fetchPay = async () => {
        try {
          const { data, error } = await pay();
          if (error) {
            setError("Failed to fetch payment information.");
          } else {
            setPayInfo(data);
          }
        } catch (err) {
          setError("An error occurred while fetching payment info.");
        }
      };

      fetchPay();
    }
  }, [shippingAddress, priceUpdate]);

  // Fetch Checkout Info when Shipping Address is available
  useEffect(() => {
    if (shippingAddress) {
      const fetchCheckout = async () => {
        try {
          const { data, error } = await checkout();
          if (error) {
            setError("Failed to fetch checkout data.");
          } else {
            setCheckoutRes(data);
          }
        } catch (err) {
          setError("An error occurred while fetching checkout data.");
        }
      };

      fetchCheckout();
    }
  }, [shippingAddress]);

  // Function to load order details or skeleton
  const loadOrders = () => {
    if (loading) {
      return <Skele />;
    } else if (shippingAddress && payInfo) {
      return (
        <Order
          shippingAddress={shippingAddress}
          payInfo={payInfo}
          checkoutRes={checkoutRes}
          setPriceUpdate={setPriceUpdate}
        />
      );
    } else {
      return <div>No Orders Available</div>;
    }
  };

  // Function to display shipping form or skeleton
  const shipForm = () => {
    if (loading) {
      return <Skele />;
    } else {
      return <Shipping setShipData={() => setShippingAddress(true)} />;
    }
  };

  return (
    <section className="flex items-center justify-center px-4 py-4 mt-11 mb-44 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Conditionally render based on whether shippingAddress exists */}
        {shippingAddress ? loadOrders() : shipForm()}
      </div>
    </section>
  );
};

export default Checkout;
