import { useState, useEffect } from "react";
import { pay, confirmation } from "../../services/userApi";
import Counter from "./Counter";
import Gif from "../../assets/Gif.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
  const [payInfo, setPayInfo] = useState({});
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    const fetchPay = async () => {
      const { data, error } = await pay();
      if (data) {
        setPayInfo({
          ...data,
          grand_total: Math.ceil(data.grand_total), // Rounding up USDT amount
        });
      } else {
        console.error(error);
      }
    };

    fetchPay();
  }, []);

  const handleCopy = (textToCopy, field) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 3000); // Reset after 3 seconds
  };

  const handleClick = async () => {
    try {
      const data = await confirmation();
      alert('Payment processing: ' + data.success);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <main className="relative flex flex-col items-center p-4 mt-7 mb-44">
      {/* Header */}
      <header className="text-center">
        <h3 className="mb-2 text-xl font-bold nowrap">Secure Your Order with USDT [Stable Dollar]</h3>
        <p className="mt-1 text-lg">Your unique USDT Tether wallet address is ready. It expires in the next:</p>
        <div className="flex items-center justify-center space-x-2">
          <FontAwesomeIcon icon={faHourglassHalf} />
          <Counter />
        </div>
      </header>

      {/* Deposit Details */}
      <section className="w-full max-w-md p-2 mt-2 bg-white rounded-lg shadow-md">
        <h5 className="mb-2 text-xl font-bold text-center">Your Deposit Details:</h5>
        <div className="flex items-center justify-between mb-1">
          <dt className="text-base font-bold">Amount to pay in USDT:</dt>
          <button
            onClick={() => handleCopy(payInfo.grand_total, "amount")}
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Copy USDT Amount"
          >
            {copiedField === "amount" ? (
              <>
                <FontAwesomeIcon icon={faCheck} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCopy} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <dd className="mb-3 text-base">{payInfo.grand_total}</dd>

        <div className="flex items-center justify-between mb-1">
          <dt className="text-base font-bold">USDT Wallet Address:</dt>
          <button
            onClick={() => handleCopy(payInfo.address, "address")}
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Copy USDT Address"
          >
            {copiedField === "address" ? (
              <>
                <FontAwesomeIcon icon={faCheck} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCopy} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <dd className="mb-3 text-base">{payInfo.address}</dd>
      </section>

      {/* Payment Actions */}
      <section className="w-full max-w-md mt-3 text-center">
        <p className="mb-3 text-lg font-medium">Make a seamless payment with Ramp, our trusted payment partner as below, or send USDT (TRC20 network) directly from your personal wallet.</p>
        <img
          src={Gif}
          alt="GIF For Payment Process"
          className="w-full h-auto max-w-xs mx-auto rounded-lg" // Adjusted dimensions for responsiveness
        />
        <button
          onClick={() => window.open("https://www.ramp.network/buy", "_blank")}
          aria-label="Proceed with payment using Ramp"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md sm:w-auto hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Proceed with Ramp
        </button>
      </section>

      {/* Additional Info Section */}
      <section className="w-full max-w-md mt-6 text-center">
        <h2 className="mb-2 text-2xl font-bold">Why USDT?</h2>
        <p className="mb-4 text-lg">Enjoy a stable dollar value, minimizing price fluctuations and ensuring a smooth transaction.</p>
        <h2 className="mb-2 text-2xl font-bold">Why Ramp?</h2>
        <p className="text-lg">Our partnership with Ramp enables efficient order processing and provides a variety of payment methods, making it easy to pay from anywhere in the world.</p>
      </section>
    </main>
  );
};

export default Payment;
