import { useState, useEffect } from "react";
import { generateCoupon, deleteCoupon, deleteCoupons, getCoupon } from "../../services/adminApi";
import { FaTrash, FaClipboard } from "react-icons/fa"; // Importing the trash icon

const Coupon = () => {
  const [email, setEmail] = useState("");
  const [coupons, setCoupons] = useState([])
  const [generatedCode, setGeneratedCode] = useState('');

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
      setGeneratedCode(response.success)
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
      .then(() => {
        alert('Coupon code copied to clipboard!'); // Optional: Show a success message
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="relative max-w-md p-8 mx-auto bg-white rounded shadow-md mt-11 mb-44">
      <h1 className="mb-4 text-2xl font-bold text-center">Generate Coupon</h1>
      
      <div className="flex justify-end">
        <button
          onClick={handleClearCoupons}
          className="flex items-center block px-4 py-2 mx-auto text-white bg-red-600 rounded hover:bg-red-700"
        >
          <FaTrash className="mr-2 " />
          Clear Coupons
        </button>
      </div>

      {generatedCode && (
          <div className="mb-4 text-center">
            <p className="text-lg font-semibold">Generated Coupon Code: {generatedCode}</p>
            <button onClick={handleCopyToClipboard} className="ml-2 text-blue-600 hover:underline">
              <FaClipboard />
            </button>
          </div>
        )}

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

      <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded mt-8">
        <h2 className="text-xl font-semibold mb-4">User Coupons</h2>

        {coupons.length > 0 ? (
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div key={coupon.user_id} className="p-4 bg-gray-100 rounded shadow-sm">
                <p className="text-sm font-medium text-gray-700">User ID: {coupon.user_id}</p>
                <p className="text-sm text-gray-600">Coupon Code: {coupon.code}</p>
                <p className="text-sm text-gray-600">Percentage: {coupon.percentage}</p>
                <p className="text-sm text-gray-600">Status: {coupon.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No coupons generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default Coupon;
