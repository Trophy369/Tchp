import {Link} from "react-router-dom"
import ShowImage from "../ShowImage";

const CategoryCards = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="block bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
          <div className="flex items-center p-4">
            <ShowImage url={`static/products/default_img/${product.image}`} style="category" /> {/* Increased image size */}
            <div className="flex-grow text-center mx-4">
              <h2 className="text-xl font-bold text-gray-900">{product.name}</h2> {/* Bold and darker font */}
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p> {/* Bold and darker font */}
            </div>
          </div>
        </Link>
      );
};

export default CategoryCards;
