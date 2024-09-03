import { useState, useEffect } from "react";
import { viewProductColors } from "../../services/userApi";

const ProductColors = ({id, color, setColor}) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchProductColors = async () => {
      const { data } = await viewProductColors(id);
      setColors(data);
      setColor(data[0].id)
    };

    fetchProductColors();
  }, [id]);

  console.log(color)

  return (
    <div className="flex justify-center space-x-2">
      {colors && colors.length > 0 ? (
        colors.map(colorOpt => (
          <label key={colorOpt.id} className="inline-flex items-center">
          {console.log(colorOpt)}
            <input
              type="radio"
              name="color"
              // value={colorOpt.color}
              className="form-radio"
              checked={color === colorOpt.id}
              onChange={() => setColor(colorOpt.id)}
            />
            <span
              className="block w-6 h-6 ml-2"
              style={{ backgroundColor: colorOpt.color.toLowerCase() }}
            ></span>
            <span className="ml-2">{colorOpt.color}</span>
          </label>
        ))
      ) : (
        <p>No Colors Found</p>
      )}
    </div>
  );
};

export default ProductColors;
