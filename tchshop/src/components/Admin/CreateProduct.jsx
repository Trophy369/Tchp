import React, { useState, useEffect } from "react";
import {
  addProduct,
  createDescription,
  addProductColors
} from "../../services/adminApi";
import { listproducts } from "../../services";
import ProductCard from "./ProductCard";

const CreateProductComponent = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [file, setFile] = useState(null);
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await listproducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleAddColor = () => {
    if (newColor.trim() === "") return;
    setColors([...colors, newColor.trim()]);
    setNewColor("");
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
      if (response["Product name"]) {
        await createDescription(description);
        await addProductColors();
      }
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
          <h2>Add Colors to Product</h2>
          <div>
            <label>
              New Color:
              <input
                type="text"
                value={newColor}
                onChange={e => setNewColor(e.target.value)}
              />
            </label>
            <p onClick={handleAddColor}>Add Color</p>
          </div>
          <ul>
            {colors.map((color, index) => (
              <li key={index}>{color}</li>
            ))}
          </ul>
        </div>
        <div>
          <label>Product Image:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Create Product</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-center">All Products</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-2 w-7/10 md:w-1/2">Product</th>
                <th className="hidden pb-2 w-2/10 md:table-cell">Quantity</th>
                <th className="pb-2 w-2/10 md:w-1/5">Price</th>
                <th className="pb-2 w-1/10">Remove</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  product_image={product.product_image}
                  name={product["Product name"]}
                  description={product.description}
                  quantity={product.quantity}
                  price={product.discounted_price}
                  regPrice={product.regular_price}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateProductComponent;
