import { useState, useEffect } from "react";
import { generateCoupon, deleteCoupon, deleteCoupons, getCoupon } from "../../services/adminApi";
import { FaTrash } from "react-icons/fa"; // Importing the trash icon

const Coupon = () => {
  const [email, setEmail] = useState("");
  const [coupons, setCoupons] = useState([])


  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getCoupon()
      setCoupons(data)
    }

    fetchCoupons()
  },[])

  const handleGenerateCoupon = async (e) => {
    e.preventDefault();
    try {
      const response = await generateCoupon(email);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCoupon = async () => {
    try {
      const response = await deleteCoupon(email);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearCoupons = async () => {
    try {
      const response = await deleteCoupons();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative max-w-md p-8 mx-auto bg-white rounded shadow-md mt-11 mb-44">
      <h1 className="mb-4 text-2xl font-bold text-center">Generate Coupon</h1>
      
      {/* Clear Coupons Button */}
      <div className="flex justify-end">
        <button
          onClick={handleClearCoupons}
          className="flex items-center block px-4 py-2 mx-auto text-white bg-red-600 rounded hover:bg-red-700"
        >
          <FaTrash className="mr-2 " />
          Clear Coupons
        </button>
      </div>

      <form onSubmit={handleGenerateCoupon}>
        <div className="mt-4 mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            User Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter user email"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Generate Coupon
        </button>
      </form>

      {/* Delete Coupon Button */}
      <button
        onClick={handleDeleteCoupon}
        className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700"
      >
        <FaTrash className="mr-2" />
        Delete Coupon
      </button>
    </div>
  );
};

export default Coupon;
