import React from "react";
import ShowImage from "../ShowImage";
import { deleteProduct } from "../../services/adminApi";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <tr key={id} className="border-b ">
      <td className="flex flex-wrap items-center py-2 space-x-4">
        <div className="w-24 h-24">
          <ShowImage
          url={`static/products/default_img/${product_image}`}
          style={true}
        /></div>
        
        <span className="truncate">{name}</span>
      </td>
      <td className="flex py-2 text-center md:table-cell">
        <Link
          to={`/admin/product/${id}`}
          state={{ product }}
          className="inline-block px-4 py-2 text-sm font-semibold text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
        >
          EDIT PRODUCT
        </Link>
      </td>
      <td className="py-2 text-center">
        <button
          onClick={handleRemove}
          className="text-red-600 transition-transform duration-200 hover:text-red-800 hover:scale-125"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ProductCard;
