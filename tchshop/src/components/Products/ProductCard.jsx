import { Link } from "react-router-dom";
import ShowImage from "../ShowImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ productId, name, description, quantity, price, regPrice, product_image }) => {
  return (
    <Link
      to={{ pathname: `/viewproduct/${productId}`, state: { name } }}
      className="overflow-hidden transition-transform transform border border-gray-200 rounded-lg group hover:scale-105"
    >
      <div className="flex flex-col h-full">
        <ShowImage url={`static/products/default_img/${product_image}`} style="home" />
        <div className="flex flex-col items-center justify-center flex-1 p-2">
          <h2 className="mb-1 text-base font-medium text-center">{name}</h2>
          <p className="flex items-center mb-1 text-base font-normal">
            <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
            {price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
             {quantity} Sold |  {quantity} Left
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
