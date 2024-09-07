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
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded mt-8 relative">
      <h1 className="text-2xl font-bold mb-4 text-center">Generate Coupon</h1>
      
      {/* Clear Coupons Button */}
      <div className="flex justify-end">
        <button
          onClick={handleClearCoupons}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center"
        >
          <FaTrash className="mr-2" />
          Clear Coupons
        </button>
      </div>

      <form onSubmit={handleGenerateCoupon}>
        <div className="mb-4 mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Coupon
        </button>
      </form>

      {/* Delete Coupon Button */}
      <button
        onClick={handleDeleteCoupon}
        className="w-full mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center justify-center"
      >
        <FaTrash className="mr-2" />
        Delete Coupon
      </button>
    </div>
  );
};

export default Coupon;
