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
    <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Select Payment Method</h2>
      <select
        value={selectedMethod}
        onChange={handleMethodChange}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      >
        <option value="" disabled>
          -- Choose a payment method --
        </option>
        <option value="USDT">USDT</option>
      </select>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Proceed to Payment Button placed directly below the select field */}
      {selectedMethod && !error && (
        <Link
          to="/payment" // Adjust the path as necessary
          className="block w-full mt-4 p-2 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600"
        >
          Proceed to Payment
        </Link>
      )}
    </div>
  );
};

export default PaymentMethod;
