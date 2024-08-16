import { Link } from "react-router-dom";
import ShowImage from "../ShowImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "../../services/userApi";
// import { loggedUser } from "../services";
import { useAuth } from "../authContext/AuthProvider";

const ProductCard = ({ id, name, description, quantity, price, regPrice }) => {
  return (
    <Link
      to={{ pathname: `/viewproduct/${id}`, state: { name } }}
      className="overflow-hidden transition-transform transform border border-gray-200 rounded-lg group hover:scale-105"
    >
      <div className="flex flex-col h-full">
        <ShowImage />
        <div className="flex flex-col items-center justify-center flex-1 p-2">
          <h2 className="mb-1 text-lg font-bold text-center">{name}</h2>
          <p className="flex items-center mb-1 text-xl font-bold">
            <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
            {price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            Sold: {quantity} | Left: {quantity}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
