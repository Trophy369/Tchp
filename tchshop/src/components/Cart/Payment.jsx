import { useState, useEffect } from "react";
import { payment, pay, confirmation } from "../../services/userApi";
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
      <h1>Secure Your Order with USDT - The Stable Dollar</h1>
      <p>Your unique USDT TRC20 wallet address is ready. Make a seamless payment with Ramp, our trusted payment partner.  </p>
      <div>
        <h3>Your Details:</h3>
        
        <div>
          <p>USDT Address: {payInfo.address && <h2>{payInfo.address}</h2>} </p>
          <p>USDT Amount: {payInfo.grand_total && <h2>{payInfo.grand_total}</h2>} </p>
          <p>Expiration Time: <Counter /> </p>
        </div>
       
       <div>GIF</div>
       
      </div>
      
      
      <p>complete your order now</p>
      {/* {payInfo.type && <h2>{payInfo.type}</h2>} */}
      <button
        onClick={handleClick}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md sm:w-auto hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Proceed with Ramp
      </button>
      <div>
        <p>Why USDT? Enjoy a stable dollar value, minimizing price fluctuations and ensuring a smooth transaction.</p>
        <p>Why Ramp? Our partnership with Ramp enables efficient order processing and provides you with a variety of payment methods, making it easy to pay from anywhere in the world.</p>
        </div>
    </div>
  );
};

export default Payment;
