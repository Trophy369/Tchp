import {Link} from "react-router-dom"
import ShowImage from "../ShowImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";


const CategoryCards = ({ product }) => {
    return (
        <Link to={`/viewproduct/${product.id}`} className="block overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
          <div className="flex flex-col h-full">
        <ShowImage url={`static/products/default_img/${product.image}`} style="home" />
        <div className="flex flex-col items-center justify-center flex-1 p-2">
          <h2 className="mb-1 text-base font-normal text-center">{product.name}</h2>
          <p className="flex items-center mb-1 text-base font-medium">
            <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
            {product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            {product.quantity} Left
          
          </p>
        </div>
      </div>
        </Link>
      );
};

export default CategoryCards;
