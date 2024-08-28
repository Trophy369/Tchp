import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { proceed, useCoupon } from "../../services/userApi";
import OrderCart from "./OrderCart";

const Order = ({ checkoutRes }) => {
  const cartItems = useSelector(state => state.cart.cart_details);
  const [proceedRes, setProceedRes] = useState(null);
  const couponRef = useRef();

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

  //   const total = checkoutRes.total_price + checkoutRes.total_shipping;

  const handleCoupon = async () => {
    const code = couponRef.current.value;
    console.log("coupon", code);
    const data = await useCoupon(code);
    console.log(data);
  };

  return (
    <section className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">Order Summary</h2>
      <div className="p-4 border">
        {cartItems.map(cartP => (
          <OrderCart cartP={cartP} />
        ))}
        <div className="mt-4">
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal:</span>
            <span>
              $
              {proceedRes?.total_price
                ? proceedRes.total_price.toFixed(2)
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Shipping:</span>
            <span>{proceedRes?.total_shipping || "N/A"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Tax:</span>
            <span>${proceedRes?.tax ? proceedRes.tax.toFixed(2) : "0.00"}</span>
          </div>
          <div className="flex justify-between mt-2">
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
              className="w-full p-2 mb-2 border"
            />
            <button
              onClick={handleCoupon}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
