import { useState, useEffect } from "react";
import { pay, confirmation } from "../../services/userApi";
import Counter from "./Counter"

const Payment = () => {
  const [payInfo, setPayInfo] = useState([]);

  useEffect(() => {
    const fetchPay = async () => {
      const { data, error } = await pay();
      setPayInfo(data);
    };

    fetchPay();
  }, []);

  const handleClick = async () => {
    try {
      const data = await confirmation();
      alert('Payment processing: ' + data.success);
      // You can also redirect the user or update the state based on the response
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Pay</h1>
      <Counter />
      <h2>{payInfo.address}</h2>
      <h2>{payInfo.grand_total}</h2>
      <h2>{payInfo.type}</h2>
      <button
        onClick={handleClick}
        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
