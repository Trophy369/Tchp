import { useEffect, useState, useRef } from "react";
import { FaTrash, FaPlus, FaMinus, FaDollarSign } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import ShowImage from "../ShowImage.jsx";
import {
  inputQuantity,
  viewProductColors,
  updateCartItemColor
} from "../../services/userApi.js";
import ColorDisplay from "./ColorDisplay";

const Cart = ({
  productId,
  name,
  price,
  quantity,
  updateQuantity,
  addOneToCart,
  minusOneToCart,
  removeItem
}) => {
  const [lilQuantity, setLilQuantity] = useState(quantity);
  const [color, setColor] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLilQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    const fetchProductColor = async () => {
      const data = await viewProductColors(productId);
      setColor(data);
    };

    fetchProductColor();
  }, [productId]);

  const handleIncrement = () => {
    addOneToCart(productId);
  };

  const handleDecrement = () => {
    minusOneToCart(productId);
  };

  const handleChange = e => {
    const newQuantity = Number(e.target.value);
    setLilQuantity(newQuantity);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updateQuantity(productId, newQuantity);
      inputQuantity(productId, newQuantity);
    }, 1000);
  };

  const handleRemove = () => {
    removeItem(productId);
  };

  return (
    <tr key={productId} className="border-b">
      <td className="flex items-center py-2 space-x-4">
        <ShowImage style={true} />
        {/* <img src={item.imageUrl} alt={item.title} className="object-cover w-16 h-16"/> */}
        <span className="truncate">{name}</span>
      </td>
      <td className="hidden py-2 md:table-cell">
        <div className="flex items-center">
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
      <td className="flex flex-col items-start py-2 md:flex-row md:items-center md:justify-center">
        <FaDollarSign className="mr-1" /> {price.toFixed(2)}
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

export default Cart;
