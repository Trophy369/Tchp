import { useState, useEffect } from "react";
import { pay, confirmation } from "../../services/userApi";
import Counter from "./Counter";

const Payment = () => {
  const [payInfo, setPayInfo] = useState({});

  useEffect(() => {
    const fetchPay = async () => {
      const { data, error } = await pay();
      if (data) {
        setPayInfo(data);
      } else {
        console.error(error);
      }
    };

    fetchPay();
  }, []);

  const handleClick = async () => {
    try {
      const data = await confirmation();
      alert('Payment processing: ' + data.success);
 
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Pay</h1>
      <div>
        <p>Your unique deposit address has been created! see below.  </p>
        <p>Use Ramp to buy USDT TRC20 into your unique deposit address.</p>
        <div>
          <p>USDT Address: {payInfo.address && <h2>{payInfo.address}</h2>} </p>
          <p>USDT Amount: {payInfo.grand_total && <h2>{payInfo.grand_total}</h2>} </p>
        </div>
        <p> The deposit address will expire in the next 
          <Counter />
        </p>
      </div>
      
      
      
      {/* {payInfo.type && <h2>{payInfo.type}</h2>} */}
      <button
        onClick={handleClick}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md sm:w-auto hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Proceed
      </button>
    </div>
  );
};

export default Payment;
