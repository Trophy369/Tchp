import React, { useState } from "react";
import { payment } from "../../services/userApi"; // Import the payment API call function
import { useNavigate, Link } from "react-router-dom";

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate after selecting payment method

  const handleMethodChange = async (event) => {
    const method = event.target.value;
    setSelectedMethod(method);

    try {
      await payment({ method }); // Call the API with the selected method
      setError(null); // Clear error if successful
    } catch (err) {
      setError("An error occurred while processing your request.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 mt-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold text-center">Select Payment Method</h2>
      <select
        value={selectedMethod}
        onChange={handleMethodChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      >
        <option value="" disabled>
          -- Choose a payment method --
        </option>
        <option value="USDT">USDT</option>
      </select>
      {error && <p className="mb-4 text-red-500">{error}</p>}

      {/* Proceed to Payment Button placed directly below the select field */}
      {selectedMethod && !error && (
        <Link
          to="/payment" // Adjust the path as necessary
          className="block w-full p-2 mt-4 text-center text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Proceed
        </Link>
      )}
    </div>
  );
};

export default PaymentMethod;
