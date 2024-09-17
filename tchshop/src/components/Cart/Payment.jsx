import { useState, useEffect } from "react";
import { pay, confirmation } from "../../services/userApi";
import Counter from "./Counter";
import Gif from "../../assets/Gif.gif";

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
    <main className="flex flex-col items-center p-4">
      <header className="text-center">
        <h3 className="mb-2 text-xl font-bold">Secure Your Order with USDT [Stable Dollar] </h3>
        <p className="mb-1 text-lg">Your unique USDT Tether wallet address is ready. </p>
      </header>
      <section className="mt-1 payment-details">
        {/* <h4 className="mb-1 text-xl font-bold">Your Details:</h4> */}
        <dl className="flex flex-col">
          <dt className="text-base font-bold ">USDT Address:</dt>
          <dd className="mb-1 text-base">{payInfo.address}</dd>
          <dt className="text-base font-bold ">USDT Amount:</dt>
          <dd className="mb-1 text-base">{payInfo.grand_total}</dd>
          <dt className="text-base font-bold ">Expiration Time:</dt>
          <dd className="mb-1 text-base"><Counter /></dd>
        </dl>
      </section>
      <section className="mt-2 text-center payment-actions">
      <p className="mb-2 text-lg">Make a seamless payment with Ramp, our trusted payment partner. </p>
      
        <img src={Gif} alt="GIF For Payment Process" width="260" height="347" />
        <button
          onClick={handleClick}
          aria-label="Proceed with payment using Ramp"
          className="w-full px-4 py-2 my-2 text-white bg-blue-500 rounded-md sm:w-auto hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Proceed with Ramp
        </button>
      </section>
      <section className="mt-4 payment-info">
        <h2 className="mb-2 text-2xl font-bold">Why USDT?</h2>
        <p className="mb-2 text-lg">Enjoy a stable dollar value, minimizing price fluctuations and ensuring a smooth transaction.</p>
        <h2 className="mb-2 text-2xl font-bold">Why Ramp?</h2>
        <p className="mb-2 text-lg">Our partnership with Ramp enables efficient order processing and provides you with a variety of payment methods, making it easy to pay from anywhere in the world.</p>
      </section>
    </main>
   
  );
};

export default Payment;
