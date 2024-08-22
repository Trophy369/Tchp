import { useState, useEffect } from "react";
import {
  addProductDescription,
  deleteProdDesc,
  updateProdDesc,
  deleteProdImg,
  deleteProdCol
} from "../../services/adminApi";
import {
  viewProductDescription,
  viewProductColors
} from "../../services/userApi";
import { useLocation } from "react-router-dom";

const Product = () => {
  const [productName, setProductName] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [descriptionImages, setDescriptionImages] = useState([]);
  const [desc, setDesc] = useState([]);
  const [color, setColor] = useState([]);
  const location = useLocation();
  const { product } = location.state || {};

  useEffect(() => {
    const viewProdDesc = async () => {
      const response = await viewProductDescription(product.id);
      setDesc(response);
    };

    viewProdDesc();
  }, [product.id]);

  useEffect(() => {
    const viewProdCol = async () => {
      const response = await viewProductColors(product.id);
      setColor(response);
    };

    viewProdCol();
  }, [product.id]);

  console.log()

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

  const handleUpdate = async e => {
    e.preventDefault();

    try {
      const response = await updateProdDesc(product.name, specifications);
      console.log("Update Response:", response);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleDeleteDesc = async () => {
    try {
      const response = await deleteProdDesc(product.name);
      console.log("Delete Description Response:", response);
    } catch (error) {
      console.error("Delete Description Error:", error);
    }
  };

  const handleDeleteImg = async () => {
    try {
      const response = await deleteProdImg(product.name);
      console.log("Delete Images Response:", response);
    } catch (error) {
      console.error("Delete Images Error:", error);
    }
  };

  const handleDeleteColor = async () => {
    try {
      const response = await deleteProdCol(product.name);
      console.log("Delete Color Response:", response);
    } catch (error) {
      console.error("Delete Color Error:", error);
    }
  };

  const imageUrls = Array.isArray(desc.images)
    ? desc.images.map(
        img => `http://127.0.0.1:5000/static/descriptions/${img.image_name}`
      )
    : [];

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Product Name
          </label>
          <input
            type
            is
            type="text"
            value={product.name}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Specifications
          </label>
          <textarea
            value={specifications}
            onChange={e => setSpecifications(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter specifications"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Description Images (up to 5)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded"
            accept="image/*"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {descriptionImages.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`preview-${index}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Description
        </button>
      </form>

      {/* Product Description Card */}
      <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <p className="text-gray-800 mb-4">{desc.specifications}</p>
      </div>

      <div className="mt-8 space-y-4">
        <button
          onClick={handleUpdate}
          className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Update Description
        </button>

        <button
          onClick={handleDeleteDesc}
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Description
        </button>

        <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Product Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {imageUrls &&
              imageUrls.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`description-${index}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
          </div>
        </div>

        <button
          onClick={handleDeleteImg}
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Images
        </button>

        {/* Product Description Card */}
        <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Product Colors</h2>
          <div>
            {color.colors_available && color.colors_available.length > 0
              ? color.colors_available.map((color, index) => (
                  <p key={index} className="text-gray-800 mb-4">{color}</p>
                ))
              : <p>No colors available</p>}
          </div>
        </div>
       <button
          onClick={handleDeleteColor}
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Color
        </button>
      </div>
    </div>
  );
};

export default Product;
