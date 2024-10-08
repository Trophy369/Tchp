import { useState, useEffect } from "react";
import { pay, confirmation } from "../../services/userApi";
import Counter from "./Counter";
import Gif from "../../assets/Gif.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [payInfo, setPayInfo] = useState({});
  const [copiedField, setCopiedField] = useState(null);
  const navigate = useNavigate();

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
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = (textToCopy, field) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 3000); // Reset after 3 seconds
  };

  const handleClick = async () => {
    try {
      await confirmation();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProceed = () => {
    window.open("https://www.ramp.network/buy", "_blank");
  };

  return (
    <main className="relative flex flex-col items-center p-6 mt-7 mb-44 bg-gray-50">
      {/* Header */}
      <header className="mb-2 text-center">
        <p className="mt-1 text-lg font-semibold text-gray-600">A unique USDT Tether wallet address has been created for your deposit. It expires in:</p>
        <div className="flex items-center justify-center my-2 space-x-2 text-2xl text-blue-500">
          <FontAwesomeIcon icon={faHourglassHalf} />
          <Counter />
        </div>
      </header>

      {/* Deposit Details */}
      <section className="w-full max-w-md p-4 mt-2 bg-white rounded-lg shadow-lg">
        <h5 className="mb-4 text-xl font-bold text-center text-gray-800">Your Deposit Details:</h5>
        <div className="flex items-center justify-between mb-2">
          <dt className="text-base font-semibold text-gray-700">Amount to pay in USDT:</dt>
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
        <dd className="mb-3 text-lg text-center text-gray-800">{payInfo.grand_total}</dd>

        <div className="flex items-center justify-between mb-2">
          <dt className="text-base font-semibold text-gray-700">USDT Wallet Address:</dt>
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
        <dd className="mb-3 text-xs text-center text-gray-600">{payInfo.address}</dd>
      </section>

        <section className="w-full max-w-md mt-2 text-center">
          <h5 className="mt-4 font-medium text-gray-800 text-md"> 
          Send USDT (TRC20 network) directly from your personal wallet within the countdown timer above and click "Confirm Payment" below for transaction verification.
          </h5>
          {/* <p className="mb-1 text-lg font-medium text-gray-800">Click Confirm below when your payment is successful!</p> */}
          <span className="flex justify-center py-1 text-sm text-gray-300">Global</span>
        </section>

      {/* Payment Actions */}
      <section className="w-full max-w-md mt-6 text-center">
        
        {/* <h5 className="mt-1 mb-3 text-lg font-medium text-gray-800"> 
        Send USDT (TRC20 network) directly from your personal wallet in due time and click "Confirm Payment".
        </h5> */}
        <p className="flex justify-center pb-3 text- text-black/20">Alternatively</p>
        <p className="my-1 text-base text-gray-600">Secure Your Order Now on Ramp. See this!<br/> Make a seamless payment with Ramp, our trusted payment partner</p>
        <img
          src={Gif}
          alt="GIF For Payment Process"
          className="w-full h-auto max-w-xs mx-auto rounded-lg" 
        />
        <button
          onClick={handleProceed}
          aria-label="Proceed with payment using Ramp"
          className="w-full px-4 py-2 mt-4 text-white rounded-md bg-paymentBtn hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Proceed with Ramp 
        </button>
        <button
            onClick={handleClick}
            className="w-full px-4 py-2 mt-1 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Confirm Payment
          </button>
        
      </section>

      {/* Additional Info Section */}
      <section className="w-full max-w-md mt-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Why USDT?</h2>
        <p className="mb-4 text-lg text-gray-600">Enjoy a stable dollar value, minimizing price fluctuations and ensuring a smooth transaction.</p>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Why Ramp?</h2>
        <p className="text-lg text-gray-600">Our partnership with Ramp enables efficient order processing and provides a variety of payment methods, making it easy to pay from anywhere in the world.</p>
      </section>
    </main>
  );
};

export default Payment;
