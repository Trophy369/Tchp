import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useCoupon } from "../../services/userApi";
import OrderCart from "./OrderCart";
import PaymentMethod from "./PaymentMethod";

const Order = ({setPriceUpdate, payInfo, checkoutRes, shippingAddress }) => {
  const { user, cart } = useSelector(state => state);
  // const [priceUpdate, setPriceUpdate] = useState(null);
  const couponRef = useRef();

  const cartItems = cart.cart_details;
  const email = user.user.email;

  const handleCoupon = async () => {
    const code = couponRef.current.value;
    const { data, error } = await useCoupon(code);
    setPriceUpdate(data.coupon_price);
  };

  const total = payInfo.grand_total;

  const formattedTotal = parseFloat(total).toFixed(2);

  return (
    <section className="max-w-2xl p-4 mx-auto mb-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-center">Order Summary</h2>
        <div className="p-4 border rounded-md">
          {cartItems.map(cartP => (
            <OrderCart key={cartP.id} cartP={cartP} />
          ))}
          <div className="mt-8">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-semibold">Address:</span>
              <span className="ml-2 text-right font-extralight">
                {shippingAddress}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-semibold text-right">Email:</span>
              <span>{email}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="font-semibold">Subtotal:</span>
              ${payInfo?.total_price ? payInfo.total_price.toFixed(2) : "N/A"}
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-semibold">Shipping:</span>
              <span>${checkoutRes?.total_shipping ? checkoutRes.total_shipping.toFixed(2) : "N/A"}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-semibold">Tax:</span>
              <span>${payInfo?.tax ? payInfo.tax.toFixed(2) : "N/A"}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-semibold">Total:</span>
              <span>${formattedTotal}</span>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Discount Code"
                ref={couponRef}
                className="w-full p-2 mb-2 border rounded-md"
              />
              <div>
                <button
                  onClick={handleCoupon}
                  className="relative flex justify-center px-4 py-2 mx-auto text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md w-44 group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      <PaymentMethod />
    </section>
  );
};

export default Order;
