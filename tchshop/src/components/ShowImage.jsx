import config from "../config";

const baseURL = config.baseUrl;

const ShowImage = ({ style, url }) => {
  let size;

  if (style === "cart") {
    size = "object-contain w-16 h-16"; // Small image size
  } else if (style === "home") {
    size = "object-contain w-full h-48"; // Large image size
  } else if (style === "carousel") {
    // size = "object-cover  mx-auto ";
    size = "object-contain w-full h-full";
  }  else if (style === "category") {
    size = "w-24 h-24 object-contain";
  } else { 
    size = "object-contain w-15 h-15"; // Default or medium image size
  }

  // "w-1/3 h-auto object-cover rounded-lg"
  // "w-16 h-16 object-cover"
  
  return <img src={`${baseURL}/${url}`} alt={""} className={size} />;
};

export default ShowImage;
