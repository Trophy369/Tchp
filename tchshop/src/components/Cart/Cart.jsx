import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaTrash, FaPlus, FaMinus, FaDollarSign } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import {
  inputQuantityAsync,
  minusOneToCartAsync,
  plusOneToCartAsync,
  removeFromCartAsync,
} from "../../reducers/cartReducer";
import ShowImage from "../ShowImage.jsx";
import { viewProductColors } from "../../services/userApi.js";

const Cart = ({ productId, name, price, quantity, image }) => {
  const dispatch = useDispatch();
  const [lilQuantity, setLilQuantity] = useState(quantity);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLilQuantity(quantity);
  }, [quantity]);

  const handleIncrement = () => {
    dispatch(plusOneToCartAsync(productId));
  };

  const handleDecrement = () => {
    dispatch(minusOneToCartAsync(productId));
  };

  const handleChange = (e) => {
    const newQuantity = Number(e.target.value);
    setLilQuantity(newQuantity);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(inputQuantityAsync(productId, newQuantity));
    }, 1000);
  };

  const handleRemove = () => {
    dispatch(removeFromCartAsync(productId));
  };

 

  return (
    <tr key={productId} className="text-center border-b">
      <td className="flex flex-col py-2 space-x-4 text-sm text-left md:flex-row">
        <ShowImage style="cart" url={`static/products/default_img/${image}`} />
        <span className="truncate">{name}</span>
      </td>
      <td className="hidden py-2 md:table-cell">
        <div className="flex items-center justify-center">
          <button onClick={handleDecrement} className="px-2">
            <FaMinus />
          </button>
          <input
            type="number"
            value={lilQuantity}
            onChange={handleChange}
            className="w-12 text-center"
            min="1"
            max="28"
          />
          <button onClick={handleIncrement} className="px-2">
            <FaPlus />
          </button>
        </div>
      </td>
      {/* price */}
      <td className="">
        <div className="flex items-center justify-center ">
          <FaDollarSign className="mr-1 size-3" /> {price.toFixed(2)}
        </div>
        <div className="flex items-center justify-center my-1 md:hidden ">
         
          <button onClick={handleDecrement} className="px-1">
            <FaMinus />
          </button>
          <input
            type="number"
            value={lilQuantity}
            onChange={handleChange}
            className="w-12 text-center"
            min="1"
            max="28"
          />
          <button onClick={handleIncrement} className="px-1">
            <FaPlus />
          </button>
        </div>
      </td>
      <td className="py-2">
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

export default Cart;
