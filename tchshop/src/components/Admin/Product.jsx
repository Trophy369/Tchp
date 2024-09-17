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
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md mt-11 mb-44">
      <h1 className="mb-6 text-3xl font-bold text-center">Manage Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={product.name}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
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
          <label className="block mb-2 text-sm font-semibold text-gray-700">
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
                className="object-cover w-20 h-20 rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Add Description
        </button>
      </form>

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
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
            className="object-cover w-20 h-20 rounded"
          />
        ))}
      </div>
      <button
        onClick={handleFiles}
        className="w-full px-6 py-3 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
      >
        Upload Images
      </button>

      {/* Product Description Card */}
      <div className="p-6 mt-10 bg-gray-100 rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Product Description</h2>
        <p className="mb-4 text-gray-800">{desc.specifications}</p>
        <div className="grid grid-cols-2 gap-4">
            {imageUrls &&
              imageUrls.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`description-${index}`}
                  className="object-cover w-full h-48 rounded-lg"
                />
              ))}
          </div>
      </div>

      <div className="mt-8 space-y-4">
        <button
          onClick={handleUpdate}
          className="w-full px-6 py-3 text-white transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-600"
        >
          Update Description
        </button>

        <button
          onClick={handleDeleteDesc}
          className="w-full px-6 py-3 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
        >
          Delete Description
        </button>

        <div className="p-6 mt-10 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Product Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {productImageUrls &&
              productImageUrls.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`description-${index}`}
                  className="object-cover w-full h-48 rounded-lg"
                />
              ))}
          </div>
        </div>

        <button
          onClick={handleDeleteImg}
          className="w-full px-6 py-3 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
        >
          Delete Images
        </button>

        {/* Product Description Card */}
        <div className="p-6 mt-10 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Product Colors</h2>
          <div>
            {color && color.length > 0 ? (
              color.map((color, index) => (
                <p key={index} className="mb-4 text-gray-800">
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
          className="w-full px-6 py-3 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
        >
          Delete Color
        </button>
      </div>
    </div>
  );
};

export default Product;
