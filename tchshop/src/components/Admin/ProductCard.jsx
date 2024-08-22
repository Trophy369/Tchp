import ShowImage from "../ShowImage";
import { deleteProduct } from "../../services/adminApi";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ id, product_image, name }) => {
  const handleRemove = () => {
    console.log(id);
    deleteProduct(id);
  };

  const product = {
    id: id,
    name: name,
  };

  return (
    <tr key={id} className="border-b">
      <td className="flex items-center py-2 space-x-4">
        <ShowImage
          url={`http://127.0.0.1:5000/static/products/default_img/${product_image}`}
          style={true}
        />
        <span className="truncate">{name}</span>
      </td>
      <td className="hidden py-2 md:table-cell">
        <Link to={`/admin/product/${id}`} state={{ product }} >
          EDIT PRODUCT
        </Link>
      </td>
      <td className="py-2 text-center">
        <button
          onClick={handleRemove}
          className="transition-transform duration-200 hover:scale-125"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ProductCard;
