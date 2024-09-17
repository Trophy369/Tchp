import { addWallet, getWallet } from "../../services/adminApi";
import { useState, useEffect } from "react";

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [currencyType, setCurrencyType] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await getWallet();
        setWallets(data);
      } catch (error) {
        console.error("Error fetching wallets:", error);
      }
    };
    fetchWallets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addWallet(currencyType, address);
      console.log("Wallet added:", response);
      // Optionally refresh the list of wallets after adding a new one
      const updatedWallets = await getWallet();
      setWallets(updatedWallets);
    } catch (error) {
      console.error("Error adding wallet:", error);
    }
  };

  return (
    <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-md mt-11 mb-44">
      <h1 className="mb-6 text-3xl font-bold text-center">Manage Wallets</h1>

      {/* Wallet Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Currency Type
          </label>
          <select
            value={currencyType}
            onChange={(e) => setCurrencyType(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 border rounded"
            required
          >
            <option value="">Select Currency</option>
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Wallet Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter wallet address"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Add Wallet
        </button>
      </form>

      {/* Wallet List */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">Existing Wallets</h2>
        {wallets.length > 0 ? (
          <ul className="space-y-4">
            {wallets.map((wallet, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md"
              >
                <span className="font-medium text-gray-800">
                  {wallet.currency_type.toUpperCase()}
                </span>
                <span className="text-gray-600">{wallet.address}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No wallets available.</p>
        )}
      </div>
    </div>
  );
};

export default Wallets;

