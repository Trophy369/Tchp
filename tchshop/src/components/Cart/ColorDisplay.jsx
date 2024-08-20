import React from 'react';

const ColorDisplay = ({ colors, onEditColor }) => {
  return (
    <div className="flex space-x-2">
      {colors.map((color, index) => (
        <div
          key={index}
          onClick={() => onEditColor(color, index)} // Call the edit function with the color and its index
          className="w-8 h-8 cursor-pointer border-2 border-gray-300 rounded"
          style={{ backgroundColor: color }}
        >
          {/* Optional: You can add a hover effect */}
          <div className="w-full h-full opacity-0 hover:opacity-75 transition-opacity"></div>
        </div>
      ))}
    </div>
  );
};

export default ColorDisplay;
