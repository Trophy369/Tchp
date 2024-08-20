import { useState } from "react";
import {addProductDescription} from "../../services/adminApi";
import { useLocation } from 'react-router-dom';


const Product = () => {
  const [productName, setProductName] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [descriptionImages, setDescriptionImages] = useState([]);
  const location = useLocation();
  const { product } = location.state || {};

  console.log('product comp', product)

  const handleFileChange = e => {
    setDescriptionImages(Array.from(e.target.files));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await addProductDescription(
        product.name,
        specifications,
        descriptionImages
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Add Product Description</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={product.name}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Specifications
          </label>
          <textarea
            value={specifications}
            onChange={e => setSpecifications(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter specifications"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description Images (up to 5)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Description
        </button>
      </form>
    </div>
  );
};

export default Product;
