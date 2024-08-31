import { useState, useEffect } from "react";
import {
  addProductDescription,
  deleteProdDesc,
  updateProdDesc,
  deleteProdImg,
  deleteProdCol,
  handleUpload
} from "../../services/adminApi";
import {
  viewProductDescription,
  viewProductColors,
  viewProduct
} from "../../services/userApi";
import { useLocation } from "react-router-dom";
import config from "../../config";

const baseURL = config.baseUrl;

const Product = () => {
  const [productName, setProductName] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [descriptionImages, setDescriptionImages] = useState([]);
  const [desc, setDesc] = useState([]);
  const [color, setColor] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
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
    const fetchProduct = async () => {
      const response = await viewProduct(product.id);
      setProducts(response);
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const viewProdCol = async () => {
      const {data} = await viewProductColors(product.id);
      setColor(data.colors_available);
    };

    viewProdCol();
  }, [product.id]);

  const handleFileChanged = e => {
    setDescriptionImages(Array.from(e.target.files));
  };

  const handleFileChange = event => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    setPreviews(prevPreviews => [
      ...prevPreviews,
      ...files.map(file => URL.createObjectURL(file))
    ]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await addProductDescription(
        product.id,
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
      const response = await updateProdDesc(product.id, specifications);
      console.log("Update Response:", response);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleFiles = async () => {
    try {
      const response = await handleUpload(product.id, selectedFiles);
      console.log("Update Response:", response);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleDeleteDesc = async () => {
    try {
      const response = await deleteProdDesc(product.id);
      console.log("Delete Description Response:", response);
    } catch (error) {
      console.error("Delete Description Error:", error);
    }
  };

  const handleDeleteImg = async () => {
    try {
      const response = await deleteProdImg(product.id);
      console.log("Delete Images Response:", response);
    } catch (error) {
      console.error("Delete Images Error:", error);
    }
  };

  const handleDeleteColor = async () => {
    try {
      const response = await deleteProdCol(product.id);
      console.log("Delete Color Response:", response);
    } catch (error) {
      console.error("Delete Color Error:", error);
    }
  };

  const imageUrls = Array.isArray(desc.images)
    ? desc.images.map(img => `${baseURL}/static/descriptions/${img.image_name}`)
    : [];

    const productImageUrls = Array.isArray(products.product_image)
    ? products.product_image.map(
        img => `${baseURL}/static/products/${img.image_name}`
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
            onChange={handleFileChanged}
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

      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Upload New Images
        </label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded"
          accept="image/*"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {previews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`preview-${index}`}
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div>
      <button
        onClick={handleFiles}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
      >
        Upload Images
      </button>

      {/* Product Description Card */}
      <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <p className="text-gray-800 mb-4">{desc.specifications}</p>
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
            {productImageUrls &&
              productImageUrls.map((image, index) => (
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
            {color && color.length > 0 ? (
              color.map((color, index) => (
                <p key={index} className="text-gray-800 mb-4">
                  {color.color}
                </p>
              ))
            ) : (
              <p>No colors available</p>
            )}
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
