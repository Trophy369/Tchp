import React from "react";
import ShowImage from "../ShowImage";
import { deleteProduct } from "../../services/adminApi";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import config from "../../config"

const baseURL = config.baseUrl

const ProductCard = ({ id, product_image, name, setProducts, products }) => {
  const handleRemove = async () => {
    try {
      await deleteProduct(id);
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  const product = {
    id: id,
    name: name
  };

  return (
    <tr key={id} className="border-b">
      <td className="flex items-center py-4 space-x-4">
        <ShowImage
          url={`${baseURL}/static/products/default_img/${product_image}`}
          style={true}
        />
        <span className="truncate">{name}</span>
      </td>
      <td className="hidden md:table-cell py-4 text-center">
        <Link
          to={`/admin/product/${id}`}
          state={{ product }}
          className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded hover:bg-blue-700 transition duration-200"
        >
          EDIT PRODUCT
        </Link>
      </td>
      <td className="py-4 text-center">
        <button
          onClick={handleRemove}
          className="text-red-600 hover:text-red-800 transition-transform duration-200 hover:scale-125"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ProductCard;
