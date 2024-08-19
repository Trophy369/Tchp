import React, { useState } from "react";
import { addProduct } from "../../services/adminApi";
import { listproducts } from "../../services";

const CreateProductComponent = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await addProduct(
        productName,
        description,
        quantity,
        regularPrice,
        discountedPrice,
        file
      );
      if (response.error) {
        setError(response.error);
        setMessage("");
      } else {
        setMessage(response.Message);
        setError("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Regular Price:</label>
          <input
            type="number"
            value={regularPrice}
            onChange={e => setRegularPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Discounted Price:</label>
          <input
            type="number"
            value={discountedPrice}
            onChange={e => setDiscountedPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Image:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Create Product</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateProductComponent;
