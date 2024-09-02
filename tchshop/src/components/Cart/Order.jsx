import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { proceed, useCoupon } from "../../services/userApi";
import OrderCart from "./OrderCart";
import PaymentMethod from "./PaymentMethod";
import Shipping from "./Shipping";

const Order = ({ checkoutRes, shippingAddress }) => {
  const {user, cart} = useSelector((state) => state);
  const [proceedRes, setProceedRes] = useState(null);
  const couponRef = useRef();

const cartItems = cart.cart_details;
const email = user.user.email

  useEffect(() => {
    if (checkoutRes) {
      const fetchProceed = async () => {
        try {
          const { data, error } = await proceed();

          if (error) {
            console.error("Error fetching checkout data:", error);
          } else {
            setProceedRes(data);
          }
        } catch (error) {
          console.error("Error fetching checkout data:", error);
        }
      };

      fetchProceed();
    }
  }, [checkoutRes]);

  const handleCoupon = async () => {
    const code = couponRef.current.value;
    const {data, error} = await useCoupon(code);
    console.log(data);
  };

  return (
    <section className="mb-8 p-4 bg-white shadow-md rounded-lg max-w-2xl mx-auto">
      <h2 className="mb-4 text-2xl font-semibold text-center">Order Summary</h2>
      <div className="p-4 border rounded-md">
        {cartItems.map((cartP) => (
          <OrderCart key={cartP.id} cartP={cartP} />
        ))}
        <div className="mt-4">
        <div className="flex justify-between items-center border-b py-2">
            <span className="font-semibold">Address:</span>
            <span>{shippingAddress}</span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span className="font-semibold">Email:</span>
            <span>{email}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-semibold">Subtotal:</span>
            <span>
              $
              {proceedRes?.total_price
                ? proceedRes.total_price.toFixed(2)
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span className="font-semibold">Shipping:</span>
            <span>{proceedRes?.total_shipping || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span className="font-semibold">Tax:</span>
            <span>${proceedRes?.tax ? proceedRes.tax.toFixed(2) : "0.00"}</span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span className="font-semibold">Total:</span>
            <span>
              $
              {proceedRes?.grand_total
                ? proceedRes.grand_total.toFixed(2)
                : "0.00"}
            </span>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Discount Code"
              ref={couponRef}
              className="w-full p-2 mb-2 border rounded-md"
            />
            <button
              onClick={handleCoupon}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      {/* Ensure the PaymentMethod component is aligned properly */}
      <PaymentMethod />
    </section>
  );
};

export default Order;
